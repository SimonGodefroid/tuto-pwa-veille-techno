console.log(" Hello depuis main ");
const technologiesDiv = document.querySelector("#technos");
function loadTechnos() {
  fetch("http://localhost:4001/technos")
    .then(res => {
      res.json().then(technos => {
        const allTechnos = technos
          .map(
            t =>
              `<div><b>${t.name} </b>${t.description} - <a href="${t.url}" target="_blank">site officiel</a> </div>`
          )
          .join("");
        technologiesDiv.innerHTML = allTechnos;
      });
    })
    .catch(console.error);
}

loadTechnos();
// tester si le navigateur a un SW
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("./sw.js").catch(err => console.error(err));
}

// tester si le navigateur a un cache

if (window.caches) {
  caches.open("veille-techno-1.0").then(cache => {
    cache.addAll(["index.html", "main.js", "vendors/bootstrap4.min.css"]);
  });
}
