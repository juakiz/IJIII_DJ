import Phaser from 'phaser'
import Geom from '../geom'

export default class extends Phaser.Sprite {
  constructor(game, x, y) {
    const opt = { bgColor: 0xFF0000 }
    super(game, x, y, 'char_idle')
    
    this.playIdle();

    this.anchor.setTo(0.5, 1)

    this.MAX_SPEED = 350
    // this.ACCELERATION = 1000
    this.DRAG = 600
    // this.GRAVITY = 2600
    this.JUMP_SPEED = -750
    this.health = 100

    this.music = this.game.add.audio('jump');
    this.music.volume += 0.5;

    this._state = this.game.state.getCurrentState()

    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10)
    this.body.drag.setTo(this.DRAG, 0)
    this.body.collideWorldBounds = true

    this.jumping = false
    this.jumps = 0
    this.game.myProps.difficulty ? this.hiperJamp = true : this.hiperJamp = false
    this.doubleJamp = false

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ])
    this.body.setSize(32, 103, 36, 30)
  }

  update () {
    this.game.physics.arcade.collide(this, this._state.ground)
    
    if (this.leftInputIsActive()) {
      this.body.velocity.x = -this.MAX_SPEED
      if (!this.isMirrored) {
        this.isMirrored = true;
        this.scale.x *= -1;
      }
      if (!this.jumping)
        this.animState = 'running'
    } else if (this.rightInputIsActive()) {
      this.body.velocity.x = this.MAX_SPEED
      if (this.isMirrored) {
        this.playRun()
        this.isMirrored = false;
        this.scale.x *= -1;
      }
      if (!this.jumping)
        this.animState = 'running'
    } else {
      this.body.velocity.x = 0
      if (!this.jumping)
        this.animState = 'idle'
    }

    // if (!this.onTheGround && this.body.touching.down) {
    //   this.game.camera.shake(0.01, 200);
    // }
    this.onTheGround = this.body.touching.down

    if (this.onTheGround && this.doubleJamp) {
      this.jumps = 2
      this.jumping = false
    } else if (this.onTheGround && !this.doubleJamp) {
      this.jumps = 1
      this.jumping = false
    }

    if (!this.onTheGround) {
      this.body.velocity.y > 780 ? this.health -= 2 : false
      console.log(this.health)
    }

    // saltar
    if (this.jumps > 0 && this.upInputIsActive() && this.hiperJamp) {
      this.music.play()
      this.body.velocity.y = this.JUMP_SPEED * 1.05
      this.jumping = true
      this.animState = 'jumping'
    } else if (this.jumps > 0 && this.upInputIsActive() && !this.hiperJamp) {
      this.music.play()
      this.body.velocity.y = this.JUMP_SPEED
      this.jumping = true
      this.animState = 'jumping'
    }
    // Reduce the number of available jumps if the jump input is released
    if (this.jumping && this.upInputReleased()) {
      this.jumps--
      this.jumping = false
    }

    this.dead()

    this.FSM()
  }

  leftInputIsActive () {
    let isActive = false
    isActive = this._state.input.keyboard.isDown(Phaser.Keyboard.LEFT)
    return isActive
  }

  rightInputIsActive () {
    let isActive = false
    isActive = this._state.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
    return isActive
  }

  upInputIsActive () {
    let isActive = false
    isActive = this._state.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR)
    return isActive
  }

  upInputReleased () {
    var released = false
    released = this._state.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR)
    return released
  }
  
  dead () {
    if (this.health <= 0) {
      this.game.state.start('GameOver')
    }
  }

  FSM() {
    if (this.animState === 'playDead') {
      return;
    }

    if (!this.onTheGround) {
      if (this.animations.currentAnim.name !== 'jump') {
        this.playJump()
      }
      return;
    }

    switch (this.animState) {
      case 'running':
        if(this.animations.currentAnim.name !== 'run') {
          this.playRun()
        }
        break;
      // case 'jumping':
      //   if(this.animations.currentAnim.name !== 'jump') {
      //     this.playJump()
      //   }
      //   break;
      case 'talking':
        if(this.animations.currentAnim.name !== 'talk') {
          this.playTalk()
        }
        break;
      default:
        if(this.animations.currentAnim.name !== 'idle') {
          this.playIdle()
        }
    }
  }

  // Anims
  playIdle() {
    this.loadTexture('char_idle', 0);
    this.animations.add('idle');
    this.animations.play('idle', 6, true);
  }

  playRun() {
    this.loadTexture('char_run', 0);
    this.animations.add('run');
    this.animations.play('run', 12, true);
  }

  playJump() {
    this.loadTexture('char_jump', 0);
    this.animations.add('jump');
    this.animations.play('jump', 9, true);
  }

  playTalk() {
    this.loadTexture('char_talk', 0);
    this.animations.add('talk');
    this.animations.play('talk', 12, true);
  }
  
  playDead() {
    this.loadTexture('char_dead', 0);
    this.animations.add('dead');
    this.animations.play('dead', 3, true);
  }
}
