// TODO ADD CONTROLLER SUPPORT
// TODO Tweak Movement
// TODO ADD DOUBLE JUMP - SamuraiMack
// TODO ADD BLOCKING - Kenji
// TODO ADD MORE THAN ONE ATTACK
// TODO ALLOW PLAYERS TO JUMP ON SHOP
// TODO REFACTOR
// TODO COMMENT EVERYTHING
// TODO ABSTRACT FRAMES HOLD FROM SPRITES
// TODO STOP CHARACTERS FROM ACTING DURING DEATH ANIMATION
// TODO MAKE CHARACTER SELECT CHOOSE CHARACTERS
// DONE ABSTRACT CHARACTERS
// DONE FLIP SPRITES
// DONE FLIP ATTACK BOX
// DONE FIX LEAVING EDGE OF SCREEN
// DONE FIX INIFINITE JUMPING
// DONE ADD HOME PAGE
// DONE ADD CHARACTER SELECT
// DONE SAVE CHARACTER SELECT CHOICES IN SESSION STORAGE

// Select the canvas and window context
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const playerHealth = document.querySelector("#playerHealth");
const enemyHealth = document.querySelector("#enemyHealth");
const gameTimer = document.querySelector("#timer");
const displayText = document.querySelector("#displayText");

// Set height and width of canvas and give it a background
canvas.width = 1024;
canvas.height = 576;
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
const ground = 330;
let timer = 60;
let timerId;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/background.png",
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: "./assets/shop.png",
  scale: 2.75,
  framesMax: 6,
  framesHold: 30,
});

// Object containing pressed values of keys
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

/**
 * Animate loop
 */
function animate() {
  window.requestAnimationFrame(animate);

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // Player movement
  if (keys.a.pressed && player.lastKey === "a" && player.position.x >= 0) {
    player.velocity.x = -5;
    player.switchSprite("runLeft");
  } else if (
    keys.d.pressed &&
    player.lastKey === "d" &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 5;
    player.switchSprite("runRight");
  } else {
    if (player.lastKey === "a") {
      player.switchSprite("idleLeft");
    } else {
      player.switchSprite("idleRight");
    }
  }

  if (player.velocity.y != 0) {
    player.jump();
  } else {
    player.isJumping = false;
  }

  // Enemy movement
  if (
    keys.ArrowLeft.pressed &&
    enemy.lastKey === "ArrowLeft" &&
    enemy.position.x >= 0
  ) {
    enemy.velocity.x = -5;
    enemy.switchSprite("runLeft");
  } else if (
    keys.ArrowRight.pressed &&
    enemy.lastKey === "ArrowRight" &&
    enemy.position.x + enemy.width <= canvas.width
  ) {
    enemy.switchSprite("runRight");
    enemy.velocity.x = 5;
  } else {
    if (enemy.lastKey === "ArrowLeft") {
      enemy.switchSprite("idleLeft");
    } else {
      enemy.switchSprite("idleRight");
    }
  }

  // Jumping
  if (enemy.velocity.y != 0) {
    enemy.jump();
  } else {
    enemy.isJumping = false;
  }

  // detect for collision Player to Enemy
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    player.isAttacking = false;
    enemy.takeHit();
    gsap.to(enemyHealth, {
      width: enemy.health + "%",
    });
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  // detect for collision Enemy to Player
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 1
  ) {
    enemy.isAttacking = false;
    player.takeHit();
    gsap.to(playerHealth, {
      width: player.health + "%",
    });
  }

  // if enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner();
  }
}

animate();
// decreaseTimer();

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    switch (event.key) {
      // Player Keyboard controls
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        if (!player.isJumping) {
          player.velocity.y = -20;
        }
        break;
      case " ":
        player.attack();
        break;
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      // Enemy Keyboard controls
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        if (!enemy.isJumping) {
          enemy.velocity.y = -20;
        }
        break;
      case "Control":
        enemy.attack();
        break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // Player key unpress
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    // Enemy key unpress
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
