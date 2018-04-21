import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = 0x4488cc
    let textStyle = {font: '54px Helvetica', align: 'center', fill: 'white'};
    
    let title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'Dialog Jamp', textStyle);
    title.anchor.set(0.5);

    textStyle.font = '40px Helvetica'
        
    let instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Press "E" to start easy\nPress "N" to normal', textStyle);
    instructions.anchor.set(0.5);
    
    textStyle.font = '28px Helvetica'
    
    let controlMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 150, 'left arrow to move left\nright arrow to move right\nspacebar to jump.', textStyle);
    controlMessage.anchor.set(0.5);
    
    textStyle.font = '12px Helvetica'

    let muteMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 400, 'the developers of this game are not responsible for\ncholera attacks, spontaneous rage, cranial blood pressure spikes, pre or post game stress,\nor any adverse medical conditions arising from the practice of this game.', textStyle);
    muteMessage.anchor.set(0.5);
       
    let eKey = this.game.input.keyboard.addKey(Phaser.KeyCode.E);
    eKey.onDown.addOnce( () => {
      this.game.state.start('Game')
      this.game.myProps = {
        difficulty: 1
      }
    });
    
    let nKey = this.game.input.keyboard.addKey(Phaser.KeyCode.N);
    nKey.onDown.addOnce( () => {
      this.game.state.start('Game')
      this.game.myProps = {
        difficulty: 0
      }
    });
  }
}
