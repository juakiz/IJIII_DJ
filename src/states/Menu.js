import Phaser from 'phaser'
import Platform from '../objects/platform'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  create() {
    this.music = this.game.add.audio('bso');
    this.music.loop = true;
    this.music.play();
    this.game.stage.backgroundColor = 0x4488cc
    this.ground = this.game.add.group()
    this.ground.add(new Platform(this.game, 0, 0, 20, 1))

    let textStyle = {font: '50px Helvetica', align: 'center', fill: 'white'};
    
    let menuTitle = this.game.add.sprite(320, 400, 'menutitle');
    menuTitle.anchor.set(0.5);
    /*
    let title = this.game.add.text(
      this.game.world.centerX,
      260,
      'Final Turbo Dialog Jamp',
      textStyle);
    title.anchor.set(0.5);
    */

    textStyle.font = '36px Helvetica'
        
    let instructions = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 60,
      'Press SPACEBAR to start!',
      textStyle);
    instructions.anchor.set(0.5);

    this.game.time.events.loop(400, () => { instructions.alpha = instructions.alpha ? 0 : 1; }, this);
    
    textStyle.font = '24px Helvetica'
    
    let controlMessage = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 228,
      'left arrow to move left\nright arrow to move right\nspacebar to jump.',
      textStyle);
    controlMessage.anchor.set(0.5);
    controlMessage.align = 'left';

    controlMessage.addColor('#ffff00', 0);
    controlMessage.addColor('#ffffff', 4);

    controlMessage.addColor('#ffff00', 23);
    controlMessage.addColor('#ffffff', 28);

    controlMessage.addColor('#ffff00', 48);
    controlMessage.addColor('#ffffff', 56);
    
    textStyle.font = '12px Helvetica'

    // let muteMessage = this.game.add.text(
    //   this.game.world.centerX,
    //   this.game.world.centerY + 400,
    //   'the developers of this game are not responsible for\ncholera attacks, spontaneous rage,' +
    //   ' cranial blood pressure spikes, pre or post game stress,\nor any adverse medical conditions arising from the practice of this game.',
    //   textStyle);
    // muteMessage.anchor.set(0.5);

    // muteMessage.fill = '#CCCCCC';

    let muteMessage = this.game.add.text(
      this.game.world.centerX,
      960,
      'the developers of this game are not responsible for' + 
      'cholera attacks, spontaneous rage, cranial blood pressure spikes, pre or post game stress,' + 
      'or any adverse medical conditions arising from the practice of this game.',
      textStyle);
    muteMessage.anchor.set(0.5, 1);

    muteMessage.align = 'center';
    muteMessage.wordWrap = true;
    muteMessage.wordWrapWidth = 640;
    muteMessage.lineSpacing = -8;

    muteMessage.fill = '#CCCCCC';
       
    let enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    enterKey.onDown.addOnce( () => {
      this.music.restart()
      this.game.state.start('Game')
      this.game.myProps = {
        difficulty: 0
      }
    });
    this.game.myPro = { currLvl: 'level1'};
  }
}
