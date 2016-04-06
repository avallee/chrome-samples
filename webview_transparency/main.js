chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('test.html', {
    innerBounds: {
      'width': 1280,
      'height': 800
    }
  });
});
