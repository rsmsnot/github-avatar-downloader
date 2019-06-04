var request = require('request');
var secrets = require('./secrets.js')
var fs = require('fs');
var args = process.argv.slice(2)
console.log(args);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

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
if (args[0] && args[1]) {
    getRepoContributors("jquery", "jquery", function(err, result) {
        console.log("Errors:", err);
        // console.log("Result:", result);
        var object = JSON.parse(result);

        for (let person of object) {
            downloadImageByURL(person.avatar_url, "./avatars/" + person.login + ".jpg")
            console.log("Downloading... " + person.login);
        }
    });
} else {
    console.log("No arguments supplied")
}

function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('error', function(err) {
            throw err;
        })
        .pipe(fs.createWriteStream(filePath))
}