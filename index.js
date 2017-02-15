const reload = require('require-reload')(require);

const config = require('./config.json');
let cmd = require('./commandsHandler.js');

const discordJS = require('discord.js');
const bot = new discordJS.Client();

bot.on('ready', () => {
	console.log('Ready to play!');
});

bot.on('message', msg => {
	let raw = msg.content
			.substring(config.prefix.length, msg.length)
			.split(' ');
	let args = [];

	if(
		msg.author.id === bot.user.id ||
		!msg.content.startsWith(config.prefix) ||
		msg.content.length <= config.prefix
		) return;

	for(let i=1;i<raw.length;i++) 
		args.push(raw[i]);

	if(raw[0] == 'cmd-reload'){
		if(!config.owners.hasOwnProperty(msg.author.id))
			return msg.channel.sendMessage(`${msg.author}, You aren't the owner!`);

		msg.channel.sendMessage('Commands reloaded!');

		return cmd = reload('./commandsHandler.js');
	}
	
	cmd.requestCommand(msg, raw[0], args);
});

bot.login(config.token);