import Phaser from 'phaser'
import Geom from '../geom'

export default class extends Geom {
  constructor (game, x, y, path, opt = {}) {
    super(game, x, y, 'rectangle', path, opt)

    this.anchor.set(0)
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    this.body.allowGravity = false
  }

  update () {
  }
}
