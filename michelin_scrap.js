const express = require('express');
const fs      = require('fs');
const app     = express();
const request = require('request');
const cheerio = require('cheerio');
const json    = [];
const i       = 1;

function restaurants(i){

    if (i > 36){
        fs.writeFile('restaurants.json', JSON.stringify(json), function (err) {
            if (err) throw err;
            console.log('Information saved in restaurant.json');
        });
        return json;
    }
    url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i;
    console.log(url);
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('[attr-gtm-type = poi]').each(function(i, elem){
                
            var data = $(elem);
                var resto = {nom: "", prix: "", offre: "", genre: ""};
                resto.offre = data.find('.mtpb2c-offers').text();
                resto.nom = data.attr("attr-gtm-title");
                resto.genre = data.find('.poi_card-display-cuisines').text();
                resto.prix = data.find('.poi_card-display-price').text();
                json.push(resto)
            });
        }
        else{
            console.log("error")
        }

        i++;
        restaurants(i)
    });
}

restaurants(i);

module.exports = restaurants;