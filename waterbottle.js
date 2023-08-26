img = "";
status ="";
objects = [];


function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function preload()
{
    img = loadImage('Water.jpg')
}



function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error)
    }
    console.log(results)
    objects = results;
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            textSize(25)
            text(objects[i].label + " " + percent + "%", objects[i].x+10, objects[i].y +25);
            noFill();
            strokeWeight(5)
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }  
    }


}