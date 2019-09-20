/* Version 2.0 - 2-Feb-2019
 * This file is adapted from
 * http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 * Please do not re-distribute without permission
 *
 * ARP 28/07/2014
 *
 */

var context = null;

(function() {
  function Sprite(url, pos, size, speed, frames, dir, once, facing, scale, opacity) {
    this.pos = {x:pos[0], y:pos[1]}; //{x,y} of sprite in file
    this.size = {w:size[0], h:size[1]}; //{w,h} of sprite
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;

    //Change the direction of sprite
    this.facing = facing || 0; //0 = same as ORIGINAL image in radians
    //Change the size of the sprite
    if(scale){
      this.scale = {x:scale[0], y:scale[1]}; //factor Eg 2=twice as big, 0.5=half size
    }else{
      this.scale = {x:1,y:1};
    }

    this.centre_offset = {x:0, y:0};

    //added optional functionality to fade out sprites - set to done once faded, so can be removed
    this.opacity = opacity || 1;
    this.fade = false;
  }

  Sprite.prototype = {
    update: function(dt) {
      this._index += this.speed * dt;
    },

    render: function(ctx, bgScroll) {
      if (this.done) return;

      var frame;
      if (this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if (this.once && idx >= max) {
          this.done = true;
          return;
        }
      } else {
        frame = 0;
      }

      var x = this.pos.x;
      var y = this.pos.y;

      if (this.dir === 'vertical') {
        y += frame * this.size.h;
      } else {
        x += frame * this.size.w;
      }

      if (this.fade) {
        if (this.opacity <= 0) {
          this.done = true;
          return;
        } else {
          this.opacity -= 0.01;
          if (this.opacity < 0) this.opacity = 0;
          gameCanvas.context.globalAlpha = this.opacity;
        }
      }

      //Rotate sprite based on this.facing
      //additional translation if centre of image not centre of sprite
      gameCanvas.context.translate(
        (this.size.w * this.scale.x) / 2 - (this.centre_offset.x * this.scale.x), 
        (this.size.h * this.scale.y) / 2 + (this.centre_offset.y * this.scale.y));
      
      gameCanvas.context.rotate(this.facing);

      gameCanvas.context.translate(
        +(this.centre_offset.x * this.scale.x), 
        -(this.centre_offset.y * this.scale.y));

      ctx.drawImage(resources.get(this.url),
        x, y,
        this.size.w, this.size.h,
        -this.size.w * this.scale.x / 2, -this.size.h * this.scale.y / 2, //move half way back and up
        this.size.w * this.scale.x, this.size.h * this.scale.y); //shrink.enlarged size

      //Is this sprite a scrolling background
      if (typeof bgScroll !== 'undefined') {
        var xPos = this.size.w * this.scale.x / 2;
        var yPos = this.size.h * this.scale.y / 2;

        //one pixel overlap
        if (bgScroll === 'R2L') {
          xPos = this.size.h * this.scale.x / 2 - 1;
          yPos *= -1;
        } else if (bgScroll === 'L2R') {
          xPos = -this.size.h * this.scale.x * 1.5 + 1;
          yPos *= -1;
        } else if (bgScroll === 'DOWN') {
          yPos = -this.size.h * this.scale.y * 1.5 - 1;
          xPos *= -1;
        } else if (bgScroll === 'UP') {
          yPos = this.size.h * this.scale.y / 2 + 1;
          xPos *= -1;
        }

        ctx.drawImage(resources.get(this.url),
          x, y,
          this.size.w, this.size.h,
          xPos, yPos,
          this.size.w * this.scale.x, this.size.h * this.scale.y);
      }
    }
  };

  window.Sprite = Sprite;
})();

function renderEntities(list) {
  for (var i = 0; i < list.length; i++) {
    renderEntity(list[i]);
    if (list[i].done) {
      list.splice(i, 1);
      i--;
      if (i < 0) break; //did I just delete the last one?
    }
  }
}

function renderEntity(entity, bgScroll) {
  gameCanvas.context.save();
  gameCanvas.context.translate(entity.pos.x, entity.pos.y);
  entity.sprite.render(gameCanvas.context, bgScroll);
  gameCanvas.context.restore();
}