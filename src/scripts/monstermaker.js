import TheApp from "./components/TheApp.js";
import Frankenstein from "./frankenstein.js";
import Helpers from "./helpers.js";
import Router from "./router.js";
import Storage from "./storage.js";

const MonsterMaker = (function () {
  function initialise() {
    // Initalise helpers and load stored data
    Helpers.initialise();
    Storage.load();
    Frankenstein.initialise(Storage.getRoles(), Storage.getRanks());

    // Create main app and render it
    let app = new TheApp({
      el: "#app",
    });
    app.render();

    // Initialise url router
    Router.initialise({});
  }

  return {
    initialise: initialise,
  };
})();

export default MonsterMaker;
