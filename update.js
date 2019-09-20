function update(dt) {
  //Step 1 - handle keyboard inputs in the gameLoop
  handleInput(dt);
  switch(bruh = document.getElementById('field').value) { //"cheat code" box type thing, lets you change dogs and spawn sprites at will
    case 'husky':
      player.sprite = new Sprite('images/huskyanim3.png', [20, 0], [42, 84], 15,  [0, 1, 2, 3, 4, 5, 6, 7], 'vertical', false, 0, [1,1], 1); break;
    case 'boxer':
      player.sprite = new Sprite('images/boxeranim4.png', [20, 0], [42, 84], 15,  [0, 1, 2, 3, 4, 5, 6, 7], 'vertical', false, 0, [1,1], 1); break;
    case 'pug':
      player.sprite = new Sprite('images/puganim.png', [20, 0], [42, 84], 15,  [0, 1, 2, 3, 4, 5], 'vertical', false, 0, [1,1], 1); break;
    case 'lettuce':
      for(i=0;i<100;i++) { spawnLettuce(500, 300); } break;
    case 'spitball':
      spawnSpitball('images/spitball.png'); break;
    case 'clear':
      clearsprites(); break;
    case 'jame':
      spawnJames(); break;
    case 'rico':
      rico = true;
  }
  //Step 2 - update any animations (not movement, animations, like moving legs)
  if(player.moving == true) { //means that dog will only animate when it's actually moving
    player.sprite.update(dt);
  }
  for(i = 0;i<lettuces.length;i++) {
    lettuces[i].sprite.update(dt);
  }
  /*
  Step 3 - Calculate all new locations
  - check if off screen
  */
                    // if(chocolates.length != 0) {
                    //     if(1000 > chocolates[chocolates.length-1].pos.y && chocdown == true) {
                    //         console.log(chocolates[chocolates.length-1].pos.y);
                    //         chocolates[chocolates.length-1].pos.y += 2;
                    //         if(1000 < chocolates[chocolates.length-1].pos.y) {
                    //             chocdown = false;
                    //         }
                    //     } else if(1000 < chocolates[chocolates.length-1].pos.y && chocdown == false) {
                    //         chocolates[chocolates.length-1].pos.y -= 2;
                    //         if(1000 > chocolates[chocolates.length-1].pos.y) {
                    //             chocdown = true;
                    //         }
                    //     }
                    // }
  /*
    Step 4 - Check collisions
     - in here you would then fire up explosions etc...just other objects!
     - you would also remove old objects here
  */
  for(i=0;i<spitballs.length;i++) { //collison between spitballs and lettuces, loops through each thing in both arrays and then splices accordingly
    for(j=0;j<lettuces.length;j++) {
      if(objectCollides(lettuces[j], spitballs[i])) {
        score += 100;
        spitballs.splice(i, 1);
        i--;
        if(Math.random() > 0.7) { //30% change to spawn a bone upon lettuce being hit
          spawnBone(lettuces[j].pos.x, lettuces[j].pos.y);
        }
        lettuces.splice(j, 1);
        j--;
        if(i < 0){
          break;
        }
      }
    }
  }

  for(i=0;i<bones.length;i++) {
    if(objectCollides(bones[i], player)) {
      bonenumber += 1;
      bones.splice(i ,1);
      document.getElementById('bonedisplay').innerHTML = bonenumber;
      i--;
    }
  }
  for(i=0;i<chests.length;i++) {
    if(objectCollides(chests[i], player)) {
      bonenumber += 5;
      chests.splice(i ,1);
      document.getElementById('bonedisplay').innerHTML = bonenumber;
      i--;
    }
  }
  for(i=0;i<lettuceshots.length;i++) {
    if(objectCollides(lettuceshots[i], player)) {
      score -= 100;
      lettuceshots.splice(i, 1);
      i--;
      loseHp(10);
    }
  }
  for(i=0;i<spitballs.length;i++) { //collison between spitballs and chocolates, loops through each thing in both arrays and then splices accordingly
    for(j=0;j<chocolates.length;j++) {
      if(objectCollides(chocolates[j], spitballs[i])) {
        score -= 100;
        spitballs.splice(i, 1);
        i--;
        chocolates.splice(j, 1);
        j--;
        loseHp(25);
        if(i < 0){
          break;
        }
      }
    }
  }
  for(i=0;i<chocolates.length;i++) {
    if(objectCollides(chocolates[i], player)) {
      score -= 100;
      loseHp(50);
    }
  }
  for(i=0;i<spitballs.length;i++) {
    for(p=0;p<walls.length;p++) {
      if(objectCollides(spitballs[i],walls[p])) {
        if(rico == true){
          spitballricochet(i, p);
        } else {
          spitballs.splice(i, 1);
          i--;
        }
        if(i < 0) {
          break;
        }
      }
    }
  }
  for(i=0;i<finwalls.length;i++) {
      if(objectCollides(finwalls[i], player)){
          //nextLevel();
      }
  }

   /*
  Step 5 - Create new objects [eg bad guys, cars, rocks, whatever]
  */
  for(i = 0;i<spitballs.length;i++){
    spitballs[i].pos.x += Math.sin(spitballs[i].sprite.facing)*spitballs[i].speed;
    spitballs[i].pos.y -= Math.cos(spitballs[i].sprite.facing)*spitballs[i].speed;
  }
  for(i = 0;i<spitballs.length;i++){ //deletes spitballs if they go past the visible screen
    if(spitballs[i].pos.x < 0 ||
      spitballs[i].pos.x > gameCanvas.width+spitballs[i].sprite.size.w ||
      spitballs[i].pos.y < 0 ||
      spitballs[i].pos.y > gameCanvas.height+spitballs[i].sprite.size.h) {
        spitballs.splice(i, 1);
        i--;
      }
  }
  
  for(i = 0;i<lettuceshots.length;i++){
    lettuceshots[i].pos.x += Math.sin(lettuceshots[i].sprite.facing)*lettuceshots[i].speed;
    lettuceshots[i].pos.y -= Math.cos(lettuceshots[i].sprite.facing)*lettuceshots[i].speed;
  }
  for(i = 0;i<lettuceshots.length;i++){
    if(lettuceshots[i].pos.x < 0 ||
      lettuceshots[i].pos.x > gameCanvas.width+lettuceshots[i].sprite.size.w ||
      lettuceshots[i].pos.y < 0 ||
      lettuceshots[i].pos.y > gameCanvas.height+lettuceshots[i].sprite.size.h) {
        lettuceshots.splice(i, 1);
        i--;
      }
  }
}
function render() {
  // This is the function where all the objects are deleted and redrawn
  gameCanvas.clear();
  renderEntity(backgrounds[current_level]);
  renderEntity(player);
  // update objects
    // Singletons: renderEntity(name);
  renderEntity(hpbar);
  renderEntity(hpred);
    // Multiples (ie arrays): renderEntities(array_name);
  renderEntities(spitballs);
  renderEntities(lettuces);
  renderEntities(lettuceshots);
  renderEntities(bones);
  renderEntities(chocolates);
  renderEntities(walls);
  renderEntities(finwalls);
  renderEntities(chests);
  // Other things to do
  // - Update HTML elements, such as score, lives etc...
  document.getElementById('score').innerHTML = score;
  document.getElementById('lives').innerHTML = lives;
}