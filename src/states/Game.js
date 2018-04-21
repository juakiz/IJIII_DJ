/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../objects/player'
import Geom from '../geom'
import Platform from '../objects/platform'

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
    const SZ = 32
    // console.log(this.game)

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

    let path = new Phaser.Rectangle(0, 0, 640, SZ);
    const opt = { bgColor: 0x000000 };
    const groundBlock = new Platform(this.game, 0, 960 - SZ, path, opt)
    this.ground.add(groundBlock);

    path = new Phaser.Rectangle(0, 0, 128, SZ * 2);
    const platform1 = new Platform(this.game, (640 / 2), 960 - (SZ * 4), path, opt)
    this.ground.add(platform1);

    path = new Phaser.Rectangle(0, 0, 64, SZ);
    const platform2 = new Platform(this.game, SZ * 2, 960 - (SZ * 6), path, opt)
    this.ground.add(platform2);

    path = new Phaser.Rectangle(0, 0, 64, SZ);
    const platform3 = new Platform(this.game, SZ * 12, 960 - (SZ * 6), path, opt)
    this.ground.add(platform3);

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
    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR)
    return isActive
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.player, 32, 32)
    // }
  }
}
