import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.anchor.setTo(0, 1)

    this.MAX_SPEED = 400
    this.ACCELERATION = 1000
    this.DRAG = 600
    this.GRAVITY = 2600
    this.JUMP_SPEED = -750

    this._state = this.game.state.getCurrentState()

    this.height = 128;
    this.width = 64;

    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10)
    this.body.drag.setTo(this.DRAG, 0)
    this.body.collideWorldBounds = true

    this.jumping = false
    this.jumps = 0
    this.doubleJamp = false
    this.hiperJamp = true

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ])
    this.body.velocity.x = -1
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
      this.body.velocity.y = this.JUMP_SPEED * 1.5
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
