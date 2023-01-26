import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

populateMessageOutput();
refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.input.value === '' || refs.textarea.value === '') {
    return alert('всі поля повинні бути заповнені');
  }

  localStorage.removeItem('LOCALSTORAGE_KEY');
  evt.currentTarget.reset();
}

function onTextareaInput(e) {
  const objectToSave = {
    email: refs.input.value,
    message: refs.textarea.value,
  };
  localStorage.setItem('LOCALSTORAGE_KEY', JSON.stringify(objectToSave));
}

function populateMessageOutput(e) {
  const saveMessage = localStorage.getItem('LOCALSTORAGE_KEY');
  if (saveMessage) {
    const parsedSettings = JSON.parse(saveMessage);
    console.log('parsedSettings', parsedSettings);
    refs.input.value = parsedSettings.email;
    refs.textarea.value = parsedSettings.message;
  }
}
