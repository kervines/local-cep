const inputCep = document.querySelector('#input-cep');
const dataCep = document.querySelectorAll('[data-cep]');
const form = document.querySelector('.search');
const result = document.querySelector('.result');

const findCep = async (cep) => {
  const cepFetch = (await fetch(`http://viacep.com.br/ws/${cep}/json/`)).json();
  const dataCep = await cepFetch;
  return dataCep;
  // const { bairro, cep, complemento, ddd, localidade, logradouro, uf } = dataCep;
};

const handleCEP = (e) => {
  e.preventDefault();
  if (inputCep.value) {
    const apiCep = findCep(inputCep.value);
    apiCep
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
};

form.addEventListener('submit', handleCEP);
