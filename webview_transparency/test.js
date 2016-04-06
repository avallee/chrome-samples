window.onload = function() {
  var delete_wv = document.getElementById('delete_wv');
  delete_wv.onclick = function() {
    var wv = document.querySelector('.ib');
    wv.parentNode.removeChild(wv);
  }

  var viewImage = function(wv) {
    return function(data) {
      chrome.app.window.create('display.html', {
        innerBounds: { width: wv.clientWidth, height: wv.clientHeight }
      },
      function(aw) {
        var d = aw.contentWindow.document;
        d.addEventListener('DOMContentLoaded', function() {
          var img = d.createElement('img');
          img.src = data;
          d.body.appendChild(img);
        });
      });
    };
  };

  var id = 0;

  var deleteParent = function(e) {
    var p = e.target.parentElement.parentElement;
    p.parentElement.removeChild(p);
  };

  var screenshotWv = function(e) {
    var container = e.target;
    while (!container.classList.contains('ib')) {
      container = container.parentElement;
    }
    var wv = container.querySelector('webview');
    wv.captureVisibleRegion({format:'png'}, viewImage(wv));
  };

  var controls = document.createElement('div');
  controls.className = 'controls';
  controls.innerHTML = '<button id="screenshot">Screenshot</button>' +
      '<button id="delete">Delete webview</button>';

  var getControls = function() {
    var c = controls.cloneNode(true);
    c.querySelector('#delete').addEventListener('click', deleteParent);
    c.querySelector('#screenshot').addEventListener('click', screenshotWv);
    return c;
  }

  var add_wv = document.getElementById('add_wv');
  add_wv.onclick = function() {
    var wv = document.createElement('webview');
    wv.partition = "partition";
    wv.src = 'test2.html';
    wv.allowtransparency = document.getElementById('transparent').checked;
    wv.style.width = "640px";
    wv.style.height = "480px";

    var container = document.createElement('div');
    container.id = 'wvid0' + id;
    id++;

    container.className = 'ib';

    container.appendChild(wv);
    container.appendChild(getControls());

    document.body.appendChild(container);
  }
};
