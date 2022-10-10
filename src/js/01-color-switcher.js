// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет
// цвет фона < body > на случайное значение используя инлайн стиль.
// При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
// Учти, на кнопку «Start» можно нажать бесконечное количество раз.
// Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна(disabled).
// Для генерации случайного цвета используй функцию getRandomHexColor.

'use strict';

const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let bodyColorChangerId = null;

startBtnRef.setAttribute(
  'style',
  'border-radius:4px; border-color: green; background-color: green;'
);
stopBtnRef.setAttribute(
  'style',
  'border-radius:4px; border-color: red; background-color: red;'
);

startBtnRef.addEventListener('click', onStartClick);
function onStartClick(event) {
  bodyColorChangerId = setInterval(() => {
    bodyRef.setAttribute('style', `background-color: ${getRandomHexColor()}`);
  }, 1000);
  startBtnRef.setAttribute('disabled', 'true');
}

stopBtnRef.addEventListener('click', onStopClick);
function onStopClick(event) {
  clearInterval(bodyColorChangerId);
  startBtnRef.removeAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
