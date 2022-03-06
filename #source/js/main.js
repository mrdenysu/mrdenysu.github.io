document.addEventListener("DOMContentLoaded", main);

async function main() {
  document.querySelectorAll("a.navbar-menu__item").forEach((el) => {
    if (el.href === window.location.href) el.classList.toggle("navbar-menu__item_active");
  })

  const language = navigator.language ?? navigator.userLanguage;
  const content = []

  if (language.includes("ru"))
    content.push(...document.querySelectorAll(".ru"))
  else
    content.push(...document.querySelectorAll(".en"))

  content.forEach(el => {
    el.style.display = "block";
  })
}