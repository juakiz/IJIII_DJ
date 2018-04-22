/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../objects/player'
import Mentor from '../objects/mentor'
import Geom from '../geom'
import Platform from '../objects/platform'
import { Sprite } from 'phaser-ce';

const LEVELS = {
  bounds: [
    [0, 29, 20, 1],
    [0, 0, 20, 1],
    [0, 1, 1, 28],
    [19, 1, 1, 28],
  ],
  level1: {
    platforms: [
      [10, 26, 5, 2],
      [14, 24, 5, 2],
      [4, 21, 4, 2],
      [1, 18, 4, 2],
      [2, 15, 2, 2],
      [15, 12, 4, 1],
      [12, 15, 4, 1],
    ],
    mentor: { name: 'sara', x: 18, y: 12, mirrored: true },
  },
  level2: {
    platforms: [
      [6, 26, 5, 2],
      [13, 24, 5, 2],
      [8, 20, 1, 1],
      [1, 16, 3, 2],
      [8, 12, 4, 4],
      [16, 8, 4, 1],
    ],
    mentor: { name: 'alby',  x: 18, y: 8, mirrored: true },
  },
  level3: {
    platforms: [
      [16, 25, 3, 1],
      [9, 21, 2, 1],
      [16, 19, 1, 1],
      [17, 15, 2, 1],
      [16, 9, 1, 1],
      [10, 11, 2, 1],
      [1, 6, 11, 1],
    ],
    mentor: { name: 'JP', x: 2, y: 6, mirrored: false },
  },
}

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.music = this.game.add.audio('bso');
    this.music.loop = true;
    this.music.play();
    this.game.stage.backgroundColor = 0x4488cc
    this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'bg').anchor.set(0.5)
    this.GRAVITY = 2600

    this.player = new Player(this.game, 64, 960 - 32)

    this.game.physics.arcade.gravity.y = this.GRAVITY

    this.ground = this.game.add.group()

    this.bluePrint('level2');

    this.game.add.existing(this.player)

    this.debug = true
  }

  bluePrint(level) {
    const LEVEL = LEVELS[level].platforms;
    const opt = { bgColor: 0x000000 };
    for (let i = 0; i < LEVEL.length; i++) {
      this.ground.add(new Platform(this.game, LEVEL[i][0], LEVEL[i][1], LEVEL[i][2], LEVEL[i][3], opt))
    }

    const BOUNDS = LEVELS['bounds'];
    for (let i = 0; i < BOUNDS.length; i++) {
      this.ground.add(new Platform(this.game, BOUNDS[i][0], BOUNDS[i][1], BOUNDS[i][2], BOUNDS[i][3], opt))
    }

    const MENTOR = LEVELS[level].mentor;
    this.mentor = new Mentor(this.game, MENTOR.x, MENTOR.y, MENTOR.name, MENTOR.mirrored, );
    this.game.add.existing(this.mentor)
  }

  // render () {
  //   if (__DEV__ && this.debug) {
  //     game.debug.bodyInfo(this.player, 32, 32);
  //     game.debug.body(this.player);
  //     for (let i = this.ground.children.length - 1; i >= 0; i--) {
  //       this.game.debug.body(this.ground.children[i]);
  //     }
  //   }
  // }
}
