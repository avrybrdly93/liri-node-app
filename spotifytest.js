var fs = require("fs");
const Spotify = require('node-spotify-api');
let userSearch = process.argv[2];
var spotify = new Spotify({
    id: "04570ba7399f49e9bc7a31d130564e7f",
    secret: "07fa52d603e14dd49848832278f2661e"
  });

function spotifyRequest(search) {
  spotify
    .request(`https://api.spotify.com/v1/search?query= ${search} &type=track&offset=20&limit=10`)
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
if(userSearch) {
  spotifyRequest(userSearch);
}
else {
  spotifyRequest("The sign - ace of base");
}
