import Phaser from 'phaser';

class GeomSpr extends Phaser.Sprite {

    constructor(game, x, y, type, path, opt = {}) {
      super(game, x, y);
  
      this.drawShape(type, path, opt);
  
      this.game.add.existing(this);
    }
  
    drawShape(type, path, opt) {
      const bgColor = (opt.bgColor === undefined || opt.bgColor === null) ? 0xFFFFFF : opt.bgColor;
  
      const graphics = this.game.add.graphics(0, 0);
      graphics.beginFill(bgColor);
  
      if (opt.outLineData) {
        graphics.lineStyle(opt.outLineData.width, opt.outLineData.color, opt.outLineData.alpha);
      }
  
      if (type === 'rectangle' || type === 'circle' || type === 'polygon') {
        GeomSpr[type](path, graphics);
      } else {
        console.warn("Phaxelf-lib: Wrong shape type, try 'rectangle', 'circle' or 'polygon'...");
      }
  
      graphics.endFill();
  
      this.loadTexture(graphics.generateTexture());
      graphics.destroy();
  
      this.anchor.x = (opt.aX === undefined || opt.aX === null) ? 0.5 : opt.aX;
      this.anchor.y = (opt.aY === undefined || opt.aY === null) ? 0.5 : opt.aY;
  
      this.alpha = (opt.alpha === undefined || opt.alpha === null) ? 1 : opt.alpha;
  
    //   if (opt.parent) {
    //     opt.parent.addChild(this);
    //   }
    }
  
    static polygon(path, graphics) {
      const poly = path instanceof Phaser.Polygon ? path : new Phaser.Polygon(path);
      graphics.drawPolygon(poly.points);
    }
  
    static rectangle(path, graphics) {
      if (path instanceof Array) {
        graphics.drawRect(path[0], path[1], path[2], path[3]);
      } else if (path instanceof Phaser.Rectangle) {
        graphics.drawRect(path.x, path.y, path.width, path.height);
      } else {
        console.warn('Phaxelf: Trying to build a rectangle with a wrong path format.');
      }
    }
  
    static circle(path, graphics) {
      if (path instanceof Array) {
        graphics.drawCircle(path[0], path[1], path[2]);
      } else if (path instanceof Phaser.Circle) {
        // console.log(path.x, path.y, path.diameter);
        graphics.drawCircle(path.x, path.y, path.diameter);
      } else {
        console.warn('Phaxelf: Trying to build a circle with a wrong path format.');
      }
    }
  }
  
  export default GeomSpr;