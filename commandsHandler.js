const icons = require('./icons.json');
const config = require('./config.json');
const embeds = require('./embeds.js');
const session = require('./sessionHandler');

let numberOfPlayers;

exports.requestCommand = (msg, cmd, args) => {
	cmd = cmd.toLowerCase();

	switch(cmd){
		case 'start': session.begin(msg, args); break;
		case 'repeat': repeat(msg, args); break;
		case 'eval': ev(msg, args); break;
		case 'harvest': eggplant(msg, args); break;
		//default: msg.channel.sendMessage('Command unknown');
		//Nie powinno sie zwracac bledu :P
	}
};

function repeat(msg, args){
	msg.channel.sendMessage(args.join(' '));
}

function eggplant(msg){
	msg.channel.sendMessage(icons.eggplant);
}

function ev(msg, args){
	let output;
	let toEval = args.join(' ');

	if(!config.owners.hasOwnProperty(msg.author.id))
		return msg.channel.sendMessage(`${msg.author}, You aren't an owner!`);

	if(!args[0])
		return msg.channel.sendMessage(`${msg.author}, evel is empty!`);

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