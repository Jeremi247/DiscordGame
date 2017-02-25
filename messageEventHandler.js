const config = require('./config.json');
const cmd = require('./commandsHandler.js');
let localBot;

exports.init = function(msg){
	if(isMessageInvalid(msg, localBot, config)) 
		return;

	let argumentsArray = getArgumentsArray(msg, config);
	let command = argumentsArray.shift();
	cmd.requestCommand(msg, command, argumentsArray);
}

exports.setBot = function(bot){
	localBot = bot;
}

function getArgumentsArray(msg, config){
	return msg.content.substring(config.prefix.length, msg.length).split(' ');
}

function isMessageInvalid(msg, bot, config){
		return msg.author.id === bot.user.id ||
		!msg.content.startsWith(config.prefix) ||
		msg.content.length <= config.prefix;
}

module.exports = exports;