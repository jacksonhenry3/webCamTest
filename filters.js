
    var video = document.querySelector("#vid");
    var canvas = document.querySelector('#liveFeed');
    var ctx = canvas.getContext('2d');
    var localMediaStream = null;
    var k = 0
    var onCameraFail = function (e) {
        console.log('Camera did not work.', e);
    };

    function snapshot() {
        if (localMediaStream) {
            ctx.drawImage(video, 0, 0);
        }
        filterCanvas(grayscale)
    }
    setInterval(snapshot, 1 );
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    window.URL = window.URL || window.webkitURL;

    navigator.getUserMedia({video:true}, function (stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
    }, onCameraFail);


          // apply a filter to the image data contained in the canvas object
      function filterCanvas(filter) {
        if (canvas.width > 0 && canvas.height > 0) {
          var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          filter(imageData);
          ctx.putImageData(imageData, 0, 0);
        }
      }

        grayscale = function (pixels, args) {
    var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
          var r = d[i];
          var g = d[i + 1];
          var b = d[i + 2];
          d[i] = g
          d[i+1] = b
          d[i+2] = r
        }
    return pixels;
  };

  filterCanvas(grayscale)
   