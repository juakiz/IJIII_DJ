import Phaser from 'phaser'
import Questionary from '../model/questionary'
import TM from '../text-maker';
import Geom from '../geom'

export default class extends Phaser.Sprite {
  constructor(game, x, y, name, mirrored) {
    super(game, x * 32, y * 32, `${name}Talking1`)

    this.ponente = name;
    this.mirrored = mirrored;
    this.DATA = Questionary.getDATA(name);

    this.anchor.setTo(0.5, 1)
    if (mirrored) {
    this.playIdle();
        this.scale.x *= -1;
    }

    this.playIdle();

    this.game.myEvents.onLastPlat.addOnce(this.showDialogue, this);

    this.initDialogue();
    // this.showDialogue(2);
    // this.writeQuestion();

    this._state = this.game.state.getCurrentState()


  }

//   checkAnswer() {
// console.log(arguments)
//   }

    restartState() {
        // this.game.time.events.add(500, () => {
            if (this.game.myPro.currLvl == 'level1') {
                this.game.myPro.currLvl = 'level2'
                this.game.state.restart();
            } else if (this.game.myPro.currLvl == 'level2') {
                this.game.myPro.currLvl = 'level3'
                this.game.state.restart();
            } else if (this.game.myPro.currLvl == 'level3') {
                this.game.state.start('Win')
            }
        // }, this);
    }

  initDialogue() {
    this.sprDialog = this.game.add.sprite(0, 0, 'dialogF');
    this.sprDialog.anchor.set(1, 0);
    this.sprDialog.position.set(0, 580);
    this.game.add.existing(this.sprDialog);
  }

  showDialogue(question) {
    this.writeQuestion(2);
    this.music = this.game.add.audio('dial');
    this.music.play();
    this.playTalk();
    this.game.add.tween(this.sprDialog).to({ x: `+${this.sprDialog.width}`}, 400, 'Quad', true)
    this.game.input.onDown.addOnce(this.restartState, this);
    // this.game.myEvents.onLastPlat.addOnce(this.restartState, this);

    this.key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(this.restartState, this);
    this.key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(this.restartState, this);
    this.key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE).onDown.add(this.restartState, this);
    this.key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR).onDown.add(this.restartState, this);

    // key1.onDown.add(checkAnswer, this);
    // key2.onDown.add(checkAnswer, this);
    // key3.onDown.add(checkAnswer, this);
    // key4.onDown.add(checkAnswer, this);
    
    console.log(this.DATA);
  }

  hideDialogue(question) {

    this.game.add.tween(this.sprDialog).to({ x: `-${this.sprDialog.width}`}, 400, 'Quad', true)
        .onComplete.add(() => {}, this)
      
    console.log(this.DATA);
  }

  writeQuestion(number) {
    // Question
    console.log(this.DATA[number].q);
    let path = new Phaser.Rectangle(0, 0, 562, 129);
    const lblQ = TM.makeText(this.game, -26, 16, this.DATA[number].q, 'Helvetica', '#000000', 26, path, { x: 1, y: 1 }, true);
    // lblQ.align = 'left';
    lblQ.anchor.set(1, 0);

    // options
    console.log(this.DATA[number].o);

    this.options = [];
    path = new Phaser.Rectangle(0, 0, 512, 32);
    let cont = this.DATA[number].o.length;
    for (let i = 0; i < this.DATA[number].o.length; i++) {
        const lvlOption = TM.makeText(this.game, -this.sprDialog.width + 100, this.sprDialog.height - (30 * (i + 1)) - 36, (cont)+'. '+this.DATA[number].o[i], 'Arial', '#000000', 26, path, { x: 1, y: 1 }, true);
        lvlOption.anchor.set(0);
        this.sprDialog.addChild(lvlOption);
        this.options.push(lvlOption);
        cont--;
    }
    this.correct = this.DATA[number].c;
    
    this.sprDialog.addChild(lblQ);
  }

  // Anims
  playIdle() {
    this.loadTexture(`${this.ponente}Talking1`);
    let sign = this.mirrored ? '-' : '+';
    this.game.add.tween(this.scale).to({ x: sign + '0.05', y: '-0.05'}, 500, 'Sine', true, 0, -1, true)
  }

  playWin() {
    this.game.time.events.remove(this.loopTalk);
    this.loadTexture(`${this.ponente}Win`);
    this.game.add.tween(this).to({ y: '-10'}, 100, null, true);
  }

  playTalk() {
    let fraNames = Phaser.Animation.generateFrameNames(`${this.ponente}Talking`, 1, 2, '', 1);
    this.loopTalk = this.game.time.events.loop(300, () => {
        this.talkIndex = this.talkIndex ? 0 : 1;
        this.loadTexture(`${this.ponente}Talking${this.talkIndex}`);
    }, this)
  }
}
