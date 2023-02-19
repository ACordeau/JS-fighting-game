const factory = new CharacterFactory();

// Player and Enemy instantiation
const playerInformation = {
  player: "player1",
  character: sessionStorage.getItem("player1"),
  position: {
    x: 0,
    y: 330,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  lastKey: "ArrowRight",
  scale: 2.5,
  attackBox: {
    offsetRight: {
      x: 100,
      y: 50,
    },
    offsetLeft: {
      x: -180,
      y: 50,
    },
    width: 150,
    height: 50,
  },
};

const player = factory.createCharacter(playerInformation);
console.log(player);

const enemyInformation = {
  player: "player2",
  character: sessionStorage.getItem("player2"),
  position: {
    x: 960,
    y: 330,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  lastKey: "ArrowLeft",
  scale: 2.5,
  attackBox: {
    offsetLeft: {
      x: -171,
      y: 50,
    },
    offsetRight: {
      x: 70,
      y: 50,
    },
    width: 171,
    height: 50,
  },
};

const enemy = factory.createCharacter(enemyInformation);
console.log(enemy);
