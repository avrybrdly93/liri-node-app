const axios = require('axios');
const moment = require('moment');
let artist = process.argv[2];

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
        for(let i = 0; i < 10; i++) {
            //console.log(response.data);
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
    //error handling
    console.log(error);
}