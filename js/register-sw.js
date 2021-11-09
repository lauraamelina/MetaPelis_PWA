if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('../service-worker.js').then((message) => {
        console.log("SW activo");
    });
} else {
    console.log("¡SW no está siendo soportado!");
}