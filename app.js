const express = require('express')
const signIn = require('./routes/user_route');
const userContracts = require('./routes/userContracts');
const deployContract = require('./deploy_contract');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/sign', signIn);
app.get('/contracts', userContracts);
app.post('/deploy', deployContract);

app.listen(port, (error) => {
    if (error == null) {
      console.log("Server started at Port No: ");
      console.log(port);
    }
});