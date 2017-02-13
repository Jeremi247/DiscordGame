const discordJS = require('discord.js');
const bot = new discordJS.Client();
const config = require('./config.json');
const cmd = require('./commandsHandler.js');


bot.on('ready', () => {
	console.log('Ready to play!');
});

bot.on('message', msg => {
	if(
		msg.author.id === bot.user.id || 
		!msg.content.startsWith(config.prefix) ||
		msg.content.length <= config.prefix
		) return;

	let raw = msg.content
			.substring(config.prefix.length, msg.length)
            .split(' ');

	let args = [];
	for(let i=1;i<raw.length;i++) args.push(raw[i]);

	cmd.requestCommand(msg, raw[0], args);
})

bot.login(config.token);