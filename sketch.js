var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloud
var shoot = 0;
var score = 0;
var restart

function preload(){
  p1 = loadImage("image/spaceship.png")
  bg1 = loadSound("sound/song.mp3")

  bg = loadImage("image/space.png")
  ufo = loadImage("image/ufo.png")
  rest = loadImage("image/restart.png")
  bomb = loadSound("sound/shoot.mp3")
  gun = loadImage("image/missile.png")
  
}
function setup() {
  createCanvas(1536, 752);
  path = createSprite(100,380);
  path.addImage(bg)
  ship = createSprite(150, 400, 50, 50);
  ship.addImage(p1);
  ship.scale = 0.5; 
  invisible = createSprite(750,745,1600,15)
  invisible.visible = 0
  invisible1 = createSprite(750,5,1600,15)
  invisible1.visible = 0
  restart = createSprite(800,500);
  restart.addImage(rest);
  restart.scale = 0.5
  restart.visible = 0
  bg1.loop();  


  obstaclesGroup = new Group();
  laserGroup = new Group();

 }

function draw() {

  background("black");  
  drawSprites();
  textSize(37)
  fill("white")
  text("SCORE: "+ score, 700,50);
  text("Press right to move down & left to go up", 800,100);
  text("Press space to shoot the aliens & ", 250,100);

  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);

    shoot = shoot - 1;
    path.velocityX = -50

    if(keyWentDown("space") && shoot < 460) {
      laser = createSprite(ship.x + 130,ship.y);
      laser.addImage(gun);
      laser.velocityX = 8; 
      laser.scale = 0.3;
      laserGroup.add(laser);
      bomb.play();
      //console.log(laser.x);
      shoot = laser.x;
      laser.lifetime = 500  
    } 
    ship.collide(invisible)
    ship.collide(invisible1)
    obstaclesGroup.collide(invisible)
    obstaclesGroup.collide(invisible1)
    if(path.x < 0 ){
      path.x = width/1;
    }
    if(keyDown("left")){
      ship.y = ship.y - 10

    }else if(keyDown("right")){
      ship.y = ship.y + 10

    }

    if(ship.isTouching(obstaclesGroup)){
      gameState = END;
    }
    if(laserGroup.isTouching(obstaclesGroup)){
      obstaclesGroup.destroyEach();
      laserGroup.destroyEach();

    }

    spawnObstacles();
  }else if(gameState === END){
    path.velocityX = 0
    cloud.velocityX = 0
    restart.visible = 1
    if(mousePressedOver(restart)){
      reset()
    }
  }

}
function spawnObstacles(){
  if (frameCount % 200 === 0) {
    cloud = createSprite(1500,120,40,10);
    cloud.y = Math.round(random(100,800));
    cloud.addImage(ufo);
    cloud.scale = 0.5;
    cloud.velocityX = -15;
    
     //assign lifetime to the variable
    cloud.lifetime = 1000;
        
    //add each cloud to the group
    obstaclesGroup.add(cloud);
  }
}
function createArrow(){
  Arrow = createSprite(80,ship.y);
  Arrow.addImage(gun);
  Arrow.scale = 0.3;
  Arrow.velocityX = 20;
  Arrow.lifetime = 130;
}
  function reset(){
    gameState = PLAY;
    restart.visible = false;
    cloud.destroy();
    
    score = 0;
  }
