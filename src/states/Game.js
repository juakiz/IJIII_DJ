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
    this.MAX_SPEED = 400
    this.ACCELERATION = 1000
    this.DRAG = 600
    this.GRAVITY = 2600
    this.JUMP_SPEED = -750

    this.player = new Player(this.game, 32, 960 - 32, 'mushroom')

    this.game.physics.arcade.gravity.y = this.GRAVITY
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ])
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

  update () {
    this.game.physics.arcade.collide(this.player, this.ground)

    if (this.leftInputIsActive()) {
      this.player.body.velocity.x = -this.MAX_SPEED
    } else if (this.rightInputIsActive()) {
      this.player.body.velocity.x = this.MAX_SPEED
    } else {
      this.player.body.velocity.x = 0
    }

    if (this.player.body.touching.down && this.upInputIsActive(5)) {
      // Jump when the player is touching the ground and the up arrow is pressed
      this.player.body.velocity.y = this.JUMP_SPEED
    }
  }

  leftInputIsActive () {
    let isActive = false
    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT)
    return isActive
  }

  rightInputIsActive () {
    let isActive = false
    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
    return isActive
  }

  upInputIsActive () {
    let isActive = false
    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR)
    return isActive
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.player, 32, 32)
    // }
  }
}
