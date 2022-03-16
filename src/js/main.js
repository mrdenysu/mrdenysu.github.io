document.addEventListener("DOMContentLoaded", main);

/* Main */
async function main() {
  await menu()
  await age()
}

/* Utils */
async function menu() {
  document.querySelectorAll("a.navbar-menu__item").forEach((el) => {
    if (el.href === window.location.href) el.classList.toggle("navbar-menu__item_active");
  })
}

async function age() {
  const b = document.querySelector(".age")
  if (b != null) document.querySelector(".age").textContent = `${new Date().getFullYear() - 2002}`;
}

/* Maybe soon */
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const register = await navigator.serviceWorker.register('/sw.js');
      console.log("Service Worker registered successfully");
      return register;
    } catch (e) {
      console.log("Service worker registration failed")
      return null;
    }
  }
}

async function unregisterServiceWorker() {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}