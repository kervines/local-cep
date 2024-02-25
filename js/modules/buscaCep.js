const input = document.querySelector('#input-cep');
const ufs = document.querySelector('.estados');
const form = document.querySelector('.search');
const table = document.querySelector('.search-result table');

const handleCity = (e) => {
  e.preventDefault();
  const { city, district } = formatAddress(input.value);
  const uf = ufs.value;
  findAddress(uf, city, district);
};

const formatAddress = (address) => {
  const [city, district] = address.split(', ');
  return { city, district };
};

const findAddress = async (uf, city, district) => {
  const fetchApi = await fetch(
    `https://viacep.com.br/ws/${uf}/${city}/${district}/json/`
  );
  const data = await fetchApi.json();
  table.innerHTML = '';
  if (data.length) {
    data.forEach((item) => {
      const { cep, logradouro, bairro } = item;
      createTable(cep, logradouro, bairro);
    });
  } else {
    table.innerHTML = '<p class="invalid">Pesquisa inválida</p>';
  }
  return data;
};

const createTable = (cep, street, district) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td data-cep class="cep">${cep}</td>
  <td data-cep class="street">${street}</td>
  <td data-cep class="district">${district}</td>`;
  table.appendChild(tr);
};

form.addEventListener('submit', handleCity);
