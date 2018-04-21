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
      asset: 'mushroom'
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
      Phaser.Keyboard.SPACEBAR
    ])
    this.ground = this.game.add.group()
    for (let x = 0; x < this.game.width; x += 32) {
      // Add the ground blocks, enable physics on each, make them immovable
      const groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground')
      this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE)
      groundBlock.body.immovable = true
      groundBlock.body.allowGravity = false
      this.ground.add(groundBlock)
    }
    this.game.add.existing(this.player)
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
    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP)
    return isActive
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
