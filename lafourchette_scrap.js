const request = require('request');

function stringJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function restaurantId(name,locality) {
    return new Promise((resolve, reject) => {
            name = name.replace(/é|è|ê/g, "e");
            request('https://m.lafourchette.com/api/restaurant-prediction?name=' + name, (err, resp, html) => {
                if (err) {
                    console.log("Error");
                    return resolve("Err");
                }
                else {
                    if (resp.statusCode == 400) {
                        return resolve("Not found");
                    }
                    else {
                        var json = JSON.parse(html);
                        var id = -1;
                        if(json[0]){
                        json.forEach(element => {
                            if(element.address.postal_code == locality){
                                console.log(element.name + " "+ element.address.postal_code+" : "+element.id);
                                id = element.id;
                            }
                        })
                    }
                       if (id != -1) {return resolve(id)}
                       else return resolve("Not found");
                    }
                }
            });
    })
}

function restaurantPromo(id) {
    return new Promise((resolve, reject) => {
        try {
            var promotion = [];
            request("https://m.lafourchette.com/api/restaurant/" + id + "/sale-type", (err, resp, html) => {
                if (err) {
                    return resolve("err");
                }
                try {
                    var json = JSON.parse(html);
                    json.forEach(element => {
                        if (element.is_special_offer) {
                            promotion.push(element);
                        }
                    });
                    console.log("Promotion found !")
                    return resolve(promotion);
                } catch (error) {
                    return resolve("Not found");
                }
            });
        }
        catch (error) {
            return reject(error);
        }
    })
}
module.exports.restaurantId = restaurantId;
module.exports.restaurantPromo  = restaurantPromo;