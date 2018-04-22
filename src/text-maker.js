class TextMaker {
    constructor() {
      throw new Error('AbstractClassError');
    }
  
    static makeText(game, x, y, text, font, color, initSize, area, paddingPcnt, wordWrap = false) {
      const label = game.add.text(
        area.x + x,
        area.y + y,
        text);
      label.font = font;
      label.fontSize = `${initSize}pt`;
      label.fill = color;
      label.align = 'center';
  
      label.paddingPcnt = paddingPcnt;
      label.initSize = initSize;
  
      if (wordWrap) {
        label.wordWrap = true;
        label.wordWrapWidth = area.width * paddingPcnt.x;
      }
  
      TextMaker.fitText(
        label,
        area.width * paddingPcnt.x,
        area.height * paddingPcnt.y);
  
      label.anchor.setTo(0.5);
  
      label.area = area;
  
      return label;
    }
  
    static refitText(label, text, newSize = false) {
      const lbl = label;
      lbl.text = text;
      lbl.fontSize = newSize ? `${lbl.newSize}pt` : `${lbl.initSize}pt`;
      TextMaker.fitText(
        lbl,
        lbl.area.width * lbl.paddingPcnt.x,
        lbl.area.height * lbl.paddingPcnt.y);
    }

    static fitText(field, width, height) {
      // So we don't lose the original value of the font size, create a property on the field to store it.
      if (!field.defaultFontSize) {
        field.defaultFontSize = field.fontSize.replace(/\D/g,'');
      }
    
      // Set the field's font size back to it's original value before setting the new text.
      field.fontSize = field.defaultFontSize + 'pt';
    
      // If word wrap is set, then use the word wrap width as the bounds' width instead.
      if (field.wordWrap) {
        width = field.wordWrapWidth;
      }
    
      // Check if bounds were provided.
      if (width > 0 && height > 0) {
        // Use the default font size as a base for the auto sizing.
        var size = field.defaultFontSize;
    
        // While the width or height is greater then the provided bounds, subtract one from the font size.
        while ((field.width > width || field.height > height) && size > 4) {
          size = size - 1;
          field.fontSize = size + 'pt';
        }
      }
    };
  }
  
  export default TextMaker;
  