/**
 * A quickstart container for automated monster details (ac/hp/damage/etc).
 */
class Quickstarter {
  constructor(level) {
    this.level = null;
    this.role = {
      id: null,
      ac: 0,
      attack: 0,
      damage: 1,
      hp: 1,
      dc: 0,
    };
    this.rank = {
      id: null,
      ac: 0,
      attack: 0,
      damage: 1,
      hp: 1,
      dc: 0,
    };
    this.proficiency = null;
    this.abilities = [];
    this.archetypes = [];
    this.ac = null;
    this.attack = null;
    this.damage = null;
    this.hp = null;
    this.dc = null;
    this.skills = null;
    this.xp = null;
    this.perception = null;
    this.stealth = null;
    this.initiative = null;

    // Get calculated level details
    let proficiency = Math.floor((level + 3) / 4) + 1;
    let ability = 0;
    let archetype = 0;
    this.level = level;
    this.proficiency = proficiency;
    this.abilities = [3, 2, 1, 0, -1, -2];
    this.archetypes = [3, 2, 1, 0, -1, -2];
    this.ac = Math.floor(12 + level / 4);
    this.attack = ability + proficiency - 2;
    this.damage = 2;
    this.hp = 6;
    this.dc = Math.floor(ability * 0.66) + proficiency + 8;
    this.skillBonus = Math.floor(ability * 0.66);
    this.perception = null;
  }

  getLevel() {
    return this.level;
  }

  getRole() {
    return this.role;
  }

  setRole(role) {
    this.role = role;
  }

  getRank() {
    return this.rank;
  }

  setRank(rank) {
    this.rank = rank;
  }

  getProficiency() {
    return this.proficiency;
  }

  getAbility(index) {
    return this.abilities[index];
  }

  getArchetype(index) {
    return this.archetypes[index];
  }

  getAc() {
    return math.floor(this.ac + this.role.ac + this.rank.ac);
  }

  getAttack() {
    return this.attack + this.role.attack + this.rank.attack;
  }

  getDamage() {
    return Math.max(
      Math.ceil(this.damage * this.role.damage * this.rank.damage),
      1
    );
  }

  getHp() {
    return Math.max(Math.floor(this.hp * this.role.hp * this.rank.hp), 1);
  }

  getDcPrimary() {
    return this.dc + this.role.dc + this.rank.dc;
  }

  getDcSecondary() {
    return this.dc + this.role.dc + this.rank.dc - 3;
  }

  getPerception() {
    return (
      this.skillBonus +
      (this.role.perception ? this.proficiency : 0) +
      this.rank.perception
    );
  }

  getStealth() {
    return (
      this.skillBonus +
      (this.role.stealth ? this.proficiency : 0) +
      this.rank.stealth
    );
  }

  getInitiative() {
    return (
      this.skillBonus +
      (this.role.initiative ? this.proficiency : 0) +
      this.rank.initiative
    );
  }

  getCombatLevel() {
    let combatLevel = {
      1: ["1"],
      2: ["2"],
      3: ["3"],
      4: ["4"],
      5: ["5"],
      6: ["6"],
      7: ["7"],
      8: ["8"],
      9: ["9"],
      10: ["10"],
      11: ["11"],
      12: ["12"],
      13: ["13"],
      14: ["14"],
      15: ["15"],
      16: ["16"],
      17: ["17"],
      18: ["18"],
      19: ["19"],
      20: ["20"],
    };
    if (this.level < -3 || this.level > 30) {
      return "—";
    } else {
      let rankIndex = ["minion", "standard", "elite", "solo"].indexOf(
        this.rank.id
      );
      return combatLevel[this.level][rankIndex == -1 ? 2 : rankIndex];
    }
  }

  getXp() {
    let xp = {
      "-3": 10,
      "-2": 25,
      "-1": 50,
      0: 100,
      1: 200,
      2: 450,
      3: 700,
      4: 1100,
      5: 1800,
      6: 2300,
      7: 2900,
      8: 3900,
      9: 5000,
      10: 5900,
      11: 7200,
      12: 8400,
      13: 10000,
      14: 11500,
      15: 13000,
      16: 15000,
      17: 18000,
      18: 20000,
      19: 22000,
      20: 25000,
      21: 33000,
      22: 41000,
      23: 50000,
      24: 62000,
      25: 75000,
      26: 90000,
      27: 105000,
      28: 120000,
      29: 135000,
      30: 155000,
    };
    if (this.level < -3 || this.level > 30) {
      return "—";
    } else {
      return Math.max(
        Math.floor(xp[this.level] * this.role.xp * this.rank.xp),
        1
      );
    }
  }
}

export default Quickstarter;
