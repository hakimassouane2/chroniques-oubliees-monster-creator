import Blueprint from "../classes/blueprint.js";
import SRD_MONSTERS from "../consts/srd_monsters.js";
import Files from "../files.js";
import Frankenstein from "../frankenstein.js";
import Helpers from "../helpers.js";
import Router from "../router.js";
import Storage from "../storage.js";
import Component from "./Component.js";

/**
 * A component for managing a list of saved monsters.
 */
class PanelVault extends Component {
  /**
   * Create a new monster vault panel.
   * @param {object} options - Component details, such as element/data/children.
   */
  constructor(options) {
    super(options);

    // Get blueprint and monster details
    this.data.monsters = Storage.getMonsters();
    this.data.monsters.forEach(function (x) {
      try {
        x.monster = Frankenstein.createVaultMonster(x.blueprint);
      } catch (error) {
        console.error(
          "Couldn't create monster profile from blueprint, reverting to default"
        );
        x.monster = Frankenstein.createVaultMonster(new Blueprint());
      }
    });
    this.table = null;
  }

  /**
   * Render the list of monsters.
   */
  renderComponent() {
    $(this.el).html(Handlebars.templates["PanelVault"](this.data));
    this.table = $("#table-monsters").DataTable({
      dom: '<"top"lf><"content"rt><"bottom"ip>',
      lengthMenu: [
        [10, 25, 50, 100, -1],
        [
          "Afficher 10 monstres",
          "Afficher 25 monstres",
          "Afficher 50 monstres",
          "Afficher 100 monstres",
          "Afficher tout les monstres",
        ],
      ],
      stateSave: true,
      language: {
        sInfo: "Affichage des monstres _START_ à _END_ sur _TOTAL_ monstres",
        sInfoEmpty: "Affichage des monstres 0 a 0 sur 0 monstres",
        sInfoFiltered: "(filtré à partir de _MAX_ monstres au total)",
        sLengthMenu: "_MENU_",
        sZeroRecords: "Aucun monstre n'a été trouvé",
        search: "",
        paginate: {
          previous: "&lt;",
          next: "&gt;",
        },
      },
      data: this.data.monsters,
      columns: [
        { data: "id", className: "col-id", title: "ID", type: "num" },
        {
          data: "monster.description.name",
          className: "col-name",
          title: "Nom",
        },
        {
          data: "monster.tags",
          className: "col-description",
          title: "Déscription",
        },
        {
          data: "monster.description.role",
          className: "col-role-rank",
          title: "Rôle et rang",
        },
        { data: "monster.ac.value", className: "col-ac-hp", title: "AC & HP" },
        {
          data: "monster.description.level",
          className: "col-level",
          title: "Niv.",
          type: "num",
        },
        {
          data: "monster.description.role",
          className: "col-role",
          title: "Rôle",
        },
        {
          data: "monster.description.rank",
          className: "col-rank",
          title: "Rang",
        },
        {
          data: "monster.ac.value",
          className: "col-ac",
          title: "Déf.",
          type: "num",
        },
        {
          data: "monster.hp.average",
          className: "col-hp",
          title: "PV",
          type: "num",
        },
      ],
      columnDefs: [
        {
          targets: [2],
          render: function (data, type, row) {
            return Helpers.formatMonsterDescription(
              row.monster.description.size,
              row.monster.description.type,
              row.monster.tags,
              row.monster.description.alignment
            );
          },
        },
        {
          targets: [3],
          render: function (data, type, row) {
            return row.monster.method == "manual"
              ? "—"
              : row.monster.description.role +
                  " " +
                  row.monster.description.rank +
                  (row.monster.description.rank == "solo"
                    ? " vs " + row.monster.description.players
                    : "");
          },
        },
        {
          targets: [4],
          render: function (data, type, row) {
            return (
              row.monster.ac.value + " AC, " + row.monster.hp.average + " HP"
            );
          },
        },
        {
          targets: [5, 9, 10],
          render: function (data, type, row) {
            switch (data) {
              case "—":
                return 0;
              default:
                return data;
            }
          },
        },
        {
          targets: [7],
          render: function (data, type, row) {
            return data == "solo"
              ? data + " vs " + row.monster.description.players
              : data;
          },
        },
        {
          targets: [8],
          render: function (data, type, row) {
            switch (data) {
              case "—":
                return 0;
              case "1/8":
                return 1 / 8;
              case "1/4":
                return 1 / 4;
              case "1/2":
                return 1 / 2;
              default:
                return data;
            }
          },
        },
      ],
      fixedColumns: true,
      autoWidth: false,
      order: [0, "asc"],
      deferRender: true,
      createdRow: function (row, data, dataIndex) {
        $(row).html(
          "<td colspan='11'>" +
            Handlebars.templates["PanelVaultRow"](data) +
            "</td>"
        );
      },
    });

    // Show any passthrough modals
    if (
      this.data.passthroughData != null &&
      this.data.passthroughData.showModal != null
    ) {
      $("#" + this.data.passthroughData.showModal).modal("show");
      this.data.passthroughData = null;
    }
  }

