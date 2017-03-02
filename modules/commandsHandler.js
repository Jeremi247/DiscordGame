const config = require('../json/config.json');
const session = require('./sessionHandler.js');
const misc = require('./miscCommands.js');
const debug = require('../debug/debugCommands.js');
const names = require('../containers/rememberedNames.js');


exports.requestCommand = (msg, cmd, args) => {
	let sessionName = getSessionName(msg, args);

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
		case 'help': misc.help(msg); break;
		case 'eval': debug.eval(msg, args); break;
		case 'check': debug.checkGame(msg); break;
		default: console.log(
			'Someone send an unknown command: "'
			+ msg + ' ' + args.join(' ') + '"');
	}

	function getSessionName(msg, args){
		if(names.hasSavedName(msg.author.id)){
			return names.getName(msg.author.id);
		}
		else{
			return args;
		}
	}
};

module.exports = exports;