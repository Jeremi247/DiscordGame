const config = require('../json/config.json');
const cmd = require('./commandsHandler.js');
const playersSettings = require('../containers/playersSettings.js')
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
	if(!playersSettings.hasPrefixDisabled(msg)){
		return msg.content.substring(config.prefix.length, msg.length).split(' ');
	}
	else { 
		return msg.content.split(' ');
	}
}

function isMessageInvalid(msg, bot, config){
		return msg.author.id === bot.user.id ||
		(!msg.content.startsWith(config.prefix) &&
		!playersSettings.hasPrefixDisabled(msg)) ||
		msg.content.length <= config.prefix;
}

module.exports = exports;