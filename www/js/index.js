/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};




//http://stackoverflow.com/questions/22558441/phonegap-upload-image-to-server-on-form-submit


// VARS 
var sandboxUrl = 'http://sandbox.ravennainteractive.com/wp-admin/admin-ajax.php';



// CAMERA
function capturePhoto(){
    navigator.camera.getPicture(setPhotoInForm,null,{sourceType:1, quality:60});
}

function setPhotoInForm(data){ 
    //output image to screen
    $("#cameraPic").attr( "src", data );
    $("#post-thumb").attr( "src", data );
}

function uploadPhoto(postID) {
    //selected photo URI is in the src attribute (we set this on getPhoto)
   
    var imageURI = document.getElementById('post-thumb').getAttribute("value");
    if (!imageURI) {
        alert('Please select an image first.');
        return;
    }

    //set upload options
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/jpeg";

    var ft = new FileTransfer();
    ft.upload(imageURI, sandboxUrl+'&Id='+postID+'&mode=upload', win, fail, options);
}

// UPLOAD IMAGE
function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    //alert("Response =" + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}


// SEND TO SERVER
$(document).ready(function(){

    $('form').submit(function(){
        var title   = $('#title').val();
        var content = $('#content').val();
        var postData = {
            'action'    : 'api_new_post',
            'mode'      : 'create_post'
            'title'     : title,
            'content'   : content
        };
                 
        $.ajax({
            method: 'POST',
            //contentType: 'application/json',
            data: postData,
            url: sandboxUrl,
            success: function(data){
                console.log(data);
                //alert('Your Post was successfully added');

                //uploadPhoto(postID);
            },
            error: function(data){
                console.log(data);
                alert('There was an error adding your comment');
            }
        });
     
        return false;

        
       
       
    });


});

