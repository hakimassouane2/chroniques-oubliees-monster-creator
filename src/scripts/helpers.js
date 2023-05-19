import "./templates.js";

/**
 * Common helpers and handlebars functions.
 */
const Helpers = (function () {
  /**
   * Initialise the handlebars helpers.
   */
  function initialise() {
    // Set list of handlebars partials
    Handlebars.partials = Handlebars.templates;

    // Helpers used by the blueprint form

    Handlebars.registerHelper("setValue", function (value) {
      return value == undefined || value == null
        ? ""
        : 'value="' + value.toString().replace(/"/g, "'") + '"';
    });

    Handlebars.registerHelper("customToggle", function (state) {
      return state == undefined || state == null || state != "custom"
        ? "style='display: none'"
        : "";
    });

    Handlebars.registerHelper("selected", function (key, value) {
      return key == value ? "selected" : "";
    });

    Handlebars.registerHelper("selectedDefault", function (key, value) {
      return key == value || key == null ? "selected" : "";
    });

    Handlebars.registerHelper("checked", function (key, value) {
      return key == value ? "checked" : "";
    });

    Handlebars.registerHelper("fmtTextarea", function (value) {
      return value ? value.replace(/\r\n|\n/g, "&#10;") : null;
    });

    Handlebars.registerHelper("fmtModifier", function (value) {
      return (value >= 0 ? "+" : "−") + Math.abs(value);
    });

    Handlebars.registerHelper("fmtCapitalise", function (text) {
      return capitalise(text);
    });

    Handlebars.registerHelper("fmtFormatLanguage", function (text) {
      let languageMap = {
        abyssal: "Abyssal",
        celestial: "Céleste",
        common: "Commun",
        deepspeech: "Profond",
        draconic: "Draconique",
        dwarvish: "Nain",
        elvish: "Elfique",
        giant: "Géant",
        gnomish: "Gnome",
        goblin: "Gobelin",
        halfling: "Halfelin",
        infernal: "Infernal",
        orc: "Orque",
        primordial: "Primordial",
        sylvan: "Sylvestre",
        undercommon: "Commun des profondeurs",
        all: "Toutes les langues",
      };
      return languageMap[text];
    });

    Handlebars.registerHelper("calculateXpValue", function (description) {
      const levelMap = [
        50, 112, 175, 275, 450, 575, 725, 975, 1250, 1475, 1800, 2100, 2500,
        2875, 3250, 3750, 4500, 5000, 5500, 6250,
      ];
      const rankMap = {
        minion: 0.25,
        standard: 1,
        elite: 2,
        solo: 4,
      };
      return Math.floor(
        levelMap[description.level - 1] * rankMap[description.rank]
      ).toString();
    });

    Handlebars.registerHelper("fmtFormatRank", function (text) {
      let rankMap = {
        minion: "Sbire",
        standard: "Standard",
        elite: "Élite",
        solo: "Solo",
      };
      return rankMap[text];
    });

    Handlebars.registerHelper("fmtFormatRole", function (text) {
      let roleMap = {
        controller: "Contrôleur",
        defender: "Défenseur",
        lurker: "Rôdeur",
        skirmisher: "Éclaireur",
        striker: "Assaillant",
        supporter: "Soutien",
      };
      return roleMap[text];
    });

    Handlebars.registerHelper("fmtLocaleString", function (value) {
      return Number(value).toLocaleString();
    });

    Handlebars.registerHelper(
      "fmtMonsterDescription",
      function (size, type, tags, alignment) {
        return formatMonsterDescription(size, type, tags, alignment);
      }
    );

    Handlebars.registerHelper("fmtVaultCell", function (value) {
      return value == "—" ? "<span style='opacity:0.25'>—</span>" : value;
    });

    Handlebars.registerHelper("fmtMonsterSpeeds", function (speeds) {
      let output = "";
      let speedMap = {
        walk: "Marche",
        burrow: "Creusement",
        climb: "Escalade",
        fly: "Vol",
        hover: "Survol",
        swim: "Nage",
      };
      speeds.forEach(function (speed, index) {
        switch (speed.type) {
          case "normal":
          case "other":
            output += speed.value;
            break;
          default:
            output += speedMap[speed.type] + " " + speed.value;
            break;
        }
        if (index < speeds.length - 1) {
          output += ", ";
        }
      });
      return output;
    });

    Handlebars.registerHelper("fmtMonsterSenses", function (senses) {
      let output = "";
      senses.forEach(function (sense, index) {
        switch (sense.type) {
          case "other":
            output += sense.value;
            break;
          default:
            output += sense.type + " " + sense.value;
            break;
        }
        if (index < senses.length - 1) {
          output += ", ";
        }
      });
      return output;
    });

    Handlebars.registerHelper("fmtGMBinderMarkdown", function (text) {
      let output = text;
      output = output.replace(/<\/?b>/g, "**");
      output = output.replace(/<\/?i>/g, "_");
      output = output.replace(
        /<span class="line-break">&nbsp;<\/span>/g,
        "\n> "
      );
      return output;
    });
  }

  /**
   * Capitalise a string.
   * @param {string} text - A string to capitalise.
   * @return {string} A capitalised string.
   */
  function capitalise(text) {
    return text && text.length > 0
      ? text.charAt(0).toUpperCase() + text.slice(1)
      : null;
  }

  function groupBy(xs, f) {
    return xs.reduce(
      (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
      {}
    );
  }

  /**
   * Sanitise a string to a safe filename.
   * Original src: https://github.com/parshap/node-sanitize-filename/blob/master/index.js
   * @param {string} filename - The target filename.
   * @returns {string} - A sanitised string (max length 200).
   */
  function sanitiseFilename(filename) {
    let illegalRe = /[\/\?<>\\:\*\|":]/g;
    let controlRe = /[\x00-\x1f\x80-\x9f]/g;
    let reservedRe = /^\.+$/;
    let windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    let windowsTrailingRe = /[\. ]+$/;
    let output = filename
      .replace(illegalRe, "")
      .replace(controlRe, "")
      .replace(reservedRe, "")
      .replace(windowsReservedRe, "")
      .replace(windowsTrailingRe, "");
    return output.substring(0, Math.min(200, output.length));
  }

  /**
   * Formats monster description details into a standarised string.
   * @param {string} size - The monster's size.
   * @param {string} type - The monster's type.
   * @param {string} tags - The monster's tags.
   * @param {string} alignment - The monster's alignmnet.
   * @returns {string} - The monster description.
   */
  function formatMonsterDescription(size, type, tags, alignment) {
    let output = "";
    let sizeMap = {
      tiny: " de taille TP",
      small: " de taille P",
      medium: " de taille M",
      large: " de taille G",
      huge: " de taille TG",
      gargantuan: " de taille Gig",
    };

    let typeMap = {
      aberration: "Aberration",
      beast: "Bête",
      celestial: "Céleste",
      construct: "Artificiel",
      dragon: "Dragon",
      elemental: "Élémentaire",
      fey: "Fée",
      fiend: "Fiélon",
      giant: "Géant",
      humanoid: "Humanoïde",
      monstrosity: "Monstruosité",
      ooze: "Vase",
      plant: "Plante",
      undead: "Mort-vivant",
    };

    let alignmentMap = {
      "chaotic good": "chaotique bon",
      "chaotic neutral": "chaotique neutre",
      "chaotic evil": "chaotique mauvais",
      "neutral good": "neutre bon",
      neutral: "neutre",
      "neutral evil": "neutre mauvais",
      "lawful good": "loyal bon",
      "lawful neutral": "loyal neutre",
      "lawful evil": "loyal mauvais",
      unaligned: "sans alignement",
    };

    if (type != null) {
      if (output.length != 0) {
        output += " ";
      }
      output += typeMap[type];
    }
    if (size != null) {
      output += sizeMap[size];
    }
    if (tags != null && tags.length > 0) {
      if (output.length != 0) {
        output += " ";
      }
      output += "(";
      tags.forEach(function (tag, index) {
        output += tag;
        if (index < tags.length - 1) {
          output += ", ";
        }
      });
      output += ")";
    }
    if (alignment != null) {
      if (output.length != 0) {
        output += ", ";
      }
      output += alignmentMap[alignment];
    }
    return output;
  }

  /**
   * Dispatches a new custom event.
   * @param {string} name - The name of the new event.
   * @param {object} details - Data we wish to send with the event.
   */
  function dispatchEvent(name, details) {
    document.dispatchEvent(new CustomEvent(name, { detail: details }));
  }

  return {
    initialise: initialise,
    capitalise: capitalise,
    sanitiseFilename: sanitiseFilename,
    dispatchEvent: dispatchEvent,
    formatMonsterDescription: formatMonsterDescription,
  };
})();

export default Helpers;
