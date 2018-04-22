import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = 0x4488cc
    let textStyle = {font: '50px Helvetica', align: 'center', fill: 'white'};
    
    let title = this.game.add.text(
      this.game.world.centerX,
      260,
      'You win!',
      textStyle);
    title.anchor.set(0.5);

    textStyle.font = '36px Helvetica'
        
    let instructions = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 60,
      'Press "R" to retry!',
      textStyle);
    instructions.anchor.set(0.5);

    this.game.time.events.loop(400, () => { instructions.alpha = instructions.alpha ? 0 : 1; }, this);
    
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
    
    let rKey = this.game.input.keyboard.addKey(Phaser.KeyCode.R);
    rKey.onDown.addOnce( () => {
      this.game.state.start('Game')
      this.game.myProps = {
        difficulty: 1
      }
    });
  }
}
