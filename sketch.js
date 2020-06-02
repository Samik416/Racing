var gameState = 0;

var player, playerImg;

var lives = 3;
var score = 0;

var coin, coinImg;
var coingrp;

var edges;

var bg, bg1;

var bad, bad1, bad2,bad3, bad4, badImg, badImg1, badImg2;
var badgrp, badgrp1, badgrp2, badgrp3, badgrp4;

function preload(){
  playerImg = loadImage("Images/car.png");
  bg = loadImage("Images/race.jpeg");
  badImg = loadImage("Images/car1.png");
  badImg1 = loadImage("Images/car2.png");
  badImg2 = loadImage("Images/car3.png");
  coinImg = loadImage("Images/coin.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  badgrp = createGroup();
  badgrp1 = createGroup();
  badgrp2 = createGroup();
  badgrp3 = createGroup();
  badgrp4 = createGroup();
  coingrp = createGroup();

  player = createSprite(displayWidth/2, displayHeight - 30, 20, 20);
  player.addImage(playerImg);

  edges = createEdgeSprites();
}

function draw() {
  background(bg);

  if(gameState === 0){
    fill("blue");
    textSize(50);
    text("Rules", displayWidth/2, displayHeight/2 - 50);

    fill("red");
    textSize(20);
    text("1) You have 3 lives", displayWidth/2, displayHeight/2);
    text("2) Left and Right keys to move", displayWidth/2, displayHeight/2 + 40);
    text("3) Avoid the other  cars", displayWidth/2, displayHeight/2 + 80);
    text("4) Your time is your score", displayWidth/2, displayHeight/2 + 120);
    text("5) Collect coins for extra points", displayWidth/2, displayHeight/2 + 160);
    text("6) You have the yellow car", displayWidth/2, displayHeight/2 + 200);
    text("7) Press 'a' to start", displayWidth/2, displayHeight/2 + 240);

    if(keyWentDown("a")){
      gameState = 1;
    }
  }

  if(gameState === 1){
  console.log(mouseX, mouseY);

  life();

  if(lives <= 0){
    badgrp.velocityY = 0;
    badgrp1.velocityY = 0;
    badgrp2.velocityY = 0;
    badgrp3.velocityY = 0;

    badgrp.lifetime = -1;
    badgrp1.lifetime = -1;
    badgrp2.lifetime = -1;
    badgrp3.lifetime = -1;

    player.velocityX = 0;

    fill("red")
    textSize(50);
    text("Nice!!!", displayWidth/2- 100, displayHeight/2);
    fill("Yellow")
    text("Your Time: " + score, displayWidth/2- 100, displayHeight/2 + 100);


  }else if(lives>0){
    evilship();
    evilship1();
    evilship2();
    evilship3();
    Coins();
    
    score = score + 1;


    textSize(20);
    fill("red");
    text("Your Time: " + score, displayWidth - 150, 100);

    if(player.isTouching(coingrp)){
      score = score + 60;
      coingrp.destroyEach();
    }

    move();
  }

  player.collide(edges);

  textSize(20);
  fill("red");
  text("Lives: " + lives, 240, 100);

  drawSprites();
}

}

function move(){
  if(keyWentDown(LEFT_ARROW)){
    player.velocityX = -20;
    player.velocityY = 0;
  }
  if(keyWentDown(RIGHT_ARROW)){
    player.velocityX = 20;
    player.velocityY = 0;
  }
  if(keyWentUp(LEFT_ARROW)){
    player.velocityX = 0;
  }
  if(keyWentUp(RIGHT_ARROW)){
    player.velocityX = 0;
  }
}

function evilship(){
  if(World.frameCount % 70 === 0){
    bad = createSprite(random(0, displayWidth), 0, 10, 10);
    bad.addImage(badImg);
    bad.velocityY = 15;
    bad.lifetime = 300;

    badgrp.add(bad);
  }
}

function evilship1(){
  if(World.frameCount % 40 === 0){
    bad1 = createSprite(random(0, displayWidth), 0, 10, 10);
    bad1.addImage(badImg1);
    bad1.velocityY = 18;
    bad1.lifetime = 300;

    badgrp1.add(bad1);
  }
}

function evilship2(){
  if(World.frameCount % 60 === 0){
    bad2 = createSprite(random(0, displayWidth), 0, 10, 10);
    bad2.addImage(badImg2);
    bad2.velocityY = 20;
    bad2.lifetime = 300;

    badgrp2.add(bad2);
  }
}

function evilship3(){
  if(World.frameCount % 80 === 0){
    bad3 = createSprite(10, 0, 10, 10);
    bad3.x = player.x;
    bad3.addImage(badImg);
    bad3.velocityY = 22;
    bad3.lifetime = 300;

    badgrp3.add(bad3);
  }
}

function Coins(){
  if(World.frameCount % 150 === 0){
    coin = createSprite(random(0, displayWidth), 0, 10, 10);
    coin.addImage(coinImg);
    coin.velocityY = 30;
    coin.lifetime = 300;

    coingrp.add(coin);
  }
}



function life(){
  if(badgrp.isTouching(player)){
    lives = lives - 1;
    score = score - 50;
    badgrp.destroyEach();
  }

  if(badgrp1.isTouching(player)){
    lives = lives - 1;
    score = score - 50;
    badgrp1.destroyEach();
  }

  if(badgrp2.isTouching(player)){
    lives = lives - 1;
    score = score - 50;
    badgrp2.destroyEach();
  }

  if(badgrp3.isTouching(player)){
    lives = lives - 1;
    score = score - 50;
    badgrp3.destroyEach();
  }
}