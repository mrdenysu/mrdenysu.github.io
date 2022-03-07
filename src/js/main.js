document.addEventListener("DOMContentLoaded", main);

/* Main */
async function main() {
  await registerServiceWorker()
  menu()
}

/* Utils */
function menu() {
  document.querySelectorAll("a.navbar-menu__item").forEach((el) => {
    if (el.href === window.location.href) el.classList.toggle("navbar-menu__item_active");
  })
}

function language(lang_default = "ru") {
  const lang = navigator.language ?? navigator.userLanguage;
  const content = []

  if (lang.includes(lang_default))
    content.push(...document.querySelectorAll(".ru"))
  else
    content.push(...document.querySelectorAll(".en"))

  content.forEach(el => {
    el.style.display = "block";
  })
}

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

