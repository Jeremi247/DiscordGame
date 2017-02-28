const config = require('./json/config.json');
const cmd = require('./modules/commandsHandler.js');

const discordJS = require('discord.js');
const bot = new discordJS.Client();
const messageHandler = require('./modules/messageEventHandler.js');

messageHandler.setBot(bot);

bot.on('ready', () => {
	console.log('Ready to play!');
});

bot.on('message', messageHandler.init);

bot.login(config.token);