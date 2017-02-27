const icons = require('../json/icons.json');
const config = require('../json/config.json');
//const embeds = require('../misc/embeds.js');
const session = require('./sessionHandler');

exports.requestCommand = (msg, cmd, args) => {
	cmd = cmd.toLowerCase();

	switch(cmd){
		case 'create': session.startNew(msg, args); break;
		case 'join': session.join(msg, args); break;
		case 'leave': session.leave(msg, args); break;
		case 'repeat': repeat(msg, args); break;
		case 'eval': debugEval(msg, args); break;
		case 'harvest': eggplant(msg, args); break;
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

function debugEval(msg, args){
	let output;
	let toEval = args.join(' ');

	if(!config.owners.hasOwnProperty(msg.author.id))
		return msg.channel.sendMessage(`${msg.author}, You are not the owner!`);

	if(!args[0])
		return msg.channel.sendMessage(`${msg.author}, eval is empty!`);

	try {
		output = String(eval(toEval));
	}
	catch(err) {
		output = String(err);
	}
	finally {
		let embed = {
			color: 0xe24848,
			author: {
				name: msg.member.displayName,
				icon_url: msg.author.displayAvatarURL
			},
			fields: [
				{name: 'Input', value: toEval},
				{name: 'Output', value: output},
			]
		};
		msg.channel.sendEmbed(embed);
	}
}

module.exports = exports;