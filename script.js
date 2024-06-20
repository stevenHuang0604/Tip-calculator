const billInput = document.querySelector('.cal__input--bill');
const peopleInput = document.querySelector('.cal__input--number');
const tipSelect = document.querySelector('.cal__select-container');
const tipSelectCustom = document.querySelector('.cal__select-item--custom');

const tipDisplay = document.querySelector('.display__amount--tip');
const totalDisplay = document.querySelector('.display__amount--total');

const resetBtn = document.querySelector('.display__reset');

const peopleError = document.querySelector('.cal__error');

let bill = 0.0,
  people = 0,
  tip = 0.0;

const calculator = (bill, tip, people) => {
  if (bill === 0 || tip === undefined || people === 0) return;

  const tipPerPerson = (bill * tip) / people / 100;
  const totalPerPerson = (bill * (1 + tip / 100)) / people;

  tipDisplay.textContent = Number.parseFloat(tipPerPerson).toFixed(2);
  totalDisplay.textContent = Number.parseFloat(totalPerPerson).toFixed(2);
};

billInput.addEventListener('input', function (e) {
  bill = +e.target.value;
  calculator(bill, tip, people);
});

peopleInput.addEventListener('input', function (e) {
  people = +peopleInput.value;
  if (people === 0) {
    peopleError.classList.remove('hidden');
    peopleInput.classList.add('cal__input--error');
  } else {
    peopleError.classList.add('hidden');
    peopleInput.classList.remove('cal__input--error');
  }

  calculator(bill, tip, people);
});

tipSelect.addEventListener('click', function (e) {
  if (e.target.classList.contains('cal__select-item')) {
    tip = +e.target.textContent.slice(0, -1);
  }

  calculator(bill, tip, people);
});

tipSelectCustom.addEventListener('input', function (e) {
  tip = +tipSelectCustom.value;

  calculator(bill, tip, people);
});

resetBtn.addEventListener('click', function (e) {
  bill = 0.0;
  people = 0;
  tip = 0.0;

  billInput.value = '';
  tipSelectCustom.value = '';
  peopleInput.value = '';

  tipDisplay.textContent = (0).toFixed(2);
  totalDisplay.textContent = (0).toFixed(2);
});
