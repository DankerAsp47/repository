  //Create custom functions here to simplify game logic in the loop
function loseLife() {
  lives--;
  if (lives == 0) {
    nextLevel();
  } /*else {
    playerReset();
  }*/
}

function hideButton() {
  document.getElementById('gamestartbutton').style.display = 'none';
  document.getElementById('musicbutton').style.display = 'none';
}

function spawnLettuce() { //spawns lettuce at a random location on the field
  lettuces.push({
    pos: {
      x: (Math.floor(Math.random() * 1024)),
      y: (Math.floor(Math.random() * 768))
    },
    sprite: new Sprite("images/lettuce.png", [0, 0], [32, 32], 15, [0, 1, 2, 3], 'vertical')
  });
}
function spawnSpitball(imag) {
  posx = player.pos.x;
  posy = player.pos.y;
  facing = player.sprite.facing;
  spitballs.push({
    pos: { x: posx + Math.sin(facing+facing_change)*(player_radius)+player.sprite.size.w/2,
      y: posy - Math.cos(facing+facing_change)*(player_radius)+player.sprite.size.h/2 },
    speed: 8, angle: facing, sprite: new Sprite(imag, [0, 0], [20, 20]) });
  spitballs[spitballs.length-1].sprite.facing = player.sprite.facing;
}
function spawnLettuceShot() {
  var randlettuce = Math.floor(Math.random() * lettuces.length);
  var letx = lettuces[randlettuce].pos.x;
  var lety = lettuces[randlettuce].pos.y;
  lettuceshots.push({ pos: {x: letx, y: lety}, speed: 2, angle: (Math.random()*Math.PI), sprite: new Sprite("images/lettuceshot.png", [0, 0], [32, 32]) });
  lettuceshots[lettuceshots.length-1].sprite.facing = (Math.random()*Math.PI)*randneg();
}
function randneg () { //just a function that has a 50% chance to turn a number negative or not
  if (Math.random() > 0.5) { return -1; } else { return 1; }
}
function spawnJames() {
  var jame = {
    speed: 3, pos: centerspawn,
    sprite: new Sprite("images/james.png", [0, 0], [64, 64], 15, [0, 1, 2, 3, 4, 5], 'vertical'),
  }
}
function spawnBone(lettx, letty) { //the coordinates of the lettuce just shot are inputted in, and a bone is spawned there
  bones.push({ pos: {x: lettx, y: letty}, speed: 1, angle: 0, sprite: new Sprite("images/bone.png", [0, 0], [40, 20]) });
}
function clearsprites() { //function which deletes all non-player sprites
  for(i=0;i<spitballs.length;i++) { spitballs.splice(i); } for(i=0;i<lettuces.length;i++) { lettuces.splice(i); }
  for(i=0;i<lettuceshots.length;i++) { lettuceshots.splice(i); } for(i=0;i<bones.length;i++) { bones.splice(i); }
  for(i=0;i<chocolates.length;i++) { chocolates.splice(i); }
}
function changedog(dog) { //inputs a dog, and then changes player sprite into that dog
  if (dog == 'pug') {
    player.sprite = new Sprite('images/puganim.png', [20, 0], [42, 84], 15,  [0, 1, 2, 3, 4, 5], 'vertical', false, 0, [1,1], 1); dogspeed = 4;
  } else if (dog == 'boxer') {
    player.sprite = new Sprite('images/boxeranim4.png', [20, 0], [42, 84], 15,  [0, 1, 2, 3, 4, 5, 6, 7], 'vertical', false, 0, [1,1], 1); dogspeed = 2;
  } else if (dog == 'husky') {
    player.sprite = new Sprite('images/huskyanim3.png', [20, 0], [42, 84], 15,  [0, 1, 2, 3, 4, 5, 6, 7], 'vertical', false, 0, [1,1], 1); dogspeed = 3;
  }
}
function selectdog() {
  player.sprite 
  for (i=0;i<4;i++) { var y = document.getElementsByClassName('dogbuttons'); y[i].style.display = 'inline'; }
  document.getElementById('dogselectbtn').style.display = 'inline';
}
function nextLevel() {
  clearsprites();
  level += 1;
  selectdog();
}
function hidedogbtns() {
  for (i=0;i<4;i++) { var x = document.getElementsByClassName('dogbuttons'); x[i].style.display = 'none'; }
}
function hidecontbtn() {
  document.getElementById('dogselectbtn').style.display = 'none';
  for (i=0;i<3;i++) { var x = document.getElementsByClassName('heartimg'); x[i].style.display = 'none';}
  for (i=0;i<3;i++) { var x = document.getElementsByClassName('speedimg'); x[i].style.display = 'none';}
  clearsprites();
}
function dogimage(dog) {
  if (dog == 'pug') {
    document.getElementById('pug').style.backgroundImage = "url(images/pug.png)";
    document.getElementById('husky').style.backgroundImage = "url(images/blackhusky.png)"; 
    document.getElementById('boxer').style.backgroundImage = "url(images/blackboxer.png)"; 
  }
  else if (dog == 'husky') {
    document.getElementById('pug').style.backgroundImage = "url(images/blackpug.png)"; 
    document.getElementById('husky').style.backgroundImage = "url(images/husky.png)";
    document.getElementById('boxer').style.backgroundImage = "url(images/blackboxer.png)"; 
  }
  else if (dog == 'boxer') {
    document.getElementById('pug').style.backgroundImage = "url(images/blackpug.png)";
    document.getElementById('husky').style.backgroundImage = "url(images/blackhusky.png)";
    document.getElementById('boxer').style.backgroundImage = "url(images/boxer.png)"; 
  }
}
function dogstats(dog) {
  if (dog == 'pug') {
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('pugstats'); x[i].style.display = 'inline'; }
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('huskystats'); x[i].style.display = 'none'; }
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('boxerstats'); x[i].style.display = 'none'; }
  }
  else if (dog == 'husky') {
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('pugstats'); x[i].style.display = 'none'; }
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('huskystats'); x[i].style.display = 'inline'; }
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('boxerstats'); x[i].style.display = 'none'; } 
  }
  else if (dog == 'boxer') {
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('pugstats'); x[i].style.display = 'none'; }
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('huskystats'); x[i].style.display = 'none'; }
    for (i=0;i<2;i++) { var x = document.getElementsByClassName('boxerstats'); x[i].style.display = 'inline'; }
  }
}
function spawnChocolate() {
  chocolates.push ({
    pos: {
      x: Math.floor(Math.random()*1024),
      y: Math.floor(Math.random()*768)
    },
    speed: 2,
    sprite: new Sprite("images/chocolate.png", [0, 0], [34, 52])
  });
}
function changegoddog() {
  if (bonenumber > 1) {
    player.sprite = new Sprite("images/doggodanim.png", [20, 0], [28, 56], 15, [0,1,2,3,4,5,6,7,8], 'vertical', false, 0, [2, 2], 1); dogspeed = 4.0000000001;
  }
}
function spawnWall(x1, x2, y1, y2) {
  walls.push ({
    pos: { x: x1, y: y1 },
    sprite: new Sprite("images/wall.png", [0, 0], [x2-x1, y2-y1])
  });
}
function josephIsAwesome() {
  for(var i=0;i<walls.length;i++) {
    if(objectCollides(player, walls[i])) {
      console.log('playerposx = ' + player.pos.x);
      console.log('lastpos = ' + player.lastposx);
      player.pos.x = player.lastposx; 
      player.pos.y = player.lastposy;
    }
  } 
}