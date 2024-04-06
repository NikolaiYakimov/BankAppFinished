'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2024-03-28T14:11:59.604Z',
    '2024-03-30T17:01:17.194Z',
    '2024-04-02T23:36:17.929Z',
    '2024-04-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDayPassed = function (day1, day2) {
    return Math.round(Math.abs((day2 - day1) / (1000 * 60 * 60 * 24)));
  };
  const dayPassed = calcDayPassed(new Date(), date);
  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};
const formatCurrency = function (value, locale, currencys) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencys,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const timeFunction = function () {
    const min = String(Math.floor(timer / 60)).padStart(2, 0);
    const seconds = String(timer % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${seconds}`;

    //When 0 seconds,stop the timer and log out
    if (timer === 0) {
      clearInterval(interval);
      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
    }
    //Decrese 1s
    timer--;
  };

  let timer = 300;
  timeFunction();
  const interval = setInterval(timeFunction, 1000);
  return interval;
};
///////////////////////////////////////
// Event handlers
let currentAccount, timer;

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
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date

    // const local = navigator.language;
    // console.log(local);
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = ` ${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Check for a previous timer
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
    //reset the timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

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
