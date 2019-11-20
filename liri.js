require("dotenv").config();
const keys = require("./keys.js");
// const spotify = new spotify(keys.spotify);
const axios = require("axios");

let args = process.argv;
let command = process.argv[2];
let userInput = "";

for (let i = 3; i < args.length; i++) {

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
        }