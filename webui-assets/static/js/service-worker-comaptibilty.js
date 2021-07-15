if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("assets/service-worker.js")
      .then(() => {
        console.log("Service Worker Registered");
      })
      .catch((err) => console.log(`Service Worker error : ${err}`));
  });
}
