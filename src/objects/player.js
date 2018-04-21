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

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ])
    this.body.velocity.x = -1;
  }

  create() {
    
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

    if (this.body.touching.down && this.upInputIsActive(5)) {
      // Jump when the player is touching the ground and the up arrow is pressed
      this.body.velocity.y = this.JUMP_SPEED
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
}
