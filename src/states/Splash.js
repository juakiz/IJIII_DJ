import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('PLAYER', 'assets/images/personajes/PLAYER.png')
    game.load.spritesheet('char_idle', 'assets/images/personajes/maincharacter_idle.png', 103, 133, 4);
  }

  create () {
    this.state.start('Game')
  }
}
