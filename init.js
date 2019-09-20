// 1. Global Variable Declaration
var gameCanvas = new myCanvas('game_canvas');
var gameSpeed = 2.5;
var center = {x:gameCanvas.width / 2, y:gameCanvas.height / 2};
var centerspawn = {x:(gameCanvas.width / 2) - (84/4), y:(gameCanvas.height / 2) - (84/2)};
var fall_time = 10;
var lastTime = 0;
var bonenumber = 0;
var level = 1;
var dogspeed = 2;
var curplayerposx = 0;
var curplayerposy = 0;
var hp = 100;
var chocdown = true; //whether chocolate should move down or up
var rico = true; //whether spitballs should ricochet or not
// assets
resources.load([
  'images/spitball.png',
  'images/boxeranim4.png',
  'images/huskyanim3.png',
  'images/lettuce.png',
  'images/lettuceshot.png',
  'images/puganim.png',
  'images/james.png',
  'images/bone.png',
  'images/chocolate.png',
  'images/goddoganim.png',
  'images/fireball.png',
  'images/wall.jpg',
  'images/wall.png',
  'images/level1.png',
  'images/grid.png',
  'images/chest.png',
  'images/red.png',
  'images/hp.png'
]);
resources.onReady(init);
// 3. Game Objects

//Singletons
var player = {
  speed: 2, 
  pos: centerspawn,
  sprite: new Sprite('images/boxeranim4.png', 
    [20, 0], 
    [42, 84], //size_in_img[x,y]
    15, 
    [0, 1, 2, 3, 4, 5, 6, 7],
    'vertical',
    false, 
    0, 
    [1,1],
    1, 
    //{x:0, y:15}, 
  ),
};
var hpred = {
    speed: 0,
    pos: [901, 51],
    sprite: new Sprite('images/red.png', [0, 0], [100, 10]),
};
var hpbar = {
    speed: 0,
    pos: [900, 50],
    sprite: new Sprite('images/hp.png', [0, 0], [102, 12], ),
};
var current_level = 2;

/*var jame = {
  speed: 3, pos: centerspawn,
  sprite: new Sprite("images/james.png", [0, 0], [64, 64], 15, [0, 1, 2, 3, 4, 5], 'vertical', false, 0, [5, 5], 1,),
};*/
//Background
var backgrounds = [];
backgrounds.push(
    {
        speed: 0,
        pos: {x: 0, y: 0},
        lastposx: 0, lastposy: 0,
        sprite: new Sprite('images/Grid.png', [0, 0], [1024, 768])
    }
);
backgrounds.push(
    {
        speed: 0,
        pos: {x: 0, y: 0},
        lastposx: 0, lastposy: 0,
        sprite: new Sprite('images/field_map.gif', [0, 0], [2592, 1344])
    }
);
backgrounds.push(
    {
        speed: 0,
        pos: {x: 0,y: 0},
        lastposx: 0,
        lastposy: 0,
        sprite: new Sprite('images/level1.png', [0, 0], [5000, 2000])
    }
);

//Arrays
var spitballs = [];
var lettuces = [];
var lettuceshots = [];
var bones = [];
var chocolates = [];
var walls = [];
var finwalls = [];
var chests = [];
// 4. Settings for game logic
var gameOver = false;
var score = 0;
var lives = 3;

// 5.  Getting ready to load the game
function init() {
  reset();
  hidedogbtns();
  lastTime = Date.now();
  document.getElementById('gamestartbutton').addEventListener('click', gameLoop); //button which starts game
  document.getElementById('gamestartbutton').addEventListener('click', hideButton); //hides button after click
  //playSound("background");
  level1spawn();
}

function reset() {
  gameOver = false;
  lives = 3;
  score = 0;
};

function gameLoop() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;
  if (dt > 0.15) {
    dt = 0.15;
  } 

  fall_time += dt;
  update(dt);
  render();
  lastTime = now;
  if (!gameOver) {
    requestAnimationFrame(gameLoop); 
  }
};