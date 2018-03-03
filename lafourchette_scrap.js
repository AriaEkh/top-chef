const request = require('request');

function StringJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function restaurantId(name) {
    return new Promise((resolve, reject) => {
            name = name.replace(/é|è|ê/g, "e");
            request('https://m.lafourchette.com/api/restaurant-prediction?name=' + name, (err, resp, html) => {
                if (err) {
                    console.log("error");
                    return reject(err);
                }
                else {
                    if (resp.statusCode == 400) {
                        return resolve('NOT FOUND');
                    }
                    else {
                        var json = JSON.parse(html);
                        if (json[0] != null) {
                            var id = json[0].id;
                            console.log('Restaurant ' + name + ' id : ' + id);
                            return resolve(id);
                        }
                        else {
                            return resolve("NOT FOUND");
                        }
                    }
                }
            });
    })
}

function restaurantPromo(id) {
    return new Promise((resolve, reject) => {
        try {
            var promo = [];
            request("https://m.lafourchette.com/api/restaurant/" + id + "/sale-type", (err, resp, html) => {
                if (err) {
                    return reject(err);
                }
                console.log(id)
                try {
                    var json = JSON.parse(html);
                    json.forEach(element => {
                        if (element.is_special_offer) {
                            console.log("special offer");
                            promo.push(element);
                        }
                    });
                    return resolve(promo);
                } catch (error) {
                    return resolve("The promotion was not found");
                }
            });
        }
        catch (error) {
            return reject(error);
        }
    })
}
module.exports.restaurantId = restaurantId;
module.exports.restaurantPromo = restaurantPromo;