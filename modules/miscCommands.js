const icons = require('../json/icons.json');
const names = require('../containers/rememberedNames.js');

exports.eggplant = (msg) => {
	msg.channel.sendMessage(icons.eggplant);
}

exports.remember = (msg, args) => {
	let sessionName = args.join(' ');

	if(!args){
		return msg.channel.sendMessage('You must provide a name you want to save');
	}

	names.setName(msg, msg.author.id, args);
}

exports.help = (msg) => {
	let embed = {
		color: 0x00ccff,
		fields: [
			{name: 'WELCOME TO THE GAME', value: 'Remember that all commands needs to be writen with `GC: ` prefix'},
			{name: 'remember [name]', value: 'using this command will remember the name and you will not have to provide it again'},
			{name: 'create [name]', value: 'allows you to create a new game session'},
			{name: 'join [name]', value: 'join the selected game. Remember that you can not join the game in progress'},
			{name: 'leave [name]', value: 'leave the game'},
			{name: 'kick [@user] [name]', value: 'kicks the player from the game'},
			{name: 'start [name]', value: 'lets you start the game you just created'},
			{name: 'harvest', value: '._.'}
		]
	};

	msg.channel.sendEmbed(embed);
}

module.exports = exports;