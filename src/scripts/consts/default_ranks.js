/**
 * Default monster ranks.
 */
const DEFAULT_RANKS = {
  minion: {
    id: "minion",
    ac: 0,
    hp: 0.2,
    attack: -2,
    damage: 0.75,
    dc: -2,
    perception: -2,
    stealth: -2,
    initiative: -2,
  },
  standard: {
    id: "standard",
    ac: 0,
    hp: 1,
    attack: 0,
    damage: 1,
    dc: 0,
    perception: 0,
    stealth: 0,
    initiative: 0,
  },
  elite: {
    id: "elite",
    ac: 1,
    hp: 2,
    attack: 2,
    damage: 1.1,
    dc: 2,
    perception: 2,
    stealth: 2,
    initiative: 2,
  },
  solo: {
    id: "solo",
    ac: 2,
    hp: 4,
    attack: 2,
    damage: 1.2,
    dc: 2,
    perception: 4,
    stealth: 2,
    initiative: 4,
  },
};

export default DEFAULT_RANKS;
