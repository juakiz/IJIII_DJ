import Phaser from 'phaser'
import Geom from '../geom'

export default class extends Phaser.Sprite {
  constructor(game, x, y) {
    const opt = { bgColor: 0xFF0000 }
    super(game, x, y, 'char_idle')
    this.anchor.setTo(0.5, 1)

    this.animations.add('idle');

    this.animations.play('idle', 6, true);

    this.MAX_SPEED = 350
    // this.ACCELERATION = 1000
    this.DRAG = 600
    // this.GRAVITY = 2600
    this.JUMP_SPEED = -750

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
    this.body.setSize(32, 128, 30, 5)
  }

  update () {
    this.game.physics.arcade.collide(this, this._state.ground)
    
    if (this.leftInputIsActive()) {
      this.body.velocity.x = -this.MAX_SPEED
    } else if (this.rightInputIsActive()) {
      this.body.velocity.x = this.MAX_SPEED
    } else {
      this.body.velocity.x = 0
    }

    let onTheGround = this.body.touching.down

    if (onTheGround && this.doubleJamp) {
      this.jumps = 2
      this.jumping = false
    } else if (onTheGround && !this.doubleJamp) {
      this.jumps = 1
      this.jumping = false
    }
    // saltar
    if (this.jumps > 0 && this.upInputIsActive() && this.hiperJamp) {
      this.body.velocity.y = this.JUMP_SPEED * 1.3
      this.jumping = true
    } else if (this.jumps > 0 && this.upInputIsActive() && !this.hiperJamp) {
      this.body.velocity.y = this.JUMP_SPEED
      this.jumping = true
    }
    // Reduce the number of available jumps if the jump input is released
    if (this.jumping && this.upInputReleased()) {
      this.jumps--
      this.jumping = false
    }
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
}
