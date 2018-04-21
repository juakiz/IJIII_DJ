/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../objects/player'
import Geom from '../geom'
import Platform from '../objects/platform'

const LEVEL = [
  [0, 29, 20, 1],
  [10, 26, 4, 2],
  // [],
  // [],
]

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.game.stage.backgroundColor = 0x4488cc
    this.GRAVITY = 2600

    this.player = new Player(this.game, 32, 960 - 32, 'mushroom')

    this.game.physics.arcade.gravity.y = this.GRAVITY

    this.ground = this.game.add.group()

    this.bluePrint();

    this.game.add.existing(this.player)
  }

  bluePrint() {
    const opt = { bgColor: 0x000000 };
    for (let i = 0; i < LEVEL.length; i++) {
      this.ground.add(new Platform(this.game, LEVEL[i][0], LEVEL[i][1], LEVEL[i][2], LEVEL[i][3], opt))
    }
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.player, 32, 32)
    // }
  }
}
