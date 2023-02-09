/**
 * Sprite class
 */
class Sprite {
  /**
   * Default constructor
   * @param {object} Position and Velocity
   */
  constructor({
    position,
    imageSrc = "",
    scale = 1,
    framesMax = 1,
    framesHold = 10,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.offset = offset;
  }

  /**
   * Draws the sprite to the canvas
   */
  draw() {
    context.drawImage(
      this.image,

      // framesMax location
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,

      // Image location
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  /**
   * Updates when called
   */
  update() {
    this.draw();
    this.animateFrames();
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
}

/**
 * Fighter class
 */
class Fighter extends Sprite {
  /**
   * Default constructor
   * @param {object} Position and Velocity
   */
  constructor({
    position,
    velocity,
    color = "red",
    scale = 1,
    framesMax = 1,
    framesHold = 10,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = {
      offsetRight: {},
      offsetLeft: {},
      width: undefined,
      height: undefined,
    },
    lastKey,
  }) {
    super({
      position,
      scale,
      framesMax,
      framesHold,
      offset,
    });
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey = lastKey;
    this.color = color;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offsetRight: attackBox.offsetRight,
      offsetLeft: attackBox.offsetLeft,
      width: attackBox.width,
      height: attackBox.height,
    };
    console.log("General");
    console.log(this.attackBox);

    this.isAttacking;
    this.isJumping;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.sprites = sprites;
    this.dead = false;
  }

  /**
   * Updates when called
   */
  update() {
    this.draw();

    if (!this.dead) {
      this.animateFrames();
    }

    // attack boxes
    if (!this.isAttacking) {
      if (this.lastKey === "a" || this.lastKey === "ArrowLeft") {
        this.attackBox.position.x =
          this.position.x + this.attackBox.offsetLeft.x;
        this.attackBox.position.y =
          this.position.y + this.attackBox.offsetLeft.y;
      } else {
        this.attackBox.position.x =
          this.position.x + this.attackBox.offsetRight.x;
        this.attackBox.position.y =
          this.position.y + this.attackBox.offsetRight.y;
      }
    }

    // Draw attack box
    // if (this.name === "Samurai Mack") {
    context.fillStyle = "Black";
    context.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
    // }

    // Updates the y position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // If the y position of the Sprite is greater than the value of the bottom of the canvas, set velocity = 0; Otherwise, gravity is continually applied.
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = ground;
    } else {
      // If jumping, gravity is normal, then when falling starts to compound
      if (this.velocity.y > 0) {
        this.velocity.y += gravity * 3;
      } else {
        this.velocity.y += gravity;
      }
    }
  }

  jump() {
    this.isJumping = true;
    if (this.velocity.y < 0) {
      if (this.lastKey === "a" || this.lastKey === "ArrowLeft") {
        this.switchSprite("jumpLeft");
      } else {
        this.switchSprite("jumpRight");
      }
    } else if (this.velocity.y > 0) {
      if (this.lastKey === "a" || this.lastKey === "ArrowLeft") {
        this.switchSprite("fallLeft");
      } else {
        this.switchSprite("fallRight");
      }
    }
  }

  attack() {
    if (this.lastKey === "a" || this.lastKey === "ArrowLeft") {
      this.switchSprite("attack1Left");
    } else {
      this.switchSprite("attack1Right");
    }
    this.isAttacking = true;
  }

  takeHit() {
    this.health -= 20;

    if (this.health <= 0) {
      if (this.lastKey === "a" || this.lastKey === "ArrowLeft") {
        this.switchSprite("deathLeft");
      } else {
        this.switchSprite("deathRight");
      }
    } else {
      if (this.lastKey === "a" || this.lastKey === "ArrowLeft") {
        this.switchSprite("takeHitLeft");
      } else {
        this.switchSprite("takeHitRight");
      }
    }
  }

  switchSprite(sprite) {
    // overriding when fighter dies
    if (
      this.image === this.sprites.deathLeft.image ||
      this.image === this.sprites.deathRight.image
    ) {
      if (
        this.framesCurrent === this.sprites.deathRight.framesMax - 1 ||
        this.framesCurrent === this.sprites.deathLeft.framesMax - 1
      ) {
        this.dead = true;
      }
      return;
    }

    // overriding all other animations with attack
    if (
      (this.image === this.sprites.attack1Right.image &&
        this.framesCurrent < this.sprites.attack1Right.framesMax - 1) ||
      (this.image === this.sprites.attack1Left.image &&
        this.framesCurrent < this.sprites.attack1Left.framesMax - 1)
    ) {
      return;
    }

    // overriding when fighter gets hit
    if (
      (this.image === this.sprites.takeHitRight.image &&
        this.framesCurrent < this.sprites.takeHitRight.framesMax - 1) ||
      (this.image === this.sprites.takeHitLeft.image &&
        this.framesCurrent < this.sprites.takeHitLeft.framesMax - 1)
    ) {
      return;
    }

    switch (sprite) {
      case "idleRight":
        if (this.image !== this.sprites.idleRight.image) {
          this.image = this.sprites.idleRight.image;
          this.framesMax = this.sprites.idleRight.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "idleLeft":
        if (this.image !== this.sprites.idleLeft.image) {
          this.image = this.sprites.idleLeft.image;
          this.framesMax = this.sprites.idleLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "runRight":
        if (this.image !== this.sprites.runRight.image) {
          this.image = this.sprites.runRight.image;
          this.framesMax = this.sprites.runRight.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "runLeft":
        if (this.image !== this.sprites.runLeft.image) {
          this.image = this.sprites.runLeft.image;
          this.framesMax = this.sprites.runLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jumpRight":
        if (this.image !== this.sprites.jumpRight.image) {
          this.image = this.sprites.jumpRight.image;
          this.framesMax = this.sprites.jumpRight.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jumpLeft":
        if (this.image !== this.sprites.jumpLeft.image) {
          this.image = this.sprites.jumpLeft.image;
          this.framesMax = this.sprites.jumpLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fallRight":
        if (this.image !== this.sprites.fallRight.image) {
          this.image = this.sprites.fallRight.image;
          this.framesMax = this.sprites.fallRight.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fallLeft":
        if (this.image !== this.sprites.fallLeft.image) {
          this.image = this.sprites.fallLeft.image;
          this.framesMax = this.sprites.fallLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1Right":
        if (this.image !== this.sprites.attack1Right.image) {
          this.image = this.sprites.attack1Right.image;
          this.framesMax = this.sprites.attack1Right.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1Left":
        if (this.image !== this.sprites.attack1Left.image) {
          this.image = this.sprites.attack1Left.image;
          this.framesMax = this.sprites.attack1Left.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHitRight":
        if (this.image !== this.sprites.takeHitRight.image) {
          this.image = this.sprites.takeHitRight.image;
          this.framesMax = this.sprites.takeHitRight.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHitLeft":
        if (this.image !== this.sprites.takeHitLeft.image) {
          this.image = this.sprites.takeHitLeft.image;
          this.framesMax = this.sprites.takeHitLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "deathRight":
        if (this.image !== this.sprites.deathRight.image) {
          this.image = this.sprites.deathRight.image;
          this.framesMax = this.sprites.deathRight.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "deathLeft":
        if (this.image !== this.sprites.deathLeft.image) {
          this.image = this.sprites.deathLeft.image;
          this.framesMax = this.sprites.deathLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}

class SamuraiMack extends Fighter {
  constructor({
    position,
    scale,
    framesMax,
    framesHold,
    offset,
    velocity,
    attackBox,
    lastKey,
  }) {
    super({
      position,
      scale,
      framesMax,
      framesHold,
      offset,
      velocity,
      attackBox,
    });
    this.name = "Samurai Mack";
    this.position = position;
    this.velocity = velocity;
    // this.attackBox = {
    //   position: {
    //     x: this.position.x,
    //     y: this.position.y,
    //   },
    //   offsetRight: attackBox.offsetRight,
    //   offsetLeft: attackBox.offsetLeft,
    //   width: attackBox.width,
    //   height: attackBox.height,
    // };

    let sprites = {
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
    };
    this.sprites = sprites;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
    this.lastKey = lastKey;
    this.hitFrame = 4;
  }
}

class Kenji extends Fighter {
  constructor({
    position,
    scale,
    framesMax,
    framesHold,
    offset,
    velocity,
    attackBox,
    lastKey,
  }) {
    super({
      position,
      scale,
      framesMax,
      framesHold,
      offset,
      velocity,
      attackBox,
    });
    this.name = "Kenji";
    this.position = position;
    this.velocity = velocity;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offsetRight: attackBox.offsetRight,
      offsetLeft: attackBox.offsetLeft,
      width: attackBox.width,
      height: attackBox.height,
    };
    let sprites = {
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
    };
    this.sprites = sprites;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
    this.lastKey = lastKey;
    this.hitFrame = 1;
  }
}
