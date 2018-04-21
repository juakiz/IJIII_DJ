/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.game.stage.backgroundColor = 0x4488cc
    this.MAX_SPEED = 500
    this.ACCELERATION = 1500
    this.DRAG = 600
    this.GRAVITY = 2600
    this.JUMP_SPEED = -1000
    this.player = new Player({
      game: this.game,
      x: this.world.bottomX,
      y: this.world.bottomY,
      asset: 'mushroom',
    })
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE)
    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10)
    this.player.body.drag.setTo(this.DRAG, 0)
    this.game.physics.arcade.gravity.y = this.GRAVITY
    this.player.body.collideWorldBounds = true
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR,
    ])
    this.game.add.existing(this.mushroom)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
