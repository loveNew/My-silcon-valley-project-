var player,playerImg,enemy,enemyImg,bullet,bulletImg;
var gameState = "serve";
var edges,invi,bulletGroup,enemyGroup,score,timelimit;
var startButtonImg,resetButton,startButton,burstImg,fireball,fireballImg,fireballGroup;
var spaceBgImg,spaceBg;

// i will make the reset button in the next project
// and the things that are left also

function preload(){
  playerImg = loadImage("player.png");
  enemyImg = loadImage("enemy.png");
  bulletImg = loadImage("bullet.png");
  startButtonImg = loadImage("startButton.png");
  burstImg = loadImage("burst.png");
  fireballImg = loadImage("fireball.png");
  spaceBgImg = loadImage("spaceBg.jpg");
}

function setup() {
  createCanvas(1350,600);
 spaceBg = createSprite(width/2,height/2,50,50);
 spaceBg.addImage(spaceBgImg);
 spaceBg.scale = 4.5;

  player = createSprite(170, 300, 50, 50);
  player.addImage(playerImg);
  player.scale = 1.5;

  invi  = createSprite(300,height/2,10000,10);
  invi.visible = false;

  resetbutton = createImg('reset.png');
  resetbutton.position(-250,-300);
  resetbutton.size(100,100);
  resetbutton.mouseClicked(reset);

  startbutton = createImg('startButton.png');
  startbutton.position(600,400);
  startbutton.size(100,50);
  startbutton.mouseClicked(start);

  //resetButton.visible = false;

  bulletGroup = new Group();
  enemyGroup = new Group();
  fireballGroup = new Group();
  score = 0;
  edges = createEdgeSprites();
  timelimit = 200;
}

function draw() {
background("black");
drawSprites();

if(gameState === "serve"){
  
  player.visible = true;
  player.addImage(playerImg);
  player.scale = 1.5;
  resetbutton.position(-250,-300);
  startbutton.position(600,400);
  textSize(25);
  fill("yellow");
   text("Press 'SPACE' to shoot.",width/3,height-500);
   text("Press arrow keys to move.",width/3,height-450);
   text("Destroy all the enemy ships within 200 seconds.",width/3,height-400);
   text("If you reached 100 score you will win.",width/3,height-350);
   text("But if you can't get 100 score under 200 seconds you will defeat.",width/3,height-300);
   text("the enemy ship will attack on you",width/3,height-250);


if(keyDown(UP_ARROW)){player.y = player.y-5;}
if(keyDown(DOWN_ARROW)){player.y = player.y+5;}
if(keyDown(LEFT_ARROW)){player.x = player.x-10;}
if(keyDown(RIGHT_ARROW)){player.x = player.x+10;}

if(keyWentDown("space")){
  shootBullets();
}
}

if(gameState === "play"){
 player.x = width/2;
 player.y = 500;
 gameState = "game";

 if(keyDown("p") && gameState === "serve"){gameState = "play"};
 if(keyDown(UP_ARROW)){player.y = player.y-5;}
 if(keyDown(DOWN_ARROW)){player.y = player.y+5;}
 if(keyDown(LEFT_ARROW)){player.x = player.x-10;}
 if(keyDown(RIGHT_ARROW)){player.x = player.x+10;}
 
 if(keyWentDown("space")){
   shootBullets();
 }


}

if(gameState === "game"){
  player.collide(invi);
   spawnEnemy();
   time();
   if(frameCount % 100 === 0){
      enemyAttack(); 
   }
 
   if(player.isTouching(fireballGroup)){
     player.addImage(burstImg);
     player.scale = 0.5;
 
       gameState = "gameOver";
       fireballGroup.destroyEach();
     
   }

 if(keyDown("p") && gameState === "serve"){gameState = "play"};
 if(keyDown(UP_ARROW)){player.y = player.y-5;}
 if(keyDown(DOWN_ARROW)){player.y = player.y+5;}
 if(keyDown(LEFT_ARROW)){player.x = player.x-10;}
 if(keyDown(RIGHT_ARROW)){player.x = player.x+10;}

if(keyWentDown("space")){
  shootBullets();
}
}

if(gameState === "end"){
  textSize(50);
  fill("red");
  text("😔 You lose 😔",width/3,height-200);
  text("Your score is " + score,width/3,height-300);
  text("⏱ Time over ⏱",width/3,height-400);
  player.visible = false;
  enemyGroup.destroyEach();
  resetbutton.position(250,300);
}

if(gameState === "gameOver"){
  textSize(50);
  fill("red");
  text("😔 You lose 😔",width/3,height-200);
  text("Your score is " + score,width/3,height-300);
  text("A fireball touched you",width/3,height-400);
  player.visible = false;
  enemyGroup.destroyEach();
  resetbutton.position(250,300);
}

if(gameState === "win"){
  textSize(50);
  fill("white");
 text("🎉😊 Yeh!! you win 😊🎉",width/3,height-300);
 text("Your score is " + score + " in " + timelimit + " seconds",width/3,height-200);
 resetbutton.position(250,300);
 player.visible = false;
 enemyGroup.destroyEach();
}

if(keyWentUp("space")){}

if(enemyGroup.isTouching(bulletGroup)){
  for(var i = 0; i<enemyGroup.length; i++){
  if(enemyGroup[i].isTouching(bulletGroup)){
  enemyGroup[i].destroy();
  score = score + 1;
  bulletGroup.destroyEach();
 }
}
}

if(timelimit < 1){
  gameState = "end";
}

if(score > 99){
  gameState = "win";
}

 player.collide(edges);
 fill("white")
 textSize(25);
 text("Score: " +score,1100,550);
 text("Time left: " +timelimit + " seconds",width/10,height-50);

 if(mousePressedOver(resetButton)) {
  console.log("new");
}

}

function spawnEnemy(){
  if(frameCount % 65 === 0){
  enemy = createSprite(Math.round(random(150,1200)),100,50,50);
  enemy.addImage(enemyImg);
  enemyGroup.add(enemy);
  }
}

function shootBullets(){
  bullet = createSprite(player.x,player.y,50,50);
  bullet.addImage(bulletImg);
  bullet.scale = 0.7;
  bullet.velocityY= -10;
  bullet.lifetime = 100;
  bulletGroup.add(bullet);
}

function time(){

if(frameCount % 50 === 0){
timelimit = timelimit - 1;
}
}

function reset(){
  gameState = "serve";
  timelimit = 200;
  player.x = 170;
  player.y = 300;
  enemyGroup.destroyEach();
  bulletGroup.destroyEach();
  score = 0;
  window.location.reload();
}
function start(){
  gameState = "play";
  startbutton.position(-250,-300);
}
function enemyAttack(){
  fireball = createSprite(enemy.position.x,enemy.position.y,50,50);
  fireball.addImage(fireballImg);
  fireball.velocityY = 12;
  fireball.scale = 0.2;
  fireballGroup.add(fireball);
}