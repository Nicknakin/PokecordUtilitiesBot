var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
let csv = require('./list.csv');
let interval;
let counter = 0;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });

logger.level = 'debug';

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', (evt) => {
    logger.info('Logged in as', bot.username, bot.id);
});

bot.on('message', (user, userID, channelID, message, evt) => {
    if(message.substring(0,2) == "s!"){
        let cmd = message.substring(2).split(' ');
    }
    if(user == "Pokécord"){
        //Assume I figure out how to get the text, call it list
        let list = "";
        list = list.split('\n');
        for(let i = 0; i < list.length; i++){
            list[i] = list[i].split('|');
            list[1] = list[1].substring(7);
            list[2] = list[2].substring(8);
        }
        let newList = "";
        for(entry in list){
            for(item in entry){
                list += item;
            }
            list += '\n';
            fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
                if (err) {
                    console.error(`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
                } else {
                    writeMyData(newList);
                }
            });
        }
            
    }
});
