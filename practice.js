// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//Experimenting with API
// const local = navigator.language;
// console.log(local);
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   weekday: 'long',
// };
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

//Fake always we are loged in
// currentAccount = account1;

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = ` ${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(23 === 23.0);
// console.log(1 / 10);
// console.log(0.1 + 0.2);

// console.log(Number('48'));
// //easy way
// console.log(+'48');

// console.log(Number.parseInt('45pppp'));
// console.log(Number.parseInt('e89'));

// console.log(Number.parseFloat('  2.5 eeeee'));
// console.log(Number.parseInt('2.5'));

// console.log(Number.isNaN('2.5'));
// console.log(Number.isNaN(2));

// console.log(Number.isNaN(+'23p'));
// console.log(Number.isNaN(56 / 0));

// console.log(Number.isFinite(78));
// console.log(Number.isFinite('78'));

// // console.log(Number.isInteger(56));

// console.log(Math.sqrt(36));
// console.log(Math.max(1, 4, 8, 9, 12, 34));
// console.log(Math.max(1, 4, 8, 9, 12, 34, '54'));
// console.log(Math.min(1, 4, 8, 9, 12, 34, '54'));
// console.log(Math.random() * 6 + 1);

// const randomInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min) + 1) + min;
// };

// //Rounding integers

// console.log(Math.trunc(3.99));

// console.log(Math.round(3.4));
// console.log(Math.round(5.8));

// console.log(Math.ceil(6.4));
// console.log(Math.ceil(5.8));

// console.log(Math.floor(5.8));
// console.log(Math.floor(5.9));

// console.log(Math.trunc(-23.8));

// //Rounding decimals
// console.log((5.35896).toFixed(1));
// console.log(+(5.35896).toFixed(1));
// console.log(5 % 2);

// const isEven = function (n) {
//   if (n % 2 === 0) console.log('Even');
//   else console.log('Odd');
// };

// isEven(9);
// isEven(10);

// // labelBalance.addEventListener('click', function () {
// //   const arr = Array.from(document.querySelectorAll('.movements__value'), el =>
// //     Number(el.textContent.replace('€', ' '))
// //   );
// //   console.log(arr);
// // });

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (el, i) {
//     if (i % 2 === 0) el.style.backgroundColor = 'yellow';
//     else if (i % 2 === 1) el.style.backgroundColor = 'green';
//   });
// });

// const diameter = 287_456_564_000;
// console.log(diameter);

// console.log(Number('289_456'));

// console.log(214681248712940192409127490n);

// //Operations
// console.log(10000n + 10000n);
// console.log(7832472483249834723479n * 1237812738123971298387192n);

// const huge = 2173079121290740912749017n;
// const num = 23;
// console.log(huge * BigInt(num));
// //Exceptions
// console.log(20n > 15);
// console.log(20n === 20);
// console.log(typeof 20n);
// console.log(20n == 20);
// console.log(huge + 'is Really big number');

// //Division
// console.log(10n / 3);
// console.log(11 / 3);
// console.log();

//Creating dates

// const now = new Date();
// console.log(now);

// console.log(new Date('Aug 24 2005'));

// //Operation with accounts
// console.log(new Date(account1.movementsDates.forEach(i => i)));

// // account1.movementsDates.forEach(i => console.log(new Date(i)));

// console.log(new Date(2002, 3, 15, 4, 23, 12));

// console.log(new Date(2001, 2, 34));

//Working with Dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);

// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());

// console.log(future.getTime());
// console.log(Date.now());

// future.setFullYear(2024);
// console.log(future);

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(Number(future));

// const calcDayPassed = function (date1, date2) {
//   return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// };

// const days1 = calcDayPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(days1);

//Examples

// const nowDate = new Date();
// const liveLocalLanguage = navigator.language;
// const options = {
//   timeStyle: 'long',
//   dateStyle: 'full',
// };
// console.log(
//   new Intl.DateTimeFormat(liveLocalLanguage, options).format(nowDate)
// );

// console.log(new Intl.DateTimeFormat('ar-EG').format(nowDate));
// console.log(new Intl.DateTimeFormat('en-Us').format(nowDate));

// const number = 256350056.34;
// const optionsCurr = {
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR',
// };

// console.log(
//   'England: ',
//   new Intl.NumberFormat('ea-GB', optionsCurr).format(number)
// );
// console.log(
//   'USA: ',
//   new Intl.NumberFormat('ea-us', optionsCurr).format(number)
// );
// console.log('BG: ', new Intl.NumberFormat('bg-Bg', optionsCurr).format(number));
// console.log(
//   'Syria: ',
//   new Intl.NumberFormat('ar-SY', optionsCurr).format(number)
// );

// const ingredients = ['peperoni', 'olives', 'cheese'];
// const someTimer = setTimeout(
//   function (ing1, ing2, ing3) {
//     console.log(`Here is you pizza with ${ing1} and ${ing2} and ${ing3}`);
//   },
//   3000,
//   ...ingredients
// );
// console.log('Waiting');

// if (ingredients.includes('peperoni')) {
//   clearTimeout(someTimer);
// }

// setInterval(function () {
//   const now = new Date();

//   const clock = new Intl.DateTimeFormat(navigator.language, {
//     hour: 'numeric',
//     minute: 'numeric',
//     seconds: 'numeric',
//   }).format(now);
//   console.log(clock);
// }, 3000);
