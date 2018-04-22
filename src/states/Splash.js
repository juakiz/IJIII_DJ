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

    // Sprite sheets
    this.game.load.spritesheet('char_dead', 'assets/images/personajes/maincharacter_dead.png', 103, 133, 4);
    this.game.load.spritesheet('char_idle', 'assets/images/personajes/maincharacter_idle.png', 103, 133, 4);
    this.game.load.spritesheet('char_jump', 'assets/images/personajes/maincharacter_jump.png', 103, 133, 4);
    this.game.load.spritesheet('char_run', 'assets/images/personajes/maincharacter_run.png', 103, 133, 3);
    this.game.load.spritesheet('char_talk', 'assets/images/personajes/maincharacter_talking.png', 103, 133, 4);

    // Sprites
    this.game.load.image('platform_01', 'assets/images/plataformas/platform_01.png');
    this.game.load.image('platform_02', 'assets/images/plataformas/platform_02.png');
    this.game.load.image('platform_03', 'assets/images/plataformas/platform_03.png');
    this.game.load.image('platform_03a', 'assets/images/plataformas/platform_03a.png');
    this.game.load.image('platform_05', 'assets/images/plataformas/platform_05.png');
  }

  create () {
    this.state.start('Menu')
  }
}
