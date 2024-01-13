// const fetch = require("node-fetch");
fetch('http://localhost/API/Api.php', {
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => response.json())
  .then(data => {
    // Process the received data
    console.log(data.expected_output);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });
