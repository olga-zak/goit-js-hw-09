// Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты.
// Такой таймер может использоваться в блогах и интернет - магазинах,
// страницах регистрации событий, во время технического обслуживания и т.д. Посмотри демо видео работы таймера.
'use strict';

import Notiflix from 'notiflix';
// Элементы интефрейса
// В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки,
// при клике по которой таймер должен запускаться.Добавь минимальное оформление элементов интерфейса.

const timerWrapperRef = document.querySelector('.timer');
timerWrapperRef.setAttribute(
  'style',
  'display:flex; color:red;justify-content: space-evenly; width: 300px;'
);
const timerFieldsRef = document.querySelectorAll('.field');
timerFieldsRef.forEach(field =>
  field.setAttribute(
    'style',
    'display:flex; flex-direction: column; align-items: center;'
  )
);
const timerValuesArr = document.querySelectorAll('.value');
timerValuesArr.forEach(value =>
  value.setAttribute('style', 'font-size: 30px; font-weight: bold;')
);
const timerLabelsArr = document.querySelectorAll('.label');
timerLabelsArr.forEach(label =>
  label.setAttribute('style', 'text-transform: uppercase;')
);

// Библиотека flatpickr
// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время
// в одном элементе интерфейса.Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт,
// кроме того который описан в документации.
// Описан в документации: import flatpickr from "flatpickr";
// Дополнительный импорт стилей: import "flatpickr/dist/flatpickr.min.css";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Библиотека ожидает что её инициализируют на элементе input[type="text"], поэтому мы добавили в HTML документ
// поле #datetimeinput - picker.  <input type="text" id="datetime-picker" />
const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
let selectedDate = 0;
startBtnRef.setAttribute('disabled', 'true');
// Вторым аргументом функции flatpickr(selector, options) можно передать необязательный объект параметров.
// Мы подготовили для тебя объект который нужен для выполнения задания.Разберись за что отвечает каждое свойство
// в документации «Options» и используй его в своем коде.
const options = {
  enableTime: true, //enableTime	Boolean	false	Enables time picker
  time_24hr: true, //time_24hr	boolean	false	Displays time picker in 24 hour mode without AM/PM selection when enabled.
  defaultDate: new Date(), //defaultDate	String	null	Sets the initial selected date(s). (If you're using mode: "multiple"
  //or a range calendar supply an Array of Date objects or an Array of date strings which follow your dateFormat.
  //Otherwise, you can supply a single Date object or a date string.
  minuteIncrement: 1, //minuteIncrement	Integer	5	Adjusts the step for the minute input (incl. scrolling)
  onOpen() {
    startBtnRef.setAttribute('disabled', 'true');
  },
  onClose(selectedDates) {
    //onClose	Function, [functions]	null	Function(s) to trigger on every time the calendar is closed
    // console.log(selectedDates[0]);
    // console.log(Date.now());

    // Выбор даты
    // Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr.
    // Именно в нём стоит обрабатывать дату выбранную пользователем.Параметр selectedDates это массив выбранных дат,
    // поэтому мы берем первый элемент.
    // Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    // Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
    else {
      startBtnRef.removeAttribute('disabled', 'true');
      selectedDate = selectedDates[0];
      return selectedDate;
    }
    // Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем. (line 46)
  },
};
flatpickr(inputRef, options);

// При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
startBtnRef.addEventListener('click', onStartBtnClick);

// Отсчет времени
// При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной
// даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx: xx: xx: xx.
let timerId = null;

function onStartBtnClick() {
  startBtnRef.setAttribute('disabled', 'true');
  timerId = setInterval(timer, 1000);
}
function timer() {
  const timeLeft = selectedDate - Date.now(); //ms
  //console.log(timeLeft);
  if (timeLeft <= 0) {
    //console.log('it is time');
    clearInterval(timerId);
    return;
  }
  const timeLeftObj = convertMs(timeLeft); //object { days, hours, minutes, seconds }
  //console.log(Object.values(timeLeftObj)); //array [4 digits]
  timerValuesArr.forEach(
    (value, index) =>
      (value.textContent = Object.values(timeLeftObj)
        [index].toString()
        .padStart(2, 0))
  );
}

// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
// НЕ БУДЕМ УСЛОЖНЯТЬ
// Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.

// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Форматирование времени
// Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. Обрати внимание,
// что она не форматирует результат.То есть, если осталось 4 минуты или любой другой составляющей времени,
// то функция вернет 4, а не 04.В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов.
// Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.

// Библиотека уведомлений
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.
