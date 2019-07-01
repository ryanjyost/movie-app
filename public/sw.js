self.addEventListener("install", function(event) {
  // Put `offline.html` page into cache
  var offlineRequest = new Request("offline.html");
  event.waitUntil(
    fetch(offlineRequest).then(function(response) {
      return caches.open("offline").then(function(cache) {
        console.log("[oninstall] Cached offline page", response.url);
        return cache.put(offlineRequest, response);
      });
    })
  );
});

self.addEventListener("load", () => {
  console.log("LOAD!");
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  checkValidServiceWorker(swUrl, null);
});

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        // registerValidSW(swUrl, config);
        console.log("WORKER");
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

self.addEventListener("fetch", function(event) {
  // Only fall back for HTML documents.
  var request = event.request;
  // && request.headers.get('accept').includes('text/html')
  if (request.method === "GET") {
    // `fetch()` will use the cache when possible, to this examples
    // depends on cache-busting URL parameter to avoid the cache.
    event.respondWith(
      fetch(request).catch(function(error) {
        // `fetch()` throws an exception when the server is unreachable but not
        // for valid HTTP responses, even `4xx` or `5xx` range.
        console.error(
          "[onfetch] Failed. Serving cached offline fallback " + error
        );
        return caches.open("offline").then(function(cache) {
          return cache.match("offline.html");
        });
      })
    );
  }
  // Any other handlers come here. Without calls to `event.respondWith()` the
  // request will be handled without the ServiceWorker.
});
