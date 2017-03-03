const config = require('../json/config.json');
const session = require('./sessionHandler.js');
const misc = require('./miscCommands.js');
const debug = require('../debug/debugCommands.js');
const playersSettings = require('../containers/playersSettings.js');


exports.requestCommand = (msg, cmd, args) => {
	let sessionName = getPlayerSessionName(msg, args);

	cmd = cmd.toLowerCase();
	session.init(msg);

	switch(cmd){
		case 'create': session.createNew(msg, sessionName); break;
		case 'start' : session.begin(msg, sessionName); break;
		case 'join': session.join(msg, sessionName); break;
		case 'leave': session.leave(msg, sessionName); break;
		case 'kick': session.kick(msg, args, sessionName); break;
		case 'harvest': misc.eggplant(msg, args); break;
		case 'remember': misc.remember(msg, args); break;
		case 'disableprefix': misc.disablePrefix(msg, args); break;
		case 'enableprefix': misc.enablePrefix(msg, args); break;
		case 'help': misc.help(msg); break;
		case 'eval': debug.eval(msg, args); break;
		case 'check': debug.checkGame(msg); break;
		default: console.log(
			'Someone send an unknown command: "'
			+ cmd + ' ' + args.join(' ') + '"');
	}

	function getPlayerSessionName(msg, args){
		if(playersSettings.hasSavedName(msg.author.id)){
			return playersSettings.getName(msg.author.id);
		}
		else{
			return args;
		}
	}
};

module.exports = exports;