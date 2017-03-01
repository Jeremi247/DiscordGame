const icons = require('../json/icons.json');
const config = require('../json/config.json');
const session = require('./sessionHandler.js');
const debug = require('../debug/debugCommands.js');

exports.requestCommand = (msg, cmd, args) => {
	cmd = cmd.toLowerCase();
	session.init(msg);

	switch(cmd){
		case 'create': session.createNew(msg, args); break;
		case 'start' : session.begin(msg, args); break;
		case 'join': session.join(msg, args); break;
		case 'leave': session.leave(msg, args); break;
		case 'repeat': repeat(msg, args); break;
		case 'eval': debug.eval(msg, args); break;
		case 'check': debug.checkGame(msg); break;
		default: console.log(
			'Someone send an unknown command: "'
			+ msg + ' ' + args.join(' ') + '"');
	}
};

function repeat(msg, args){
	msg.channel.sendMessage(args.join(' '));
}

function eggplant(msg){
	msg.channel.sendMessage(icons.eggplant);
}

module.exports = exports;