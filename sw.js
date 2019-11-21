console.log("HELLO DEPUIS LE SERVICE WORKER");
const CACHENAME = "veille-techno-1.0";
self.addEventListener("install", evt => {
  console.log("install evt", evt);
  caches.open(CACHENAME).then(cache => {
    cache.addAll([
      "index.html",
      "main.js",
      "style.css",
      `
      "vendors/bootstrap4.min.css",
      "add_techno.html",
      "add_techno.js",
      "contact.html",
      "contact.js`
    ]);
  });
});

self.addEventListener("activate", evt => {
  console.log("activate evt", evt);
});

self.addEventListener("fetch", evt => {
  console.log("fetch event sur l'url", evt.request.url);
  if (!navigator.onLine) {
    const headers = { headers: { "Content-Type": "text/html;charset=utf-8" } };
    evt.respondWith(
      new Response(
        `<h1>Pas de connexion internet</h1>
        <p>Application en mode dégradé. Veuillez vous connecter.</p>`,
        headers
      )
    );
  }
});
