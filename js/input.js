class InputHandler {
  constructor(controls, player) {
    // constructor(game) {
    // this.game = game;
    this.controls = controls;
    this.keys = [];
    this.lastKey = player === "player1" ? "d" : "ArrowLeft";

    window.addEventListener("keydown", (e) => {
      if (
        (e.key === this.controls.left ||
          e.key === this.controls.right ||
          e.key === this.controls.jump ||
          e.key === this.controls.down ||
          e.key === this.controls.attack) &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
        if (e.key === controls.left || e.key === controls.right) {
          this.lastKey = e.key;
        }
      } else if (e.key === "d") {
        // this.game.debug = !this.game.debug;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (
        e.key === this.controls.left ||
        e.key === this.controls.right ||
        e.key === this.controls.jump ||
        e.key === this.controls.down ||
        e.key === this.controls.attack
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
