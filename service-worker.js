self.addEventListener("install", event => {
    console.log("Service worker installed.");
  });
  
  self.addEventListener("fetch", function(event) {
    // Just let the request pass through for now
  });
  