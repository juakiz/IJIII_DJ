import Phaser from 'phaser'
// import Geom from '../geom'

export default class extends Phaser.Sprite {
  constructor(game, x, y, name, mirrored) {
    super(game, x * 32, y * 32, `${name}Talking1`)

    this.ponente = name;
console.log(game, x, y, name);
    this.playIdle();

    // let fraNames = Phaser.Animation.generateFrameNames(`${this.ponente}Talking1`, 1, 2, '', 1);
    // this.animTalk = this.animations.add('talk', fraNames, 2, true);
    // this.animTalk.play();

    this.anchor.setTo(0.5, 1)
    if (mirrored) this.scale.x *= -1;

    this._state = this.game.state.getCurrentState()

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.ENTER
    ])

  }

//   update () {
//     this.FSM()
//   }

  FSM() {
    if (this.animState === 'playDead') {
      return;
    }

    if (!this.onTheGround) {
      if (this.animations.currentAnim.name !== 'jump') {
        this.playJump()
      }
      return;
    }

    switch (this.animState) {
      case 'running':
        if(this.animations.currentAnim.name !== 'run') {
          this.playRun()
        }
        break;
      // case 'jumping':
      //   if(this.animations.currentAnim.name !== 'jump') {
      //     this.playJump()
      //   }
      //   break;
      case 'talking':
        if(this.animations.currentAnim.name !== 'talk') {
          this.playTalk()
        }
        break;
      default:
        if(this.animations.currentAnim.name !== 'idle') {
          this.playIdle()
        }
    }
  }

  // Anims
  playIdle() {
    this.loadTexture(`${this.ponente}Talking1`);
  }

  playWin() {
    this.loadTexture(`${this.ponente}Win`);
    this.animations.add('run');
    this.animations.play('run', 12, true);
  }

  playTalk() {
    this.loadTexture(`${this.ponente}Talking1`);
    this.animations.add('talk');
    this.animations.play('talk', 12, true);
  }
}
