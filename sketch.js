const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
var eraser; 
var pencil;
var color, thickness;
var database;

function preload()
{
  eraser = loadImage("eraser.png");
  pencil = loadImage("Pencil.png");
}


function setup() {
  engine = Engine.create();
  world = engine.world;
  createCanvas(displayWidth, displayHeight - 115);
  database = firebase.database();
  background(0);

  fill("white");
  image(eraser, 180, 0, 50, 50);
  text("press e to erase", 100, 30);
  image(pencil, 330, 0, 50, 50);
  text("press f for pen", 250, 30);

  fill("green");
  text("press g for green", 400, 30);
  rect(500, 5, 40, 40);

  fill("red");
  text("press r for red", 550, 30);
  rect(650, 5, 40, 40);

  fill("purple");
  text("press p for purple", 700, 30);
  rect(800, 5, 40, 40);

  fill("blue");
  text("press b for blue", 850, 30);
  rect(935, 5, 40, 40);

  fill("white");
  text("press space for reset", 1000, 30);

  text("press + or - for change in thickness", 1150, 30);

  color = "white";
  thickness = 10;
}

var dots = [];
var db_drawing = [];

function draw() 
{
  readData();
  //beginShape();
  Engine.update(engine);

  for(var i  = 0; i < db_drawing.length; i++)
  {
    fill(color);
    noStroke();
   ellipse(db_drawing[i].x, db_drawing[i].y, thickness, thickness);
   //endShape();
  }

  drawSprites();
}



function keyPressed()
{
  if(keyCode === 69){
       color = "black";
  }

  if(keyCode === 70)
  {
    color = "white";
  }

  if(keyCode === 32)
  {
    background(0);

    fill("white");
    image(eraser, 180, 0, 50, 50);
    text("press e to erase", 100, 30);
    image(pencil, 330, 0, 50, 50);
    text("press f for pen", 250, 30);
  
    fill("green");
    text("press g for green", 400, 30);
    rect(500, 5, 40, 40);
  
    fill("red");
    text("press r for red", 550, 30);
    rect(650, 5, 40, 40);
  
    fill("purple");
    text("press p for purple", 700, 30);
    rect(800, 5, 40, 40);
  
    fill("blue");
    text("press b for blue", 850, 30);
    rect(935, 5, 40, 40);
  
    fill("white");
    text("press space for reset", 1000, 30);
  
    text("press + or - for change in thickness", 1150, 30);
  
  }

  if(keyCode === 71)
  {
    color = "green";
  }

  if(keyCode === 82)
  {
    color = "red";
  }

  if(keyCode === 80)
  {
    color = "purple";
  }

  if(keyCode === 66)
  {
    color = "blue";
  }

  if(keyCode === 109 && thickness !== 0);
  {
   thickness = thickness - 1;
  }

  if(keyCode === 107 && thickness === thickness)
  {
    thickness = thickness + 1;
  }
}

function mouseDragged()
{
  var point = {
    x : mouseX,
    y : mouseY
  }
  fill(color);
  noStroke();
  ellipse(mouseX, mouseY, thickness, thickness);
  dots.push(point);
  var drawings = database.ref('drawing');
  drawings.set({
    "d" : dots,
  });

}

function readData()
{ 
  database.ref('drawing/d').on('value', (data) =>
 {
    db_drawing = data.val()
 }) }

