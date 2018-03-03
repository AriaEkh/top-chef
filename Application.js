
const lafourchette = require('./lafourchette_scrap.js');
const fs = require('fs');
function Promotion() {
   
    fs.readFile('./topchef/src/restaurants.json', function (err, data) {
        var resto = JSON.parse(data);
     
        var ids = []
        var requests = resto.map(restaurant => lafourchette.restaurantId(restaurant.name));
        Promise.all(requests)
            .then(result => {
                ids = result;
                for (let i = 0; i < resto.length; i++) {
                    var element = resto[i];
                    element.id = ids[i];
                    console.log(element);
                }
                var promise = resto.map(restaurant => lafourchette.restaurantPromo(restaurant.id));
                Promise.all(promise)
                    .then(result => {
                        for (let i = 0; i < resto.length; i++) {
                            var element = resto[i];
                            element.promo = result[i];
                            console.log(element);
                        }
                        fs.writeFile('./topchef/src/restaurants.json', JSON.stringify(resto), function (err) {
                           console.log(DONE);
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
         
            .catch(error => console.log("ERROR" + error));
      

    });
}


module.exports.Promotion = Promotion;
