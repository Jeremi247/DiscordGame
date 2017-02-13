const icons = require('./icons.json');

var isSessionInProgress = false;
var numberOfPlayers;

exports.requestCommand = (msg, cmd, args) => {
	cmd = cmd.toLowerCase();

	switch(cmd){
		case 'start' : start(msg,args); break;

		case 'repeat' : repeat(msg,args); break;

		case 'repeat' : repeat(msg,args); break;
		case 'harvest' : eggplant(msg,args); break;
		default : msg.channel.sendMessage('Command unknown');
	}
}

function repeat(msg, args){
	msg.channel.sendMessage(args.join(' '));
}

function eggplant(msg, args){
	msg.channel.sendMessage(icons.eggplant);
}

function start(msg,args){
	if(isSessionInProgress){
		msg.channel.sendMessage("Sorry can't do. Session in progress.");
	}
	else if(args[0] === 'new' && args[1] != NaN){
		prepareSession(msg,args[1]);
	}
	else{
		msg.channel.sendMessage("Niepoprawna komenda.\n"+
								"Komenda to: 'GC: start new {ilość graczy}'");
	}
}

function prepareSession(msg, playersNum){
	msg.channel.sendMessage("Przygotowywanie sesji...").then(m => {
		
		startSession(m,msg,args);
	});
}

function startSession(m,msg,args){
	m.edit("Sesja rozpoczęta!");
}

module.exports = exports;