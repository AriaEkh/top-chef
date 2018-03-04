
const lafourchette = require('./lafourchette_scrap');
const fs = require('fs');
function Promotion() {
    return new Promise((resolve, reject) => {
        fs.readFile('./topchef/src/restaurants.json', function (err, data) {
            if (err) return reject(err);
            var resto = JSON.parse(data);
            var ids = []
            var requests = resto.map(restaurant => lafourchette.getId(restaurant.name,restaurant.locality,5));
            Promise.all(requests)
                .then(result => {
                    ids = result;
                    for (let i = 0; i < resto.length; i++) {
                        var element = resto[i];
                        element.id = ids[i];
                    }
                    var promise = resto.map(restaurant => lafourchette.getPromo(restaurant.id));
                    Promise.all(promise)
                        .then(result => {
                            for (let i = 0; i < resto.length; i++) {
                                var element = resto[i];
                                element.promo = result[i];
                            }
                            var file = './topchef/src/resturants.json';
                            fs.writeFile(file, JSON.stringify(resto), function (err) {
                                return resolve(file);
                            })
                        })
                })
                .catch(error => {return reject(error)});
        });
    })
}


module.exports.Promotion = Promotion;