const inputCep = document.querySelector('#input-cep');
const dataCep = document.querySelectorAll('[data-cep]');
const form = document.querySelector('.search');
const result = document.querySelector('.result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputCep.value) {
    const apiCep = fetch(`http://viacep.com.br/ws/${inputCep.value}/json/`);
    apiCep
      .then((resolve) => {
        return resolve.json();
      })
      .then((dados) => {
        dataCep.forEach((data) => {
          data.innerText = dados[data.id];
        });
        result.style.display = 'block';
      })
      .catch((reject) => {
        result.style.display = 'none';
        inputCep.value = '';
        alert('CEP Inválido');
      });
  }
});
