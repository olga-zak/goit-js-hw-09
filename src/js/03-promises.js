'use strict';

import Notiflix from 'notiflix';
// генератор промисов
// В HTML есть разметка формы, в поля которой пользователь будет вводить первую задержку в миллисекундах,
// шаг увеличения задержки для каждого промиса после первого и количество промисов которое необходимо создать.
const formRef = document.querySelector('form');

const dataFromInputs = {};

formRef.addEventListener('input', event => {
  //console.log(event.target.name); // delay,step or amount
  //console.log(event.target.value); // data that user has filled
  dataFromInputs[event.target.name] = event.target.value;
  // console.log(dataFromInputs);
});

// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз,
// сколько ввели в поле amount.При каждом вызове передай ей номер создаваемого промиса(position) и задержку
// учитывая введенную пользователем первую задержку(delay) и шаг(step).
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let position = 1;
  let delay = Number(dataFromInputs.delay);
  for (let i = 1; i <= dataFromInputs.amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    position += 1;
    delay += Number(dataFromInputs.step);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); //значение усп.промиса { position, delay } будет параметром в callback1
      }
      reject({ position, delay }); //значение НЕусп.промиса { position, delay } будет параметром в callback2
    }, delay);
  });
  return promise;
}

// Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или отклоняется через delay времени.
// Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных параметров.
// Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

// Библиотека уведомлений
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Для отображения уведомлений пользователю вместо console.log() используй библиотеку notiflix.

// //THEORY
// // 1.создали промис
// const promise = new Promise((resolve, reject) => {
//   const shouldResolve = Math.random() > 0.5;
//   setTimeout(() => {
//     if (shouldResolve) {
//       resolve('it is ok'); //то что передаём в resolve, подёт параметром result в 1ый callback (в планировке ниже - пункт 2-2а)
//     }

//     reject('error mzfk'); //то что передаём в reject, подёт параметром error в 2ой callback (в планировке ниже - пункт 2-2б)
//   }, 2000);
// });

// console.log(promise); //promise в состоянии pending

// // 2.делаем планировку
// promise.then(
//   // 2а. если успешно, то делаем это
//   result => {
//     console.log(promise); //promise в состоянии fullfilled
//     console.log(result);
//   },
//   // 2б. если НЕуспешно, то делаем это
//   error => {
//     console.log(promise); //promise в состоянии rejected
//     console.log(error);
//   }
// );
// // если промис выполнится успешно(или неуспешно), тогда (.then) сделай то, то в скобках после then - передаём туда callbackи -
// // 1ый для успешного промиса, 2ой - для неуспешного (promise.then(callback1, callback2))
// // then выполнится не сразу, а асинхронно - тогда, когда promise выполнится через 2000(задержка у таймаута)
