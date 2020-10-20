// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    avgOutput = document.querySelector("#avg--output");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
//    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    //cameraOutput.src = cameraSensor.toDataURL("image/webp");
    var imgData, width, height, length, 

                // Define variables for storing 
                // the individual red, blue and 
                // green colors 
                rgb = { r: 0, g: 0, b: 0 }, 

                // Define variable for the  
                // total number of colors 
                count = 0; 

            // Set the height and width equal 
            // to that of the canvas and the image 
            height = cameraView.videoHeight
            width = cameraView.videoWidth

            // Draw the image to the canvas 
             cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);

            // Get the data of the image 
            imgData = cameraSensor.getContext("2d").getImageData( 
                        0, 0, width, height); 

            // Get the length of image data object 
            length = imgData.data.length; 

            for (var i = 0; i < length; i += 4) { 

                // Sum all values of red colour 
                rgb.r += imgData.data[i]; 

                // Sum all values of green colour 
                rgb.g += imgData.data[i + 1]; 

                // Sum all values of blue colour 
                rgb.b += imgData.data[i + 2]; 

                // Increment the total number of 
                // values of rgb colours 
                count++; 
            } 

            // Find the average of red 
            rgb.r
                = Math.floor(rgb.r / count); 

            // Find the average of green 
            rgb.g
                = Math.floor(rgb.g / count); 

            // Find the average of blue 
            rgb.b
                = Math.floor(rgb.b / count); 
//            alert(rgb.r);
//            alert(rgb.g);
//            alert(rgb.b);

        // Function to set the background 
        // color of the second div as  
        // calculated average color of image 

           document 
                .getElementById("avg--output") 
                .style.backgroundColor = 
                'rgb(' + rgb.r + ',' 
                + rgb.g + ',' 
                + rgb.b + ')';
            document
                .getElementById("avg--output").textContent="R:"+rgb.r+" G:"+ rgb.g +" B:"+rgb.b;
            return rgb; 


    //cameraOutput.src = cameraSensor.toDataURL("image/webp");
    //cameraOutput.classList.add("taken");
    // track.stop();
};


// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);