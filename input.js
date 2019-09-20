/*Variables specific to keyboard interaction*/
var curKey = null;
var moveSize = 0.05;

function handleInput(dt) {
  var direction = false;
  if(input.isDown('W')){
    josephIsNotAwesome();
    if(input.isDown('A')){
      direction = -Math.PI/4;
    }else if(input.isDown('D')){
      direction = Math.PI/4;
    }else{
      direction = 0;
    }
  }else
  if(input.isDown('S')){
    josephIsNotAwesome();
    if(input.isDown('A')){
      direction = Math.PI+Math.PI/4;
    }else if(input.isDown('D')){
      direction = Math.PI-Math.PI/4;
    }else{
      direction = Math.PI;
    }    
  }else
  if(input.isDown('A')){
    josephIsNotAwesome();
    if(input.isDown('W')){
      direction = -Math.PI/4;
    }else if(input.isDown('S')){
      direction = Math.PI+Math.PI/4;
    }else{
      direction = -Math.PI/2;
    }
  }
  else
  if(input.isDown('D')) {
    josephIsNotAwesome();
    if(input.isDown('W')) {
      direction = Math.PI/4;
    } else if(input.isDown('S')) {
      direction = Math.PI-Math.PI/4;
    } else {
      direction = Math.PI/2;
    }
  }
  document.getElementById('other').innerHTML = 'direction:' + direction;
  if(direction !== false) {
    player.sprite.facing = direction;
    player.moving = true;

    backgrounds[current_level].lastposx = backgrounds[current_level].pos.x;
    backgrounds[current_level].lastposy = backgrounds[current_level].pos.y;
    for(i=0;i<walls.length;i++) {
        walls[i].lastposx = walls[i].pos.x;
        walls[i].lastposy = walls[i].pos.y;}
    for(i=0;i<bones.length;i++) {
        bones[i].lastposx = bones[i].pos.x;
        bones[i].lastposy = bones[i].pos.y;}
    for(i=0;i<lettuces.length;i++) {
        lettuces[i].lastposx = lettuces[i].pos.x;
        lettuces[i].lastposy = lettuces[i].pos.y;}
    for(i=0;i<chocolates.length;i++) {
        chocolates[i].lastposx = chocolates[i].pos.x;
        chocolates[i].lastposy = chocolates[i].pos.y;}
    for(i=0;i<finwalls.length;i++) {
        finwalls[i].lastposx = finwalls[i].pos.x;
        finwalls[i].lastposy = finwalls[i].pos.y;}
    for(i=0;i<chests.length;i++) {
        chests[i].lastposx = chests[i].pos.x;
        chests[i].lastposy = chests[i].pos.y;}
                    // moving mechanics
    // player.pos.x += Math.sin(player.sprite.facing)*player.speed;
    // player.pos.y -= Math.cos(player.sprite.facing)*player.speed;
    backgrounds[current_level].pos.x -= Math.sin(player.sprite.facing)*player.speed;
    backgrounds[current_level].pos.y += Math.cos(player.sprite.facing)*player.speed;
    for (i=0;i<walls.length;i++) {
        walls[i].pos.x -= Math.sin(player.sprite.facing)*player.speed;
        walls[i].pos.y += Math.cos(player.sprite.facing)*player.speed;}
    for (i=0;i<chocolates.length;i++) {
        chocolates[i].pos.x -= Math.sin(player.sprite.facing)*player.speed;
        chocolates[i].pos.y += Math.cos(player.sprite.facing)*player.speed;}
    for (i=0;i<bones.length;i++) {
        bones[i].pos.x -= Math.sin(player.sprite.facing)*player.speed;
        bones[i].pos.y += Math.cos(player.sprite.facing)*player.speed;}
    for (i=0;i<lettuces.length;i++) {
        lettuces[i].pos.x -= Math.sin(player.sprite.facing)*player.speed;
        lettuces[i].pos.y += Math.cos(player.sprite.facing)*player.speed;}
    for (i=0;i<finwalls.length;i++) {
        finwalls[i].pos.x -= Math.sin(player.sprite.facing)*player.speed;
        finwalls[i].pos.y += Math.cos(player.sprite.facing)*player.speed;}
    for (i=0;i<chests.length;i++) {
        chests[i].pos.x -= Math.sin(player.sprite.facing)*player.speed;
        chests[i].pos.y += Math.cos(player.sprite.facing)*player.speed;}
    for(i = 0;i<lettuceshots.length;i++){
        if(player.moving){
            lettuceshots[i].pos.x -= Math.sin(player.sprite.facing)*player.speed - Math.sin(lettuceshots[i].sprite.facing)*lettuceshots[i].speed;
            lettuceshots[i].pos.y += Math.cos(player.sprite.facing)*player.speed - Math.cos(lettuceshots[i].sprite.facing)*lettuceshots[i].speed;
        } else {
            lettuceshots[i].pos.x += Math.sin(lettuceshots[i].sprite.facing)*lettuceshots[i].speed;
            lettuceshots[i].pos.y -= Math.cos(lettuceshots[i].sprite.facing)*lettuceshots[i].speed;
        }
    }

  } else {
    player.moving = false;
  }
  if(input.isDown('SHIFT')) {
    player.speed = dogspeed + 2;
  } else {
    player.speed = dogspeed;
  }
  if(input.isDown('E')) {
    if(lettuces.length != 0) {
      spawnLettuceShot();
    }
  }
}

//   Mouse Functions - Add functionality to events here
//     pos is object {x,y} in canvas-relative pixels
//     button is 0=left, 1=centre, 2=right
//     event allows you to detect many other things
//     -Eg event.ctrlKey is true if the ctrl key was pressed while mouse click happened
//     -see https://developer.mozilla.org/en-US/docs/Web/Events/click

function handleMouseMove(pos, event) {
    //document.getElementById('pos').innerHTML = 'move.pos('+pos.x+','+pos.y+') ctrl:'+event.ctrlKey;
    mouse = pos;
    // console.log(mouse);
    // document.getElementById('mouseposdisplay').innerHTML = toString(mouse);
    player.sprite.facing = Math.atan2(
        pos.x-(player.pos.x+player.sprite.size.w/2),
        (pos.y-(player.pos.y+player.sprite.size.h/2))*-1);
    document.getElementById('angle').innerHTML = 'facing' + player.sprite.facing;
}
function handleMouseScroll(pos, event) {
    if(Math.sign(event.deltaY) == -1) {
        dogspeed += 1;
    } else if(Math.sign(event.deltaY) == 1) {
        dogspeed -= 1;
    }
}
var player_radius = 42;
var posx = 0;
var posy = 0;
var facing = 0;
var facing_change = 0;

function handleMouseClick(pos, button, event) {
  if(button == 0) {
    if (dogspeed == 4.0000000001) { spawnSpitball("images/fireball.png"); } else { spawnSpitball("images/spitball.png"); }
  } else if (button == 1) {
    if(lettuces.length !== 0) {
      spawnLettuceShot();
    }
  } else if (button == 2) {
    spawnLettuce(500, 300);
  }
}
function handleMouseDblClick(pos, button, event){ 
}
function handleMouseDown(pos, button, event){
}
function handleMouseUp(pos, button, event){
}