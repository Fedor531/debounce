// Возвращает функцию, которая, пока она продолжает вызываться,
// не будет запускаться.
// Она будет вызвана один раз через N миллисекунд после последнего вызова.
// Если передано аргумент `immediate` (true), то она запустится сразу же при первом запуске функции.

// 1) func - функция, которую ты нужно выполнить после определенного промежутка времени.

// 2) wait - отрезок времени, который функция debounce будет ожидать после последнего полученного действия,
//    прежде чем выполнять func.

// 3) immediate: true / false определяет, должна ли функция вызываться вначале.
//   !Если true - это означает, что мы вызываем функцию один раз сразу, а затем ждем, пока период ожидания wait не истечет после вызова.
//    По истечении времени следующее событие вызовет функцию и перезапустит debounce.
//   !Если false - ждём, пока не истечет период ожидания wait, а затем вызываем функцию.

function debounce(func, wait, immediate) {
  // 4) timeout: значение, используемое для обозначения текущего debounce.
  let timeout;

  // Эта функция выполняется, когда событие DOM вызвано.
  return function executedFunction() {
    // Сохраняем контекст this и любые параметры,
    // переданные в executedFunction.
    const context = this;
    const args = arguments;

    // Функция, вызываемая по истечению времени таймера
    const later = function () {
      // Нулевой timeout, чтобы указать, что debounce закончилась.
      timeout = null;
      // Если immediate false - вызываем функцию иначе по истечении срока таймера ничего не вызываем.
      if (!immediate) {
        func.apply(context, args);
      }
    };

    // Определяем, следует ли нам вызывать функцию в начале.
    const callNow = immediate && !timeout;

    // clearTimeout сбрасывает ожидание при каждом выполнении функции.
    // Это шаг, который предотвращает выполнение функции.
    clearTimeout(timeout);

    // Перезапускаем период ожидания таймера.
    timeout = setTimeout(later, wait);

    // Вызываем функцию в начале, если immediate === true
    if (callNow) {
      func.apply(context, args);
    }
  };
}

const nav = document.querySelector(".nav");

const changeNavColor = debounce(
  function () {
    console.log("currentScroll", currentScroll);
    console.log("window.pageYOffset", window.pageYOffset);
    if (window.pageYOffset > currentScroll) {
      currentScroll = window.pageYOffset;
      nav.setAttribute("style", "height: 60px; background-color: red");
      nav.textContent = "Вы двигались вниз";
    } else {
      currentScroll = window.pageYOffset;
      nav.setAttribute("style", "height: 100px; background-color: green");
      nav.textContent = "Вы двигаетесь вверх";
    }
  },
  100,
  true
);

let currentScroll = 0;

function scrollHandler() {
  if (window.pageYOffset > currentScroll) {
    currentScroll = window.pageYOffset;
    nav.setAttribute("style", "height: 60px; background-color: red");
    nav.textContent = "Вы двигались вниз";
  } else {
    currentScroll = window.pageYOffset;
    nav.setAttribute("style", "height: 100px; background-color: green");
    nav.textContent = "Вы двигаетесь вверх";
  }
}

window.addEventListener("scroll", scrollHandler);
