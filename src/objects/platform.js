import Phaser from 'phaser'
import Geom from '../geom'

const SZ = 32;

export default class extends Geom {
  constructor(game, x, y, width, height, opt = {}) {
    super(game, x * SZ, y * SZ, 'rectangle', [0, 0, width * SZ, height * SZ], opt)

    const test = game.add.sprite( x * SZ, y * SZ, null);
    switch (width) {
      case 1:
        if (height === 1) {
          test.loadTexture('platform_07');
          test.anchor.set(0,0)
        } else if (height < 4) {
          test.loadTexture('platform_05');
          test.anchor.set(79 / test.width, 52 / test.height);
        }
        break;
      case 2:
        if (height === 1 ) {
          test.loadTexture('platform_03a');
        } else if (height === 2) {
          test.loadTexture('platform_18');
        }
        break;
      case 3:
        if (height === 2) {
          test.loadTexture('platform_01');
          test.anchor.set(47 / test.width, 0);  
        } else {
          test.loadTexture('platform_01');
          test.anchor.set(47 / test.width, 0);
        }
        break;
      case 4:
        if (height === 1) {
          test.loadTexture('platform_20');
          test.anchor.set(0, 0)
        } else if (height === 2) {
          test.loadTexture('platform_12');
          test.anchor.set(0, 0)
        } else {
          test.loadTexture('platform_02');
          test.anchor.set(49 / test.width, 0);
        }
        break;
      case 5:
      test.loadTexture('platform_13');
      test.anchor.set(0, 0);
      break;
      case 11:
        test.loadTexture('platform_17');
        test.anchor.set(0, 0);
        break;
      case 20:
        test.loadTexture('bounds');
        test.anchor.set(0, 0);
        break;
      default:
      console.warn('BLOCK DIMENSION NOT FOUND IN ASSETS')
    }
    this.game.add.existing(test)

    this.alpha = 0.2;
    this.anchor.set(0)
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    this.body.allowGravity = false
  }

  update () {
  }
}
