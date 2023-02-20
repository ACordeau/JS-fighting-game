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
  controls: {
    left: "a",
    right: "d",
    jump: "w",
    down: "s",
    attack: " ",
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
  controls: {
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp",
    down: "ArrowDown",
    attack: "Control",
  },
};

const enemy = factory.createCharacter(enemyInformation);
console.log(enemy);
