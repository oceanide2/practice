function makeStoreList(name, addr) {
  const li = document.createElement('li');
  const div_store_info = document.createElement('div');
  const div_store_name = document.createElement('div');
  const div_store_addr = document.createElement('div');

  li.classList.add('store');
  div_store_info.classList.add('store-info');
  div_store_name.classList.add('store-name');
  div_store_addr.classList.add('store-addr');

  div_store_name.innerHTML = name;
  div_store_addr.innerHTML = addr;

  div_store_info.appendChild(div_store_name);
  div_store_info.appendChild(div_store_addr);
  li.appendChild(div_store_info);

  return li;
}

function displayData(data) {
  const { list: stores, total } = data;

  const title = document.querySelector('.contents-title');
  title.innerHTML = `총 ${total}개의 패스트푸드점을 찾았습니다.`;

  const ul_stores = document.createElement('ul');
  ul_stores.classList.add('stores');

  stores.forEach((store) => {
    const list = makeStoreList(store.name, store.addr);
    ul_stores.appendChild(list);
  });

  const contents = document.querySelector('.contents');
  contents.appendChild(ul_stores);
}

function fetchData() {
  const url = 'http://floating-harbor-78336.herokuapp.com/fastfood';

  return fetch(url).then((rsp) => {
    if (rsp.status === 200) {
      return rsp.json();
    }
  });
}

async function getData() {
  try {
    const stores = await fetchData();
    displayData(stores);
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

function handleSearchButton() {
  getData();
}

function init() {
  const search_button = document.querySelector('.search-button');
  search_button.addEventListener('click', handleSearchButton);
}

init();
