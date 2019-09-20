/* Version 2.0 - 2-Feb-2019
 * Generic Library of js Tools
 * Specifically for use with canvas games
 * Code is attributed where appropriate
 *
 * ARP 28/07/2014
 */

function myCanvas(canvas_id) {

  /*
   * Usage in game.js : var canvas = new myCanvas('id_of_canvas');
   */
  me = this;
  me.canvas = document.getElementById(canvas_id);
  me.x = me.canvas.offsetLeft;
  me.y = me.canvas.offsetTop;
  me.width = me.canvas.width;
  me.height = me.canvas.height;
  me.context = me.canvas.getContext('2d');

  me.mouse = {
    x: 0,
    y: 0
  };

  me.canvas.addEventListener('mousemove', function(event) {
    var x = new Number();
    var y = new Number();
    if (event.x !== undefined && event.y !== undefined) {
      me.mouse.x = event.x;
      me.mouse.y = event.y;
    } else { // Firefox method to get the position
      me.mouse.x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
      me.mouse.y = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    me.mouse.x -= me.canvas.offsetLeft;
    me.mouse.y -= me.canvas.offsetTop;

    handleMouseMove(me.mouse, event);
    return false;
  });

  me.canvas.addEventListener('click', function(event) {
    /*
     * http://www.ibm.com/developerworks/web/library/wa-games/index.html?ca=drs-
     * Stop default browser actions and event bubbling [includes the return false;]
     */
    event.preventDefault();

    me.mouse.x = event.pageX - me.canvas.offsetLeft;
    me.mouse.y = event.pageY - me.canvas.offsetTop;

    handleMouseClick(me.mouse, event.button, event);
    return false;
  });

  me.canvas.addEventListener('dblclick', function(event) {
    /*
     * http://www.ibm.com/developerworks/web/library/wa-games/index.html?ca=drs-
     * Stop default browser actions and event bubbling [includes the return false;]
     */
    event.preventDefault();

    me.mouse.x = event.pageX - me.canvas.offsetLeft;
    me.mouse.y = event.pageY - me.canvas.offsetTop;

    handleMouseDblClick(me.mouse, event.button, event);
    return false;
  });

  me.canvas.addEventListener('mousedown', function(event) {
    event.preventDefault();

    me.mouse.x = event.pageX - me.canvas.offsetLeft;
    me.mouse.y = event.pageY - me.canvas.offsetTop;

    handleMouseDown(me.mouse, event.button, event);
    return false;
  });

  me.canvas.addEventListener('mouseup', function(event) {
    event.preventDefault();

    me.mouse.x = event.pageX - me.canvas.offsetLeft;
    me.mouse.y = event.pageY - me.canvas.offsetTop;

    handleMouseUp(me.mouse, event.button, event);
    return false;
  });

  me.canvas.addEventListener('contextmenu', function(event) {
    /*
     * http://www.ibm.com/developerworks/web/library/wa-games/index.html?ca=drs-
     * Stop default browser actions and event bubbling [includes the return false;]
     */
    event.preventDefault();

    me.mouse.x = event.pageX - me.canvas.offsetLeft;
    me.mouse.y = event.pageY - me.canvas.offsetTop;

    handleMouseClick(me.mouse, 2, event);

    return false;
  });

  me.canvas.addEventListener('wheel', function(event) {
    /*
     * http://www.ibm.com/developerworks/web/library/wa-games/index.html?ca=drs-
     * Stop default browser actions and event bubbling [includes the return false;]
     */
    event.preventDefault();

    me.mouse.x = event.pageX - me.canvas.offsetLeft;
    me.mouse.y = event.pageY - me.canvas.offsetTop;

    //This is a function prototype - redefined in game.js for functionality
    handleMouseScroll(me.mouse, event, event);

    return false;
  });
}
//redefine in main game.js for functionality
function handleMouseClick(pos, button, event) {}
function handleMouseDblClick(pos, button, event) {}
function handleMouseDown(pos, button, event) {}
function handleMouseUp(pos, button, event) {}
function handleMouseMove(pos, event) {}
function handleMouseScroll(pos, event) {}

myCanvas.prototype.clear = function() {
  // The following is the proven fastest way to clear the canvas
  /*
   * http://jsperf.com/getimagedata-putimagedata-small-large/4
   *
   */

  me.context.globalCompositeOperation = 'source-over';
  me.context.fillStyle = 'rgba(0,0,0,1)';
  me.context.fillRect(0, 0, 1, 1);
  me.context.clearRect(0, 0, me.width, me.height);
};

/*
 * http://www.ibm.com/developerworks/web/library/wa-games/index.html?ca=drs-
 * Prevent dragging, selecting and "touching" canvas
 */
myCanvas.prototype.ondragstart = function(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  if (e && e.stopPropagation) {
    e.stopPropagation();
  }
  return false;
};

myCanvas.prototype.onselectstart = function(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  if (e && e.stopPropagation) {
    e.stopPropagation();
  }
  return false;
};

//prevent mobile defaults as well
document.body.ontouchstart = function(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  if (e && e.stopPropagation) {
    e.stopPropagation();
  }
  return false;
};
document.body.ontouchmove = function(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  if (e && e.stopPropagation) {
    e.stopPropagation();
  }
  return false;
};

function scrollBg(bgObj, dir, dt) {
  if (dir === "R2L") {
    bgObj.pos.x -= (bgObj.speed * dt);
    if (bgObj.pos.x < -bgObj.sprite.size.h * bgObj.sprite.scale.x) {
      bgObj.pos.x = 0;
    }
  } else if (dir === "L2R") {
    bgObj.pos.x += (bgObj.speed * dt);
    if (bgObj.pos.x > bgObj.sprite.size.h * bgObj.sprite.scale.x) {
      bgObj.pos.x = 0;
    }
  } else if (dir === "DOWN") {
    bgObj.pos.y += (bgObj.speed * dt);
    if (bgObj.pos.y > bgObj.sprite.size.v * bgObj.sprite.scale.y) {
      bgObj.pos.y = 0;
    }
  } else if (dir === "UP") {
    bgObj.pos.y -= (bgObj.speed * dt); //scroll up
    if (bgObj.pos.y < -bgObj.sprite.size.v * bgObj.sprite.scale.y) {
      bgObj.pos.y = 0;
    }
  }
}


/*Generic/Global Functions*/
//Audio using HTML5 Audio Tag
/*
 * Need to ensure that there is an <audio id='XXX'><source src='url_of_file'></audio> in the HTML page somewhere
 * Suggest is is within the game div, but really doesn't matter
 */
function playSound(id) {

  element = document.getElementById(id);
  if (element) {
    element.load();
    element.play();
  } else {
    alert("No audio element: '" + id + "'.");
  }
}

function stopSound(id) {
  element = document.getElementById(id);
  if (element) {
    element.pause();
  } else {
    alert("No audio element: '" + id + "'.");
  }
}

function deg2rad(degrees) {
  return degrees / 180 * Math.PI;
}

function rad2deg(radians) {
  return radians / Math.PI * 180;
}

// Collisions
function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
  return collides(
    pos.x, pos.y,
    pos.x + size.w, pos.y + size.h,
    pos2.x, pos2.y,
    pos2.x + size2.w, pos2.y + size2.h);
}

function objectCollides(obj1, obj2) {
  return boxCollides(
    obj1.pos,
    {w: obj1.sprite.size.w * obj1.sprite.scale.x, h: obj1.sprite.size.h * obj1.sprite.scale.y},
    obj2.pos,
    {w: obj2.sprite.size.w * obj2.sprite.scale.x, h: obj2.sprite.size.h * obj2.sprite.scale.y});
}
function getScaledSize(object){
  return {
    w: object.sprite.size.w * object.sprite.scale.x,
    h: object.sprite.size.h * object.sprite.scale.y
  };
}
function rotatePointAroundPoint(point, pivot, angle){
  var rot_point = {
    x: Math.cos(angle)*(point.x - pivot.x) - Math.sin(angle)*(point.y - pivot.y) + pivot.x,
    y: Math.sin(angle)*(point.x - pivot.x) + Math.cos(angle)*(point.y - pivot.y) + pivot.y
  };

  return rot_point;
}