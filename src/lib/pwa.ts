export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const serviceWorkerUrl = `${import.meta.env.BASE_URL}sw.js`;
    await navigator.serviceWorker.register(serviceWorkerUrl);
  }
}
