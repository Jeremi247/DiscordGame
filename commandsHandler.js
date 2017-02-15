const icons = require('./icons.json');
const config = require('./config.json');
const embeds = require('./embeds.js');
let isSessionInProgress = false;
let numberOfPlayers;

exports.requestCommand = (msg, cmd, args) => {
	cmd = cmd.toLowerCase();

	switch(cmd){
		case 'start': start(msg, args); break;
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

function start(msg, args){
	if(isSessionInProgress){
		msg.channel.sendMessage('Sorry can\'t do. Session in progress.');
	}
	else if(args[0] === 'new' && !args[1].isNaN()){
		prepareSession(msg, args[1]);
	}
	else{
		msg.channel.sendMessage(
			'Niepoprawna komenda.\n'+
			'Komenda to: `GC: start new {ilość graczy}`'
		);
	}
}

function prepareSession(msg, playersNum){
	msg.channel.sendMessage('Przygotowywanie sesji...').then(m => {

		startSession(m, msg, playersNum);
	});
}

function startSession(m, msg, args){
	m.edit('Sesja rozpoczęta!');
}
function ev(msg, args){
	if(!config.owners.hasOwnProperty(msg.author.id))
		return msg.channel.sendMessage(`${msg.author}, You aren't an owner!`);
	if(!args[0])
		return msg.channel.sendMessage(`${msg.author}, evel is empty!`);
	let output;
	let toEval = args.join(' ');
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
