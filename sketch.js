var database;
var dog,dogIMG,dogIMG2;
var foodS,foodStock;

function preload()
{
  dogIMG = loadImage("images/dogImg.png");
  dogIMG2 = loadImage("images/dogImg1.png");
}

function setup() {
	var canvas = createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,250,20,20);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(dogIMG2);
}

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,180,150);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed DOG Milk!",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
   
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}