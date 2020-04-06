const root = 'http://jsonplaceholder.typicode.com';
let id = Math.floor(Math.random() * 20) + 1;
let uri = root + '/users/' + id;

// any user id higher than 10 will generate a 404 error
console.log('FETCH: ', uri);

fetch(uri)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Invalid user ID');
    }
  })
  .then(data => {
    console.log(data);
    let jsonData = JSON.stringify(data);
    console.log(data);
    let output = document.getElementById('output');
    output.textContent = jsonData;
  })
  .catch(err => {
    console.log('ERROR: ', err.message);
  });
