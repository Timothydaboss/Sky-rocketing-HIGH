var canvas;
var backgroundImage, plane1_img, plane2_img;
var plane1, plane2
var sky, coins, bEdge;
var score1 = 0, score2 = 0;
var coinImage;

function preload() {
  backgroundImage = loadImage("./assets/background.jpg");
  plane1_img = loadImage("./assets/plane1.png");
  plane2_img = loadImage("./assets/plane2.png");
  coinImage = loadImage("./assets/coin.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  sky = createSprite(width/2,height/2 - 350)
  sky.addImage(backgroundImage);
  sky.scale= 1.5;
  sky.setVelocity(0,0.5)
  console.log (sky.position.y)

  plane1 = createSprite(width/2 -300,height -300)
  plane1.addImage(plane1_img)
  plane1.scale = 0.35;
  //plane1.debug = true;
  plane1.setCollider("circle",0,0,375 )

  plane2 = createSprite(width/2 + 300,height -300)
  plane2.addImage(plane2_img)
  plane2.scale = 0.35
  plane2.setCollider("circle",0,0,375 )
  //plane2.debug = true;
  coins = new Group()

  bEdge = createSprite(width/2, height, width, 10)
  bEdge.visible = false;
  
  for (var i=0 ; i < 25; i++){;
    var x = random(200, width-200);
    var y = random(- height*5,0);
    var coin = createSprite(x,y,20,20);
    coin.shapeColor ="yellow";
    coin.setVelocity(0,1) ;
    coin.addImage(coinImage);
    coin.scale= 0.02;
    coins.add(coin);
  }
  
}

function draw() {
  background(255);
  
  bEdge.overlap (coins,resetCoin)

  plane1.overlap (coins,increase1);

  plane2.overlap (coins,increase2)

  if(sky.position.y >= height + 100){
    sky.position.y = height/2 - 450;
  }

  if (keyIsDown(LEFT_ARROW) && plane2.position.x > plane1.position.x + 400 ){
    plane2.position.x -=2;
  }

  if (keyIsDown(RIGHT_ARROW) && plane2.position.x < width - 190 ){
    plane2.position.x +=2;
  }

  if ((keyIsDown(65)|| keyIsDown(97)) && plane1.position.x > 175){
    plane1.position.x -=2;
  }

  if ((keyIsDown(68) || keyIsDown(100)) && plane1.position.x < plane2.position.x - 400 ){
    plane1.position.x +=2;
  }
  
  
   
  drawSprites()

  if(coins.length === 0){
    sky.setVelocity(0,0)
    if(score1 < score2 ){
      fill ("blue");
      textSize(45)
      text ("Blue Plane Wins!!! " , width/2-150, 150)
    }
    else{
      fill ("red");
      textSize(45)
      text ("Red Plane Wins!!! " , width/2-150, 150)
    }
  }

  fill ("red");
  textSize(30)
  text ("Score  : " + score1, 30, 50)

  fill ("blue");
  text ("Score  : " + score2, width - 200, 50)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function resetCoin(edge,coin){
  coin.position.y = random(- height*5,0);
  coin.position.x = random(200, width-200)
}

function increase1(plane,coin){
  score1 += 5;
  coins.remove(coin)
  coin.remove()
}

function increase2(plane,coin){
  score2 += 5;
  coins.remove(coin)
  coin.remove()
}

