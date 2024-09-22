const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const http = require('http');
const { PORT, DB_CONNECT } = require('./Config/user.config');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require('./Routes/user.route'));
app.use(require('./Routes/category.route'));
app.use(require('./Routes/product.route'));
app.use(require('./Routes/bill.route'));
app.use(require('./Routes/dashboard.route'));

(async () => {
    await connect(DB_CONNECT).then(() => { console.log("Successfuly connected to Data Base") }).catch((error) => {
        console.log('Error Connecting to Database :- ' + error)
    })

})()


app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`)
})

module.exports = app;





// https://soshace.com/implementing-role-based-access-control-in-a-node-js-application/

