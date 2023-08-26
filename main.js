img = "";
status ="";
objects = [];


function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function preload()
{
    img = loadImage('dog_cat.jpg')
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}


function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);
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
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+objects.length;
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