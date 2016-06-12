var Discordie = require("discordie");
var fs = require('fs');
var _ = require('underscore-node');
var d20 = {};
require('simple-jsdom').install();
var $ = jQuery = require('jquery');
eval(fs.readFileSync('roll20.js') + '');
var engine = d20.dice_engine();

var Events = Discordie.Events;

var client = new Discordie({autoReconnect: true});


var rollre = /\/((roll)|(r)|(gmroll)|(gr))[ ]+/i;

client.connect({
    token: ""
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    try {
        e.message.content = e.message.content.toLowerCase();
        if (e.message.content.indexOf("!help") > -1) {
            e.message.channel.sendMessage("Use /roll followed by normal roll20 stuff");
        } else if (rollre.test(e.message.content)) {
            handleRoll(e);
        }
    } catch (err) {
        e.message.channel.sendMessage("I'm sorry the roll didn't work");
    }
});

function handleRoll(t) {
    try {
        var origroll = t.message.content.replace(rollre, "");
        engine.process(origroll, function(results) {
            if (results.error) {
                t.message.channel.sendMessage("I'm sorry the roll didn't work");
                return;
            }
            t.message.channel.sendMessage(formatResults(origroll, results));
        });
    } catch (e) {
        t.message.channel.sendMessage("I'm sorry the roll didn't work");
    }
}

function formatResults(origroll, results) {

    var total = results.total;
    try {
        var how = (d20.dice_formatter.getHtmlForResult(results).formula.toString()).replace(/(&nbsp;|<([^>]+)>)/ig, "").replace("{", "").replace("}", "");
        var output = origroll + " : " + how + " = " + total;
        return output;
    } catch (e) {
        return "I'm sorry that roll didn't work";
    }
}
