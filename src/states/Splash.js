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

    // Images
    this.game.load.image('menutitle', 'assets/images/main_menu_title.png')
    this.game.load.image('bounds', 'assets/images/bounds.png')
    this.game.load.image('bg', 'assets/images/bg/bg.jpg')

    // Music
    this.game.load.audio('bso', ['assets/musica/music.wav'])

    // Main Character
    this.game.load.spritesheet('char_dead', 'assets/images/personajes/maincharacter_dead.png', 103, 133, 4);
    this.game.load.spritesheet('char_idle', 'assets/images/personajes/maincharacter_idle.png', 103, 133, 4);
    this.game.load.spritesheet('char_jump', 'assets/images/personajes/maincharacter_jump.png', 103, 133, 4);
    this.game.load.spritesheet('char_run', 'assets/images/personajes/maincharacter_run.png', 103, 133, 3);
    this.game.load.spritesheet('char_talk', 'assets/images/personajes/maincharacter_talking.png', 103, 133, 4);

    // Platforms
    this.game.load.image('platform_01', 'assets/images/plataformas/platform_01.png');
    this.game.load.image('platform_02', 'assets/images/plataformas/platform_02.png');
    this.game.load.image('platform_03', 'assets/images/plataformas/platform_03.png');
    this.game.load.image('platform_03a', 'assets/images/plataformas/platform_03a.png');
    this.game.load.image('platform_05', 'assets/images/plataformas/platform_05.png');
    this.game.load.image('platform_06', 'assets/images/plataformas/platform_06.png');
    this.game.load.image('platform_07', 'assets/images/plataformas/platform_07.png');
    this.game.load.image('platform_17', 'assets/images/plataformas/platform_17.png');
    this.game.load.image('platform_20', 'assets/images/plataformas/platform_20.png');
    this.game.load.image('platform_12', 'assets/images/plataformas/platform_12.png');
    this.game.load.image('platform_19', 'assets/images/plataformas/platform_19.png');
    this.game.load.image('platform_18', 'assets/images/plataformas/platform_18.png');
    this.game.load.image('platform_13', 'assets/images/plataformas/platform_13.png');

    // ALBY
    this.game.load.image('albyTalking1', 'assets/images/personajes/alby_animation/Talking_01.png');
    this.game.load.image('albyTalking2', 'assets/images/personajes/alby_animation/Talking_02.png');
    this.game.load.image('albyWin', 'assets/images/personajes/alby_animation/Win.png');

    // SARA
    this.game.load.image('saraTalking1', 'assets/images/personajes/sara_animation/Talking_01.png');
    this.game.load.image('saraTalking2', 'assets/images/personajes/sara_animation/Talking_02.png');
    this.game.load.image('saraWin', 'assets/images/personajes/sara_animation/Win.png');

    // JUANPABLO
    this.game.load.image('JPTalking1', 'assets/images/personajes/juanpablo_animation/Talking_01.png');
    this.game.load.image('JPTalking2', 'assets/images/personajes/juanpablo_animation/Talking_02.png');
    this.game.load.image('JPWin', 'assets/images/personajes/juanpablo_animation/Win.png');
  }

  create () {
    this.state.start('Menu')
  }
}
