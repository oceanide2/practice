const root = 'http://jsonplaceholder.typicode.com';
let id = Math.floor(Math.random() * 20) + 1;
let uri = root + '/users/' + id;

// any user id higher than 10 will generate a 404 error
console.log('FETCH: ', uri);

function fetchUser() {
  return fetch(uri).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Invalid User ID');
    }
  });
}

function displayData(data) {
  let output = document.getElementById('output');
  output.textContent = JSON.stringify(data);
}

async function getData() {
  try {
    const data = await fetchUser();
    displayData(data);
  } catch (err) {
    console.log('ERROR: ', err);
  }
}
getData();
