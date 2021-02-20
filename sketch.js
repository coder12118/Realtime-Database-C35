var ball;
var database; //Step 1
var position;

function setup(){
    createCanvas(500,500);

    //Step 2 
    database = firebase.database(); //namespacing
    console.log(database)

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //Step 3 - reference to the database before reading.
    var ballPositionRef = database.ref("ball/position");
    //.on("value",function1,function2)
    ballPositionRef.on("value", readPosition, showError);
    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){ //refer to the database and write into the database
    database.ref("ball/position").set({
        "x": position.x + x, 
        "y": position.y + y
    })
}

function readPosition(data){
    position = data.val(); //gives JSON format of the data
    //{x:262,y:374};
    console.log(position)
    ball.x = position.x
    ball.y = position.y
}

function showError(){
    console.log("no data formed");
}
