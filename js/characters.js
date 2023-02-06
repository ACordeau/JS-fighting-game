// Player and Enemy instantiation
const player = new Fighter({
  position: {
    x: 0,
    y: 330,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/samuraiMack/idle Right.png",
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idleRight: {
      imageSrc: "./assets/samuraiMack/Idle Right.png",
      framesMax: 8,
    },
    idleLeft: {
      imageSrc: "./assets/samuraiMack/Idle Left.png",
      framesMax: 8,
    },
    runRight: {
      imageSrc: "./assets/samuraiMack/Run Right.png",
      framesMax: 8,
    },
    runLeft: {
      imageSrc: "./assets/samuraiMack/Run Left.png",
      framesMax: 8,
    },
    jumpRight: {
      imageSrc: "./assets/samuraiMack/Jump Right.png",
      framesMax: 2,
    },
    jumpLeft: {
      imageSrc: "./assets/samuraiMack/Jump Left.png",
      framesMax: 2,
    },
    fallRight: {
      imageSrc: "./assets/samuraiMack/Fall Right.png",
      framesMax: 2,
    },
    fallLeft: {
      imageSrc: "./assets/samuraiMack/Fall Left.png",
      framesMax: 2,
    },
    attack1Right: {
      imageSrc: "./assets/samuraiMack/Attack1 Right.png",
      framesMax: 6,
    },
    attack1Left: {
      imageSrc: "./assets/samuraiMack/Attack1 Left.png",
      framesMax: 6,
    },
    takeHitRight: {
      imageSrc: "./assets/samuraiMack/Take Hit Right.png",
      framesMax: 4,
    },
    takeHitLeft: {
      imageSrc: "./assets/samuraiMack/Take Hit Left.png",
      framesMax: 4,
    },
    deathRight: {
      imageSrc: "./assets/samuraiMack/Death Right.png",
      framesMax: 6,
    },
    deathLeft: {
      imageSrc: "./assets/samuraiMack/Death Left.png",
      framesMax: 6,
    },
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

const enemy = new Fighter({
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
  imageSrc: "./assets/kenji/Idle Left.png",
  scale: 2.5,
  offset: {
    x: 215,
    y: 167,
  },
  sprites: {
    idleRight: {
      imageSrc: "./assets/kenji/Idle Right.png",
      framesMax: 4,
    },
    idleLeft: {
      imageSrc: "./assets/kenji/Idle Left.png",
      framesMax: 4,
    },
    runRight: {
      imageSrc: "./assets/kenji/Run Right.png",
      framesMax: 8,
    },
    runLeft: {
      imageSrc: "./assets/kenji/Run Left.png",
      framesMax: 8,
    },
    jumpRight: {
      imageSrc: "./assets/kenji/Jump Right.png",
      framesMax: 2,
    },
    jumpLeft: {
      imageSrc: "./assets/kenji/Jump Left.png",
      framesMax: 2,
    },
    fallRight: {
      imageSrc: "./assets/kenji/Fall Right.png",
      framesMax: 2,
    },
    fallLeft: {
      imageSrc: "./assets/kenji/Fall Left.png",
      framesMax: 2,
    },
    attack1Right: {
      imageSrc: "./assets/kenji/Attack1 Right.png",
      framesMax: 4,
    },
    attack1Left: {
      imageSrc: "./assets/kenji/Attack1 Left.png",
      framesMax: 4,
    },
    takeHitRight: {
      imageSrc: "./assets/kenji/Take Hit Right.png",
      framesMax: 3,
    },
    takeHitLeft: {
      imageSrc: "./assets/kenji/Take Hit Left.png",
      framesMax: 3,
    },
    deathRight: {
      imageSrc: "./assets/kenji/Death Right.png",
      framesMax: 7,
    },
    deathLeft: {
      imageSrc: "./assets/kenji/Death Left.png",
      framesMax: 7,
    },
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
