/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../objects/player'
import Geom from '../geom'
import Platform from '../objects/platform'

const LEVELS = {
  bounds: [
    [0, 29, 20, 1],
    [0, 0, 20, 1],
    [0, 1, 1, 28],
    [19, 1, 1, 28],
  ],
  level1: [
    [0, 29, 20, 1],
    [0, 0, 20, 1],
    [0, 1, 1, 28],
    [19, 1, 1, 28],
    [10, 26, 6, 2],
    [14, 24, 5, 2],
    [4, 21, 4, 2],
    [1, 18, 4, 2],
    [2, 15, 2, 2],
    [12, 15, 4, 1],
    [15, 12, 4, 1],
  ],
  level2: [
    [6, 26, 5, 2],
    [13, 24, 5, 2],
    [6, 20, 3, 2],

  ],
  level3: [
    [16, 25, 3, 1],
    [9, 21, 2, 1],
    [16, 19, 1, 1],
    [17, 15, 2, 1],
    [16, 9, 1, 1],
    [10, 11, 2, 1],
    [0, 6, 12, 1]
  ]
}

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.game.stage.backgroundColor = 0x4488cc
    this.GRAVITY = 2600

    this.player = new Player(this.game, 64, 960 - 32)

    this.game.physics.arcade.gravity.y = this.GRAVITY

    this.ground = this.game.add.group()

    this.bluePrint('level1');

    this.game.add.existing(this.player)
  }

  bluePrint(level) {
    const LEVEL = LEVELS[level];
    const opt = { bgColor: 0x000000 };
    for (let i = 0; i < LEVEL.length; i++) {
      this.ground.add(new Platform(this.game, LEVEL[i][0], LEVEL[i][1], LEVEL[i][2], LEVEL[i][3], opt))
    }
    const BOUNDS = LEVELS['bounds'];
    for (let i = 0; i < BOUNDS.length; i++) {
      this.ground.add(new Platform(this.game, BOUNDS[i][0], BOUNDS[i][1], BOUNDS[i][2], BOUNDS[i][3], opt))
    }
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.player, 32, 32)
    // }
  }
}
