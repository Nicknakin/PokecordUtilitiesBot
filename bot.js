var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
<<<<<<< HEAD
=======
const fs = require('fs');
let csv = require('csv-file-creator');
>>>>>>> 5fa184552d5ef9562be003268334c13c371e37a8
let continuousMsg = "";
let interval;
let counter = 0;
let recording = false;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });

logger.level = 'debug';

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', (evt) => {
    console.log(`Logged in as ${bot.username} : ${bot.id}`);
});

bot.on('message', (user, userID, channelID, message, evt) => {
    if(message.substring(0,2) == "s!"){
        let cmd = message.substring(2).split(' ');
        if(cmd[0] == "start"){
            recording = true;
            bot.sendMessage({
                    to: evt.d.channel_id,
                    message: "Started recording"
            });
        }
        if(cmd[0] == "end" || cmd[0] == "send"){
            bot.sendMessage({
                    to: evt.d.channel_id,
                    message: continuousMsg
            });
            console.log(continuousMsg);
            recording = false;
            continuousMsg = "Pokémon,Level,Number,IV,Nickname\n";
        }
    } 
});

bot.on('any', (evt) => {
    let author = (evt.d && evt.d.author)? evt.d.author: {username: ""};
    let username = (author.username)? author.username: "";
    let embeds = (evt.d && evt.d.embeds)? evt.d.embeds: "";
    if(recording && embeds && username == "Pokécord" && embeds[0].title && embeds[0].title == "Your pokémon:"){
        let msg = (embeds[0].description);
        let list = msg.split('\n');
        for(let i = 0; i < list.length; i++){
            list[i] = list[i].split('|');
            list[i][0] = list[i][0].replace('*', '');
            list[i][0] = list[i][0].replace('*', '');
            list[i][0] = list[i][0].replace('*', '');
            list[i][0] = list[i][0].replace('*', '');
            list[i][1] = list[i][1].substring(8);
            list[i][2] = list[i][2].substring(9);
            list[i][3] = list[i][3].substring(5);
            if(list[i][4]){
                list[i][4] = list[i][4].substring(10);
            }
        }
        let newList = "";
        for(entry of list){
            for(item of entry){
                newList += item.replace(' ', '') + ',';
            }
            newList = newList.substring(0, newList.length-1) + '\n'; 
        }
        continuousMsg += newList;
    }
});
