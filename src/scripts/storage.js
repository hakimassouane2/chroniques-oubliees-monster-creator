import Blueprint from "./classes/blueprint.js";
import DEFAULT_RANKS from "./consts/default_ranks.js";
import DEFAULT_ROLES from "./consts/default_roles.js";
import DEFAULT_TRAITS from "./consts/default_traits.js";

/**
 * A storage container for the site data.
 */
const Storage = (function () {
  let data = {
    laboratory: getDefaultLaboratory(),
    fragments: {
      roles: getDefaultRoles(),
      ranks: getDefaultRanks(),
      traits: getDefaultTraits(),
    },
    vault: {
      id: 0,
      monsters: getDefaultMonsters(),
    },
    settings: getDefaultSettings(),
  };

  /**
   * Get the default laboratory details.
   */
  function getDefaultLaboratory() {
    let blueprint = new Blueprint();
    blueprint.setSpeedNormal("30 ft.");
    blueprint.setLanguages([
      {
        name: "common",
        custom: null,
      },
    ]);
    blueprint.setTraits([
      {
        name: "(Assaillant) Assaut Sauvage",
        detail:
          "Une fois par tour, ajoutez votre niveau en supplémentaires à une attaque.",
      },
      {
        name: "Sournois",
        detail: "Vous pouvez vous _désengager_ par une action bonus.",
      },
    ]);
    blueprint.setActions([
      {
        name: "Tranche",
        detail:
          "_Attaque au corps à corps avec une arme:_ [attack] contre Défenses. _Touché:_ [damage, d4] dégâts tranchants.",
      },
      {
        name: "Recul",
        detail:
          "_Attaque au corps à corps avec une arme:_ [dc-primary] vs Force. _Touché:_ la cible est repoussée jusqu'à 10 ft. de distance.",
      },
    ]);
    return {
      blueprint: blueprint,
      display: {},
    };
  }

  /**
   * Get the default monster roles.
   */
  function getDefaultRoles() {
    return DEFAULT_ROLES;
  }

  /**
   * Get the default monster ranks.
   */
  function getDefaultRanks() {
    return DEFAULT_RANKS;
  }

  /**
   * Get the default monster traits.
   */
  function getDefaultTraits() {
    return DEFAULT_TRAITS;
  }

  /**
   * Get the default vaulted monsters.
   */
  function getDefaultMonsters() {
    return [];
  }

  /**
   * Get the default user settings.
   */
  function getDefaultSettings() {
    return {
      theme: {
        monster: "giffyglyph",
      },
      defence: "disabled",
    };
  }

  /**
   * Load the storage details from localStorage, or use defaults if no data exists.
   */
  function load() {
    let laboratory = localStorage.getItem("laboratory");
    data.laboratory =
      laboratory == null ? getDefaultLaboratory() : JSON.parse(laboratory);
    data.laboratory.blueprint = new Blueprint(data.laboratory.blueprint);

    let monsters = localStorage.getItem("monsters");
    data.vault.monsters =
      monsters == null ? getDefaultMonsters() : JSON.parse(monsters);
    data.vault.monsters.forEach(function (monster, index) {
      data.vault.monsters[index].blueprint = new Blueprint(
        data.vault.monsters[index].blueprint
      );
    });
    refreshVaultId();

    let settings = localStorage.getItem("settings");
    data.settings =
      settings == null ? getDefaultSettings() : JSON.parse(settings);
  }

  /**
   * Clear stored data and wipe the localStorage bins.
   */
  function clear() {
    data.laboratory = getDefaultLaboratory();
    data.vault.monsters = getDefaultMonsters();
    data.vault.id = 1;
    localStorage.clear();
  }

  /**
   * Gets the laboratory blueprint.
   */
  function getLaboratoryBlueprint() {
    return data.laboratory.blueprint;
  }

  /**
   * Sets the laboratory blueprint and updates localStorage.
   * @param {object} blueprint - The new laboratory blueprint.
   */
  function setLaboratoryBlueprint(blueprint) {
    data.laboratory.blueprint = blueprint;
    localStorage.setItem("laboratory", JSON.stringify(data.laboratory));
    document.dispatchEvent(
      new CustomEvent("storage:blueprint:changed", { detail: null })
    );
  }

  /**
   * Gets the laboratory display settings.
   */
  function getLaboratoryDisplay() {
    return data.laboratory.display;
  }

  /**
   * Sets the laboratory display settings and updates localStorage.
   * @param {object} display - The laboratory display settings.
   */
  function setLaboratoryDisplay(display) {
    data.laboratory.display = display;
    localStorage.setItem("laboratory", JSON.stringify(data.laboratory));
  }

  /**
   * Gets the role fragments.
   */
  function getRoles() {
    return data.fragments.roles;
  }

  /**
   * Gets the rank fragments.
   */
  function getRanks() {
    return data.fragments.ranks;
  }

  /**
   * Gets the trait fragments.
   */
  function getTraits() {
    return data.fragments.traits;
  }

  /**
   * Gets a specific trait fragment.
   */
  function getTrait(id) {
    return data.fragments.traits.find((x) => x.id == id);
  }

  /**
   * Gets the vaulted monsters blueprints.
   */
  function getMonsters() {
    return data.vault.monsters;
  }

  /**
   * Sets the vaulted monster collection.
   */
  function setMonsters(monsters) {
    data.vault.monsters = monsters;
    refreshVaultId();
    localStorage.setItem("monsters", JSON.stringify(data.vault.monsters));
  }

  /**
   * Gets a monster entry from storage.
   */
  function getMonster(id) {
    let index = data.vault.monsters.findIndex((x) => x.id == id);
    return index == -1 ? null : data.vault.monsters[index];
  }

  /**
   * Deletes a monster entry from storage.
   */
  function deleteMonster(id) {
    data.vault.monsters = data.vault.monsters.filter((x) => x.id != id);
    localStorage.setItem("monsters", JSON.stringify(data.vault.monsters));
  }

  /**
   * Saves a monster blueprint to the vault.
   * @param {object} blueprint - The blueprint to save.
   * @returns {number} The id of the new monster.
   */
  function saveMonster(blueprint) {
    if (data.vault.monsters.findIndex((x) => x.id == data.vault.id) != -1) {
      refreshVaultId();
    }
    let newId = data.vault.id;
    data.vault.id += 1;
    data.vault.monsters.push({
      id: newId,
      blueprint: blueprint,
      created: Date.now(),
      updated: Date.now(),
    });
    localStorage.setItem("monsters", JSON.stringify(data.vault.monsters));
    return newId;
  }

  function refreshVaultId() {
    data.vault.id =
      data.vault.monsters.length > 0
        ? Math.max(...data.vault.monsters.map((x) => x.id)) + 1
        : 1;
  }

  /**
   * Imports a collection of monster records to the vault.
   * @param {collection} records - The monster records.
   */
  function importMonsters(records) {
    refreshVaultId();
    records.forEach(function (record) {
      data.vault.monsters.push({
        id: data.vault.id,
        blueprint: new Blueprint(record.blueprint ? record.blueprint : record),
        created: record.created ? new Date(record.created) : new Date(),
        updated: record.updated ? new Date(record.updated) : new Date(),
      });
      data.vault.id += 1;
    });
    localStorage.setItem("monsters", JSON.stringify(data.vault.monsters));
  }

  /**
   * Imports one monster records to the vault.
   * @param {object} record - The monster record.
   */
  function importMonster(record) {
    refreshVaultId();
    data.vault.monsters.push({
      id: data.vault.id,
      blueprint: new Blueprint(record.blueprint ? record.blueprint : record),
      created: record.created ? new Date(record.created) : new Date(),
      updated: record.updated ? new Date(record.updated) : new Date(),
    });
    data.vault.id += 1;
    localStorage.setItem("monsters", JSON.stringify(data.vault.monsters));
  }

  /**
   * Updates an existing monster blueprint in the vault.
   * @param {number} id - The index of the currenty monster.
   * @param {object} blueprint - The new blueprint to save.
   */
  function updateMonster(id, blueprint) {
    let index = data.vault.monsters.findIndex((x) => x.id == id);
    data.vault.monsters[index].blueprint = blueprint;
    data.vault.monsters[index].updated = Date.now();
    localStorage.setItem("monsters", JSON.stringify(data.vault.monsters));
  }

  /**
   * Gets the app settings.
   */
  function getSettings() {
    return data.settings;
  }

  /**
   * Sets the app settings.
   */
  function setSettings(settings) {
    data.settings = settings;
    localStorage.setItem("settings", JSON.stringify(data.settings));
  }

  return {
    load: load,
    clear: clear,
    getDefaultLaboratory: getDefaultLaboratory,
    getLaboratoryBlueprint: getLaboratoryBlueprint,
    setLaboratoryBlueprint: setLaboratoryBlueprint,
    getLaboratoryDisplay: getLaboratoryDisplay,
    setLaboratoryDisplay: setLaboratoryDisplay,
    getRoles: getRoles,
    getRanks: getRanks,
    getTraits: getTraits,
    getTrait: getTrait,
    getMonsters: getMonsters,
    setMonsters: setMonsters,
    getMonster: getMonster,
    deleteMonster: deleteMonster,
    saveMonster: saveMonster,
    importMonsters: importMonsters,
    importMonster: importMonster,
    updateMonster: updateMonster,
    getSettings: getSettings,
    setSettings: setSettings,
  };
})();

export default Storage;
