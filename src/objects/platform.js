import Phaser from 'phaser'
import Geom from '../geom'

const SZ = 32;

export default class extends Geom {
  constructor(game, x, y, width, height, opt = {}) {
    super(game, x * SZ, y * SZ, 'rectangle', [0, 0, width * SZ, height * SZ], opt)

    this.anchor.set(0)
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    this.body.allowGravity = false
  }

  update () {
  }
}
