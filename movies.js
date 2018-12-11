let movie = process.argv[2];

const axios = require('axios');

axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
    function(response) {
            //console.log(response.data);
            if(response.data){
                 console.log(`Title: ${response.data.Title}`);
                 console.log(`Year: ${response.data.Year}`);
                 console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
                 console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
                 console.log(`Year: ${response.data.Country}`);
                 console.log(`Plot: ${response.data.Plot}`);
                 console.log(`Language: ${response.data.Language}`);
                 console.log(`Actors: ${response.data.Actors}`);
            }
    }
)
.catch(function(err) {
    console.error('Error occurred: ' + err); 
  });