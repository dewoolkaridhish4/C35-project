//Create variables here
var dog, happyDog
var database
var foodS, foodStock
var dogImg,happyDogImg;

function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  happyDogImg=loadImage("happydog.png");
}

function setup() {
  database=firebase.database();

  createCanvas(500,500);
  
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.2;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}

function draw() {
  background(46, 139, 87);  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  //add styles here
  fill(255,255,254); 
  stroke("black"); 
  text("Food remaining : "+foodS,170,200); 
  textSize(13); 
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

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



