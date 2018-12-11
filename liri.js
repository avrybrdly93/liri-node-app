//required modules
require("dotenv").config();
const fs = require("fs");
const keys = require("./keys");
const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

//user input
let userCategory = process.argv[2];
let userQuery = process.argv[3];
let userCategorySelection = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"];

//main function of app
function userArg1(userCategory, userQuery) {
    switch(userCategory) {
        case userCategorySelection[0]:
            concertSearch(userQuery);
            break;
        case userCategorySelection[1]:
            spotifySearch(userQuery);
            break;
        case userCategorySelection[2]:
            movieSearch(userQuery);
            break;
    }
}
if(userCategory === userCategorySelection[3]) {
    doWhatItSays(userCategory, userQuery);
}

function concertSearch(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
        for(let i = 0; i < 10; i++) {
            if(response.data[i]){
                let region = response.data[i].venue.region || response.data[i].venue.country;
                let dateTime = moment(response.data[i].datetime.slice(0,10), "YYYY-MM-DD").format("MM-DD-YYYY");
                console.log(`Venue Name: ${response.data[i].venue.name}`);
                console.log(`Venue Location: ${response.data[i].venue.city}, ${region}`);
                console.log(`Venue Date: ${dateTime}`);
                console.log("\n--------------------------------------------------\n");
            }
        }
    }
),
    function(error) {
    console.log(error);
}
}
function spotifySearch(spotifyQuery) {
    function spotifyRequest(spotifyQuery) {
        spotify
          .request(`https://api.spotify.com/v1/search?query= ${spotifyQuery} &type=track&offset=20&limit=10`)
          .then(function(data) {
            for(let i = 0; i < 10; i++) {
              console.log(`Artist: ${data.tracks.items[i].album.artists[0].name}`); 
              console.log(`Song Name: ${data.tracks.items[i].name}`); 
              console.log(`Link: ${data.tracks.items[i].album.external_urls.spotify}`); 
              console.log(`Album Name: ${data.tracks.items[i].album.name}`); 
              console.log("\n--------------------------------------------------\n");
            }
          })
          .catch(function(err) {
            console.error('Error occurred: ' + err); 
          });
      }
      if(spotifyQuery) {
        spotifyRequest(spotifyQuery);
      }
      else {
        spotifyRequest("The sign - ace of base");
      }
}
function movieSearch(movie) {
    console.log("You have searched for a movie");
    function movieRequest(movie) {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
            function(response) {
                console.log(`Title: ${response.data.Title}`);
                console.log(`Year: ${response.data.Year}`);
                console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
                console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
                console.log(`Year: ${response.data.Country}`);
                console.log(`Plot: ${response.data.Plot}`);
                console.log(`Language: ${response.data.Language}`);
                console.log(`Actors: ${response.data.Actors}`);
                }
            ).catch(function(err) {
                console.error('Error occurred: ' + err); 
        });
    }
    if(movie) {
        movieRequest(movie);
    }
    else {
        movieRequest("Mr. Nobody");
    }
}

function doWhatItSays(category, search) {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");
        category = dataArr[0].trim();
        search = dataArr[1].trim();
        userArg1(category, search);
      });
}

userArg1(userCategory, userQuery);

