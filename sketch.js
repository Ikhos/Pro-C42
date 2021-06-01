var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var edges;
var backGround, backGroundImage;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backGroundImage = loadImage("jungleBackground.jpeg");    
}

function setup() {
  createCanvas(400,400);
  backGround = createSprite(200,200,400,400);
  backGround.addImage(backGroundImage);
  ground = createSprite(200,380, width*2, 20);
  ground.velocityX = 4;
  monkey = createSprite(30,342);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  edges = createEdgeSprites();
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background("light_blue");
  ground.visible = false;
  if(ground.x > 300) {
     ground.x = 200
  }
  //controls
  if(keyWentDown("SPACE")) {
     monkey.velocityY = -8;
  }
  //gameEnding and gameScoring
  if(monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score = score + 2; 
  }
  if (gameState === PLAY) {
    obstacles();  
    food();
  }
  if(monkey.isTouching(obstacleGroup)) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.changeAnimation("mankey" , monkey);
    gameState = END;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
  monkey.collide(edges[2]);
  //callFunctions
  fatMonkey();
  drawSprites();
  //displayScore
  fill("white");
  text("Score: " + score, 300, 50);
}
function food() {
 var randY = Math.round(random(200, 350))
 if(frameCount % 80 === 0) {
   banana = createSprite(430,randY);
   banana.addImage(bananaImage);
   banana.velocityX = -3;
   banana.scale = 0.1;
   banana.lifetime = 400/3;
   FoodGroup.add(banana);
 }
}
//defineFunctions
function obstacles() {
  var randY = Math.round(random(300,370));
  if(frameCount % 300 === 0) {
   obstacle = createSprite(430,randY);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -3;
   obstacle.scale = 0.1;
   obstacle.lifetime = 400/3;
   obstacleGroup.add(obstacle);
  }
}
function fatMonkey() {
  switch (score) {
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
      default: break;
  }
}

