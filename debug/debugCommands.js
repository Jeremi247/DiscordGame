const gameController = require('../containers/gameContainer.js');
const names = require('../containers/playersSettings.js');
const config = require('../json/config.json');

exports.checkGame = (msg) => {
	let game = gameController.getGame();
	console.log(game[msg.guild.id]);
};

exports.eval = (msg, args) => {
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