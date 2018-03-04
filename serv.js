
const express = require('express');       
const app = express();                
const bodyParser = require('body-parser');
const scrap = require('./Application.js');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;       
var router = express.Router();             

router.get('/', function (req, res) {
    res.json({ message: 'Welcome !' });
});

router.route('/restaurants')
    .get((req, res) => {
        scrap.LOAD_PROMO()
            .then(file => {
                fs.readFile(file, "utf8", (err, data) => {
                    data = JSON.parse(data);
                    data = data.sort((a, b) => {
                        return b.stars - a.stars
                    });
                    res.json(data);
                })
            })
            .catch(err => {
                console.log(err + "Try again : ");
                scrap.LOAD_PROMO(); 
            });
    }
)
app.use('/api', router);

app.listen(port);
console.log('Port: ' + port);