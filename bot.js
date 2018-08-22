var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

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
    logger.info('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', (user, userID, channelID, message, evt) => {
  if(message.substring(0,2) == "s!"){
    let cmd = message.substring(2).split(' ');
  }
  if(user == "Pokécord"){
    console.log(user, "\n", userID, "\n", channelID, "\n", message, evt);
  }
});
