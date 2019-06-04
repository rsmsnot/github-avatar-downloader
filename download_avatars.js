var request = require('request');
var secrets = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

    // var object = JSON.parse();
    // console.log(object);


    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': secrets.GITHUB_TOKEN
        }

    };

    request(options, function(err, res, body) {
        cb(err, body); //callback is technically getContributors
    });


}

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    // console.log("Result:", result);
    var object = JSON.parse(result);

    for (let person of object) {
        console.log(person.avatar_url);

    }
});