  attachListeners() {
    // Open edit panel on monster click
    let table = this.table;
    $(this.el + " .dataTable").on("click", "tbody tr", function () {
      Router.setUrl("/vault/" + table.row(this).data().id);
    });

    // Empty the vault by deleting all monsters
    $(this.el).on(
      "click",
      "#modal-empty .btn-confirm",
      function () {
        $("#modal-empty").one(
          "hidden.bs.modal",
          function () {
            Storage.setMonsters([]);
            this.table.clear().draw();
          }.bind(this)
        );
      }.bind(this)
    );

    // Empty the vault by deleting all monsters
    $(this.el).on(
      "click",
      ".btn-export-to-json",
      function () {
        this.exportVault();
      }.bind(this)
    );

    // Import monsters into the vault
    $(this.el).on(
      "click",
      ".btn-import-from-json",
      function () {
        $("#vault-import-file").click();
      }.bind(this)
    );

    // Import SRD monsters into the vault
    $(this.el).on("click", ".btn-import-srd", function () {
      $("#modal-import-srd-monsters").modal("show");
    });

    // Import srd monsters into the vault
    $(this.el).on(
      "click",
      "#modal-import-srd-monsters .btn-confirm",
      function () {
        Storage.importMonsters(SRD_MONSTERS);
        panel.data.monsters = Storage.getMonsters();
        panel.data.monsters.forEach(function (x) {
          try {
            x.monster = Frankenstein.createVaultMonster(x.blueprint);
          } catch (error) {
            console.error(
              "Couldn't create monster profile from blueprint, reverting to default"
            );
            x.monster = Frankenstein.createVaultMonster(new Blueprint());
          }
        });
        panel.table.clear().rows.add(panel.data.monsters).draw();
        $("#modal-imported-monsters .count").html(SRD_MONSTERS.length);
        $("#modal-imported-monsters").modal("show");
      }.bind(this)
    );

    let panel = this;
    $(this.el + " " + "#vault-import-file").change(function () {
      if (this.files && this.files.length > 0) {
        Files.loadTextFile(this.files[0], function (e) {
          let contents = JSON.parse(e.target.result);
          if (contents["vault"]) {
            Storage.importMonsters(contents["vault"]);
            panel.data.monsters = Storage.getMonsters();
            panel.data.monsters.forEach(function (x) {
              try {
                x.monster = Frankenstein.createVaultMonster(x.blueprint);
              } catch (error) {
                console.error(
                  "Couldn't create monster profile from blueprint, reverting to default"
                );
                x.monster = Frankenstein.createVaultMonster(new Blueprint());
              }
            });
            panel.table.clear().rows.add(panel.data.monsters).draw();
            $("#modal-imported-monsters .count").html(contents["vault"].length);
            $("#modal-imported-monsters").modal("show");
          } else if (contents["monster"]) {
            Storage.importMonster(contents["monster"]);
            panel.data.monsters = Storage.getMonsters();
            panel.data.monsters.forEach(function (x) {
              try {
                x.monster = Frankenstein.createVaultMonster(x.blueprint);
              } catch (error) {
                console.error(
                  "Couldn't create monster profile from blueprint, reverting to default"
                );
                x.monster = Frankenstein.createVaultMonster(new Blueprint());
              }
            });
            panel.table.clear().rows.add(panel.data.monsters).draw();
            $("#modal-imported-monsters .count").html(1);
            $("#modal-imported-monsters").modal("show");
          } else {
            $("#modal-import-monsters-failure").modal("show");
          }
        });
      }
      $("#vault-import-file").val("");
    });
  }

  /**
   * Clear the datatable.
   */
  clearComponent() {
    if (this.table != null) {
      this.table.destroy();
      this.table = null;
    }
  }

  /**
   * Exports the monster vault to a json file.
   */
  exportVault() {
    Files.saveJson("monster_vault", { vault: Storage.getMonsters() });
  }
}

export default PanelVault;
