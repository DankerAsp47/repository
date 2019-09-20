/* Version 2.0 - 2-Feb-2019
 * Asynchronous audio loader
 *
 * Use this class to load sounds and control playback
 *
 * Files adapted from:
 * *Getting Started with Web Audio API
 * * by Boris Smus
 * * http://www.html5rocks.com/en/tutorials/webaudio/intro/
 *
 * Do not use or redistribute without permission
 *
 * ARP 14/08/2014
 */

// Fix up prefixing

window.AudioContext = window.AudioContext || window.webkitAudioContext;
gcontext = new AudioContext();

function WebAudioBuffer(urlList, callback) {
  this.context = gcontext;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
}

WebAudioBuffer.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url[0], true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url[0]);
          return;
        }
        loader.bufferList[url[1]] = buffer;
        if (++loader.loadCount === loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  };

  request.send();
};

WebAudioBuffer.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
};

WebAudioBuffer.prototype.play = function(name) {
  var source = this.context.createBufferSource();
  source.buffer = this.bufferList[name];
  source.connect(this.context.destination);

  source.playbackRate.value = 0.1;
  source.start(0);
};
