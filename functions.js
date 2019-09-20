function loseLife() { //when your hp gets to 0, you lose a life, if lives = 0 then game over
  lives--;
  if (lives == 0) {
      //reset game
  } /*else {
    reset level
  }*/
}
function loseHp(loss) { //when you get hit, hp goes down, if hp = 0 then you lose a life
    hp -= loss;
    if (hp <= 0) {
        loseLife();
        hp = 100;
    }
    hpred.sprite = new Sprite('images/red.png', [0, 0], [hp, 10]); //how the health bar goes down
    document.getElementById('hpdisplay').innerHTML = 'hp is ' + hp;
}
function hideButton() {
  document.getElementById('gamestartbutton').style.display = 'none';
  document.getElementById('musicbutton').style.display = 'none';
}

function spawnLettuce(x, y) { //spawns lettuce at a location on the field
  lettuces.push({
    pos: {x: x, y: y}, lastposx: 0, lastposy: 0,
    sprite: new Sprite("images/lettuce.png", [0, 0], [32, 32], 15, [0, 1, 2, 3], 'vertical')
  });
}
function spawnSpitball(imag) { //spawns a spitball from players position with different images based on dog
  posx = player.pos.x;
  posy = player.pos.y;
  facing = player.sprite.facing;
  spitballs.push({
    pos: { x: posx + Math.sin(facing+facing_change)*(player_radius)+player.sprite.size.w/2,
      y: posy - Math.cos(facing+facing_change)*(player_radius)+player.sprite.size.h/2 },
    width: 20, height: 20, bounce: 0, speed: 8, angle: facing, sprite: new Sprite(imag, [0, 0], [20, 20]) });
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
  bones.push({ pos: {x: lettx, y: letty}, lastposx: 0, lastposy: 0, speed: 1, angle: 0, sprite: new Sprite("images/bone.png", [0, 0], [40, 20]) });
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
  for (i=0;i<4;i++) { let y = document.getElementsByClassName('dogbuttons'); y[i].style.display = 'inline'; }
  document.getElementById('dogselectbtn').style.display = 'inline';
}
function nextLevel() {
  clearsprites();
  level += 1;
  selectdog();
}
function hidedogbtns() {
  for (i=0;i<4;i++) { let x = document.getElementsByClassName('dogbuttons'); x[i].style.display = 'none'; }
}
function hidecontbtn() {
  document.getElementById('dogselectbtn').style.display = 'none';
  for (i=0;i<3;i++) { let x = document.getElementsByClassName('heartimg'); x[i].style.display = 'none';}
  for (i=0;i<3;i++) { let x = document.getElementsByClassName('speedimg'); x[i].style.display = 'none';}
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
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('pugstats'); x[i].style.display = 'inline'; }
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('huskystats'); x[i].style.display = 'none'; }
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('boxerstats'); x[i].style.display = 'none'; }
  }
  else if (dog == 'husky') {
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('pugstats'); x[i].style.display = 'none'; }
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('huskystats'); x[i].style.display = 'inline'; }
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('boxerstats'); x[i].style.display = 'none'; } 
  }
  else if (dog == 'boxer') {
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('pugstats'); x[i].style.display = 'none'; }
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('huskystats'); x[i].style.display = 'none'; }
    for (i=0;i<2;i++) { let x = document.getElementsByClassName('boxerstats'); x[i].style.display = 'inline'; }
  }
}
function spawnChocolate(x, y) {
  chocolates.push ({
    speed: 1,
    pos: { x: x, y: y},
    lastposx: 0,
    lastposy: 0,
    speed: 2,
    sprite: new Sprite("images/chocolate.png", [0, 0], [34, 52])
  });
  
}
function changegoddog() {
  if (bonenumber > 1) {
    player.sprite = new Sprite("images/goddoganim.png", [0, 0], [56, 56], 15, [0,1,2,3,4,5,6,7,8], 'vertical', false, 0, [1.5, 1.5], 1); dogspeed = 4.0000000001;
  }
}
function spawnWall(x1, y1, x2, y2) {
  walls.push ({
    pos: { x: x1, y: y1 },
    lastposx: 0,
    lastposy: 0,
    width: x2-x1,
    height: y2-y1,
    sprite: new Sprite("images/wall.png", [0, 0], [x2-x1, y2-y1])
  });
}
function spawnFinWall(x1, y1, x2, y2) {
  finwalls.push ({
    pos: { x: x1, y: y1 },
    lastposx: 0,
    lastposy: 0,
    sprite: new Sprite("images/wall.png", [0, 0], [x2-x1, y2-y1])
  });
}
function spawnChest(x, y) {
    chests.push ({
        pos: {x: x, y: y},
        lastposx: 0,
        lastposy: 0,
        sprite: new Sprite("images/chest.png", [0, 0], [50, 34])
    });
}
function josephIsNotAwesome() {
  for(i=0;i<walls.length;i++) {
    if(objectCollides(player, walls[i])) {
    //  player.pos.x = player.lastposx; 
    //  player.pos.y = player.lastposy;
        backgrounds[current_level].pos.x = backgrounds[current_level].lastposx;
        backgrounds[current_level].pos.y = backgrounds[current_level].lastposy;
        for(i=0;i<walls.length;i++) {
            walls[i].pos.x = walls[i].lastposx;
            walls[i].pos.y = walls[i].lastposy;}
        for(i=0;i<bones.length;i++) {
            bones[i].pos.x = bones[i].lastposx;
            bones[i].pos.y = bones[i].lastposy;}
        for(i=0;i<lettuces.length;i++) {
            lettuces[i].pos.x = lettuces[i].lastposx;
            lettuces[i].pos.y = lettuces[i].lastposy;}
        for(i=0;i<chocolates.length;i++) {
            chocolates[i].pos.x = chocolates[i].lastposx;
            chocolates[i].pos.y = chocolates[i].lastposy;}
        for(i=0;i<finwalls.length;i++) {
            finwalls[i].pos.x = finwalls[i].lastposx;
            finwalls[i].pos.y = finwalls[i].lastposy;}
        for(i=0;i<chests.length;i++) {
            chests[i].pos.x = chests[i].lastposx;
            chests[i].pos.y = chests[i].lastposy;}
    }
  } 
}
function level1wallspawn() {
    spawnWall(0, 0, 700, 250);
    spawnWall(700, 0, 750, 10);
    spawnWall(0, 250, 300, 500);
    spawnWall(0, 500, 700, 800);
    spawnWall(750, 0, 950, 250);
    spawnWall(950, 0, 1050, 800)
    spawnWall(1050, 0, 1550, 1100);
    spawnWall(1550, 250, 1850, 700);
    spawnWall(1850, 600, 2000, 1100);
    spawnWall(0, 800, 10, 1500);
    spawnWall(0, 1500, 1050, 1750);
    spawnWall(1050, 1350, 2000, 1750);
    spawnFinWall(1850, 1100, 2000, 1350);
}
function level1spawn() {
    level1wallspawn();
    spawnChest(700, 0);
    spawnChocolate(1674, 800);
}
function walldirection(i, p) {
    let rightx = walls[p].pos.x + walls[p].width ;
    let bottomy = walls[p].pos.y + walls[p].height;
    if(spitballs[i].pos.x - spitballs[i].width <= walls[p].pos.x) {
        return 'vertical';
    } else if(spitballs[i].pos.y - spitballs[i].height <= walls[p].pos.y) {
        return 'horizontal';
    } else if(spitballs[i].pos.x + spitballs[i].width >= rightx) {
        return 'vertical';
    } else if(spitballs[i].pos.y + spitballs[i].height >= bottomy) {
        return 'horizontal';
    }
}
function spitballricochet(i, p) { //deciding to do this was not a good idea
    if(walldirection(i, p) == 'vertical') {
        spitballs[i].sprite.facing *= -1;
        spitballs[i].bounce += 1;
    } else if(walldirection(i, p) == 'horizontal') {
        if (1==1){
            if (spitballs[i].sprite.facing < Math.PI/2 && spitballs[i].sprite.facing > 0) {
              spitballs[i].sprite.facing = Math.PI/2 + spitballs[i].sprite.facing;
            }
            else if(spitballs[i].sprite.facing > Math.PI/2 && spitballs[i].sprite.facing < Math.PI) {
              spitballs[i].sprite.facing = Math.PI - spitballs[i].sprite.facing;
            }
            else if(spitballs[i].sprite.facing < -Math.PI/2 && spitballs[i].sprite.facing > -Math.PI) {
              spitballs[i].sprite.facing = Math.PI/2 + spitballs[i].sprite.facing;
            }
            else if(spitballs[i].sprite.facing > -Math.PI/2 && spitballs[i].sprite.facing < 0) {
              spitballs[i].sprite.facing = -Math.PI - spitballs[i].sprite.facing;
            }
            spitballs[i].bounce += 1;
            if(spitballs[i].bounce > 5) {
                spitballs.splice(i, 1);
            }
        }
    }
}