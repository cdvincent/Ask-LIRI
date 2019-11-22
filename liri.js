require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const moment = require("moment");
const fs = require("fs");

let args = process.argv;
let command = process.argv[2];
let userInput = "";

for (let i = 3; i < args.length; i++) {
    if (i > 3 && i < args.length){
    userInput = userInput + "+" + args[i]
    } else {
        userInput +=args[i];
    }
}
if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            throw error;
        } else{
        userInput = data.split(", ")
        command = userInput[0];
        userInput = userInput[1].split(" ").join("+");
        console.log(command);
        console.log(userInput);
    }
    commandCase();
    });
}
function commandCase () {

    console.log(command);
    switch(command){
        case "concert-this":

            let bandsUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

            axios.get(bandsUrl).then(
                function(band) {
                    console.log("Band/Artist: " + userInput.split("+").join(" "));
                    if (!band.data[0]) {
                        console.log("No event dates found");
                    }else {
                    console.log("Venue: " + band.data[0].venue.name);
                    console.log("City: " + band.data[0].venue.city);
                    console.log("Date: " + moment(band.data[0].datetime).format("MM-DD-YYYY"));
                     }
                })
                .catch(function(error) {
                    if (error.band) {
                        throw error;
                    }
                });
                break;
                
                case "movie-this":
                    
                    if (userInput === "") {
                        userInput = "Mr Nobody";
                    }
                    let = omdbUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
                    
                    axios.get(omdbUrl).then(
                        function(movie) {
                            console.log("Title: " + movie.data.Title);
                            console.log("Release Year: " + movie.data.Year);
                            console.log(movie.data.Ratings[0].Source + " rating: " + movie.data.Ratings[0].Value);
                            console.log(movie.data.Ratings[1].Source + " rating: " + movie.data.Ratings[1].Value);
                            console.log("Country: " + movie.data.Country);
                            console.log("Language: " + movie.data.Language);
                            console.log("Plot: " + movie.data.Plot);
                            console.log("Actors: " + movie.data.Actors);
                        })
                        .catch(function(error) {
                    if (error.movie) {
                        throw error;
                    }
                });
                break;
                
        case "spotify-this":
        console.log(userInput);
        let songName = "";

            songArray = userInput.split("+");
            for (let i = 0; i < songArray.length; i++)
                if (i > 0 && i < songArray.length){
                    songName = songName + " " + songArray[i];
                }else {
                    songName += songArray[i];
                }
            console.log(songName);
            
            let spotify = new Spotify(keys.spotify);

                spotify.search({ type: 'track', query: songName })
                .then(function(response) {
                    console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
                    console.log("Song: " + response.tracks.items[0].name);
                    console.log("Preview link: " + response.tracks.items[0].href);
                    console.log("Album: " + response.tracks.items[0].album.name);
                })
                .catch(function(error) {
                    if (error) {
                        throw error;
                    }
                })
                break;
            }
        }        
        commandCase();