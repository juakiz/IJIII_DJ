import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.anchor.setTo(0, 1)

    const _state = this.game.state.getCurrentState()
    this.height = 128;
    this.width = 64;
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.maxVelocity.setTo(_state.MAX_SPEED, _state.MAX_SPEED * 10)
    this.body.drag.setTo(_state.DRAG, 0)
    this.body.collideWorldBounds = true
  }

  update () {
  }
}
