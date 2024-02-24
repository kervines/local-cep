const inputCep = document.querySelector('#input-cep');
const dataCep = document.querySelectorAll('[data-cep]');
const form = document.querySelector('.search');
const table = document.querySelector('.result table');
const result = document.querySelector('.result ');

// consulta por nome
// const teste = fetch(
//   'https://viacep.com.br/ws/CE/maracanau/rua vinte e seis/json/'
// );
// teste.then((res) => res.json()).then((data) => console.log(data));

const findCep = async (cep) => {
  const cepFetch = (await fetch(`http://viacep.com.br/ws/${cep}/json/`)).json();
  const dataCep = await cepFetch;
  return dataCep;
};

const formatCEP = (number) => {
  const regexp = /(\d{2})(\d{3})(\d{3})/g;
  const patter = '$1.$2-$3';
  return number.replace(regexp, patter);
};

const msgReject = (cep, mensagem) => {
  const div = document.createElement('div');
  div.classList.add('invalid');
  div.innerHTML = `<p>${formatCEP(cep)} - ${mensagem}.</p>`;
  result.appendChild(div);
  inputCep.value = '';
  setTimeout(() => {
    result.removeChild(div);
  }, 2500);
};

const handleCEP = (e) => {
  e.preventDefault();
  if (inputCep.value) {
    const apiCep = findCep(inputCep.value);
    apiCep
      .then((dados) => {
        if (dados.erro !== 'true') {
          dataCep.forEach((data) => {
            data.innerText = dados[data.id];
          });
          inputCep.value = '';
          table.style.display = 'block';
        } else {
          table.style.display = 'none';
          msgReject(inputCep.value, 'Cep Não Encontrado');
        }
      })
      .catch((reject) => {
        if (reject) {
          console.error('Erro na requisição');
          table.style.display = 'none';
          msgReject(inputCep.value, 'Cep Inválido');
        }
      });
  }
};

form.addEventListener('submit', handleCEP);
