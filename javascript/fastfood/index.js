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

  const ul_stores = document.querySelector('.stores');
  ul_stores.innerHTML = '';

  stores.forEach((store) => {
    const list = makeStoreList(store.name, store.addr);
    ul_stores.appendChild(list);
  });
}

function fetchData(url) {
  return fetch(url).then((rsp) => {
    if (rsp.status === 200) {
      return rsp.json();
    }
  });
}

async function searchStores(page = 1, perPage = 10, searchKeyword = '') {
  const url = new URL('http://floating-harbor-78336.herokuapp.com/fastfood');

  const params = { page, perPage, searchKeyword };
  Object.keys(params).forEach((key) => {
    return url.searchParams.append(key, params[key]);
  });

  try {
    const stores = await fetchData(url);
    displayData(stores);
    showPagination({ ...params, total: stores.total });
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

function handleSearchButton() {
  const searchKeyword = document.querySelector('.search-text').value;
  searchStores(1, 10, searchKeyword);
}

function showPagination(params) {
  const { page, perPage, searchKeyword, total } = params;

  const paging = document.querySelector('.paging');
  paging.innerHTML = '';

  const numPages = 5;
  const pageStart = Math.floor((page - 1) / numPages) * numPages + 1;
  let pageEnd = pageStart + numPages - 1;
  const totalPages = Math.floor((total - 1) / perPage) + 1;

  if (pageEnd > totalPages) {
    pageEnd = totalPages;
  }

  let prevPage = pageStart - 1;
  if (prevPage < 1) {
    prevPage = 1;
  }

  let nextPage = pageEnd + 1;
  if (nextPage > totalPages) {
    nextPage = totalPages;
  }

  prevElem = document.createElement('a');
  prevElem.innerHTML = '이전';
  prevElem.setAttribute('href', 'javascript:void(0);');
  prevElem.setAttribute(
    'onclick',
    `searchStores(${prevPage}, ${perPage}, '${searchKeyword}');`
  );
  prevElem.classList.add('prev');
  paging.appendChild(prevElem);

  for (let i = pageStart; i <= pageEnd; i++) {
    const elem = document.createElement('a');
    elem.innerHTML = `${i}`;
    elem.setAttribute('href', 'javascript:void(0);');
    elem.setAttribute(
      'onclick',
      `searchStores(${i}, ${perPage}, '${searchKeyword}');`
    );

    if (i === page) {
      elem.classList.add('active');
    }
    paging.appendChild(elem);
  }

  nextElem = document.createElement('a');
  nextElem.innerHTML = '다음';
  nextElem.setAttribute('href', 'javascript:void(0);');
  nextElem.setAttribute(
    'onclick',
    `searchStores(${nextPage}, ${perPage}, '${searchKeyword}');`
  );
  nextElem.classList.add('next');
  paging.appendChild(nextElem);
}

function handleEnterKey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    handleSearchButton();
  }
}

function init() {
  const search_button = document.querySelector('.search-button');
  search_button.addEventListener('click', handleSearchButton);

  const input_text = document.querySelector('.search-text');
  input_text.addEventListener('keydown', handleEnterKey);
}

init();
