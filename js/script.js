// TODO ADD CONTROLLER SUPPORT
// TODO TWEAK MOVEMENT
// TODO ADD DOUBLE JUMP - SamuraiMack
// TODO ADD PROJECTILE - Kenji
// TODO ADD MORE THAN ONE ATTACK
// TODO ALLOW PLAYERS TO JUMP ON SHOP
// TODO REFACTOR
// TODO COMMENT EVERYTHING
// TODO ABSTRACT FRAMES HOLD FROM SPRITES
// TODO STOP CHARACTERS FROM ACTING DURING DEATH ANIMATION
// TODO ADD NEW CHARACTER
// TODO GAME BALANCE
// TODO ABSTRACT CONTROLS
// TODO ADD END GAME SCREEN

// DONE MAKE CHARACTER SELECT CHOOSE CHARACTERS
// DONE TWEAK CHARACTER STARTING POSITIONS
// DONE FIX DEATH ANIMATION BREAKING WHEN FACING OPPOSITE STARTING DIRECTION
// DONE FIX SPRITES BEING FLIPPED BUT NOT INVERTED
// DONE ABSTRACT FRAMES TO HIT
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

  if (
    player.input.keys.includes(player.input.controls.left) &&
    player.input.lastKey === player.input.controls.left &&
    player.position.x >= 0
  ) {
    player.velocity.x = -5;
    player.switchSprite("runLeft");
  } else if (
    player.input.keys.includes(player.input.controls.right) &&
    player.input.lastKey === player.input.controls.right &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 5;
    player.switchSprite("runRight");
  } else {
    if (player.input.lastKey === player.input.controls.left) {
      player.switchSprite("idleLeft");
    } else {
      player.switchSprite("idleRight");
    }
  }

  // Player jumping

  if (player.input.keys.includes(player.input.controls.jump)) {
    if (!player.isJumping) {
      player.velocity.y = -20;
    }
  }

  if (player.velocity.y != 0) {
    player.jump();
  } else {
    player.isJumping = false;
  }

  // Player attack

  if (player.input.keys.includes(player.input.controls.attack)) {
    player.attack();
  }

  // Enemy movement
  if (
    enemy.input.keys.includes(enemy.input.controls.left) &&
    enemy.input.lastKey === enemy.input.controls.left &&
    enemy.position.x >= 0
  ) {
    enemy.velocity.x = -5;
    enemy.switchSprite("runLeft");
  } else if (
    enemy.input.keys.includes(enemy.input.controls.right) &&
    enemy.input.lastKey === enemy.input.controls.right &&
    enemy.position.x + enemy.width <= canvas.width
  ) {
    enemy.switchSprite("runRight");
    enemy.velocity.x = 5;
  } else {
    if (enemy.input.lastKey === enemy.input.controls.left) {
      enemy.switchSprite("idleLeft");
    } else {
      enemy.switchSprite("idleRight");
    }
  }

  // Jumping
  if (enemy.input.keys.includes(enemy.input.controls.jump)) {
    if (!enemy.isJumping) {
      enemy.velocity.y = -20;
    }
  }

  if (enemy.velocity.y != 0) {
    enemy.jump();
  } else {
    enemy.isJumping = false;
  }

  if (enemy.input.keys.includes(enemy.input.controls.attack)) {
    enemy.attack();
  }

  // detect for collision Player to Enemy
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent === player.hitFrame
  ) {
    player.isAttacking = false;
    enemy.takeHit();
    gsap.to(enemyHealth, {
      width: enemy.health + "%",
    });
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === player.hitFrame) {
    player.isAttacking = false;
  }

  // detect for collision Enemy to Player
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === enemy.hitFrame
  ) {
    enemy.isAttacking = false;
    player.takeHit();
    gsap.to(playerHealth, {
      width: player.health + "%",
    });
  }

  // if enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === enemy.hitFrame) {
    enemy.isAttacking = false;
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner();
  }
}

animate();
// decreaseTimer();
