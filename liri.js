require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const moment = require("moment");

let args = process.argv;
let command = process.argv[2];
let userInput = "";
let spotifySong = "";

for (let i = 3; i < args.length; i++) {
    spotifySong = spotifySong + args[i];
    if (i > 3 && i < args.length) {
        userInput = userInput + "+" + args[i];
    } else {
        userInput += args[i];
    }
}
switch(command){

    case "concert-this":

        let bandsUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
        console.log(bandsUrl);

        axios.get(bandsUrl).then(
            function(band) {
                console.log(band);
            })
            .catch(function(error) {
                if (error.band) {
                    throw error;
                }
            });
            break;

    case "movie-this":

        let omdbUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
        console.log(omdbUrl);

        axios.get(omdbUrl).then(
            function(movie) {
                console.log(movie.data.Title);
                console.log(movie.data.Year);
                console.log(movie.data.Ratings[0]);
                console.log(movie.data.Ratings[1]);
                console.log(movie.data.Country);
                console.log(movie.data.Language);
                console.log(movie.data.Plot);
                console.log(movie.data.Actors);
            })
            .catch(function(error) {
                if (error.movie) {
                    throw error;
                }
            });
            break;

    case "spotify-this-song":

        let spotify = new Spotify(keys.spotify);

            spotify.search({ type: 'track', query: spotifySong })
            .then(function(response) {
                console.log(response.tracks.items[0].album.artists[0].name);
                console.log(response.tracks.items[0].name);
                console.log(response.tracks.items[0].href);
                console.log(response.tracks.items[0].album.name);
            })
            .catch(function(err) {
                console.log(err);
            });
        }