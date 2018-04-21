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
    this.game.load.spritesheet('char_dead', 'assets/images/personajes/maincharacter_dead.png', 103, 133, 4);
    this.game.load.spritesheet('char_idle', 'assets/images/personajes/maincharacter_idle.png', 103, 133, 4);
    this.game.load.spritesheet('char_jump', 'assets/images/personajes/maincharacter_jump.png', 103, 133, 4);
    this.game.load.spritesheet('char_run', 'assets/images/personajes/maincharacter_run.png', 103, 133, 3);
    this.game.load.spritesheet('char_talk', 'assets/images/personajes/maincharacter_talking.png', 103, 133, 4);
  }

  create () {
    this.state.start('Game')
  }
}
