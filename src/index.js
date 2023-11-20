// ./src/index.js
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

var xmlparser = require('express-xml-bodyparser');


// defining the Express app
const app = express();

//
app.use(xmlparser());

// defining an array to work as the database (temporary solution)
const ads = [
    { title: 'Hello, world (again)!' }
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});

app.post('/convertXML', (req, res) => {
    var result = req.body

    var arrData = []
    const datas = result.methodresponse.params[0].param[0].value[0].array[0].data[0].value
    datas.map(data => {
        const dataPerson = data.struct[0].member
        dataPerson.map(person => {

            return arrData.push({
                [person.name]: person.value[0]
            })
        })
    })
    var exportData=[]
    for (var i = 0; i < arrData.length; i += 6) {
        // console.log("Working with: " + arr.slice(i, i + 4));
        exportData.push(arrData.slice(i, i + 6))

    }
    res.send(exportData);
    // res.send(arrData);
});

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});