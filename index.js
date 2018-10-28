const fs = require("fs");
const getJSON = require("json-get");
var config = require("./config.json");

var token = "" //ENTER TOKEN HERE;
var domain = "api.vk.com";
var version = "5.87";

setInterval(function () {
    getJSON({
        hostname: domain,
        path: getMethodURL("users.get", "user_ids=" + config.userid+"&fields=status"),
        method: 'GET'
    }, function (err, data) {
        if (err) return console.log(err);
        if (data.response[0].hasOwnProperty("status_audio")) {
            fs.writeFile("./sound.info.txt", data.response[0].status_audio.artist + " - " + data.response[0].status_audio.title, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }else {
            fs.writeFile("./sound.info.txt", "", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
}, 10000);

function getMethodURL(methodName, query) {
    return "/method/" + methodName + "?" + query + "&access_token=" + token + "&v=" + version;
}