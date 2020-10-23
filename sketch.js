//Create variables here
var dog, database, foodstock, foods, fed, addfood, fedTime, foodobj;

function preload()
{
	//load images here
  dog1 = loadImage("images/dogImg.png");
  dog2 = loadImage("images/dogImg1.png");
  bg = loadImage("images/0.png");
}

function setup() {
	createCanvas(800, 500);
  
  database = firebase.database();

   dog = createSprite(710,350,50,50);
   dog.addImage("dog",dog1);
   dog.scale = 0.2; 

  foodstock = database.ref('Food');
  foodstock.on("value",readStock);

  fed = createButton("Feed the Dog");
  fed.position(700,95);
  fed.mousePressed(writeStock);
  fed.mouseReleased(changedog);

  addfood = createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addStock);

  foodobj = new Food();
}

function draw() {  
  background(bg);

  drawSprites();

  fill(0);
  textSize(15);

if(fedTime){

  if (fedTime>=12) {
    
    text("Last Feed : "+fedTime%12 + "PM",350,50);
  }else if(fedTime==0){

    text("Last Feed : 12 AM",350,50);
  }else{

    text("Last Feed : "+ fedTime + "AM",350,50);
  }
}

  foodobj.display();
}
function writeStock() {
  
  if (foods<=0) {
    
    foods=0;
  }else{

    foods=foods-1;
    fedTime = hour();
  }

   database.ref('/').update({

     Food: foods,
     FedTime: fedTime
   })
   if (foods>0) {
     
    dog.addImage("happy",dog2)
    dog.changeImage("happy");
   }
}
function changedog() {
  
  dog.changeImage("dog");
}

function readStock(data){

  foods = data.val();
}
function addStock() {

  if (foods<20) {

     foods=foods+1;
  }

   database.ref('/').update({
     Food: foods
   })
}
