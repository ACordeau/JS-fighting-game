// Player and Enemy instantiation
const player = new SamuraiMack({
  position: {
    x: 0,
    y: 330,
  },
  velocity: {
    x: 0,
    y: 0,
  },
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
});

console.log(player);

const enemy = new Kenji({
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
});

console.log(enemy);
