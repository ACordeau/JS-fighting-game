const factory = new CharacterFactory();

// Player and Enemy instantiation
const playerInformation = {
  character: "SamuraiMack",
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
  offset: {
    x: 215,
    y: 157,
  },
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
  character: "Kenji",
  position: {
    x: 900,
    y: 330,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
  lastKey: "ArrowLeft",
  scale: 2.5,
  offset: {
    x: 215,
    y: 167,
  },
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
