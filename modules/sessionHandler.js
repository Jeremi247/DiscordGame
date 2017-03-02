const gameController = require('./gameContainer.js');
let game = gameController.getGame();

exports.init = (msg) =>{
	if(!game[msg.guild.id]){
		game[msg.guild.id] = {};
		updateGameContainer(game);
	}
};

exports.createNew = (msg, args) => {
	updateGameObject();
	let sessionName = args.join(' ');

	if(game[msg.guild.id][sessionName]){
		msg.channel.sendMessage('Sorry can\'t do. This name is taken.');
	}
	else if(sessionName){
		startPreparingGame(msg, args, sessionName);
	}
	else{
		msg.channel.sendMessage(
			'Improper command.\n'+
			'Command should look like: `GC: create [name]`'
		);
	}
};

exports.begin = (msg, args) => {
	updateGameObject();
	let sessionName = args.join(' ');

	if(!canBegin(msg, sessionName)){
		return;
	};

	msg.channel.sendMessage(msg.author + ' has started the game');
	game[msg.guild.id][sessionName].isInProgress = true;	

	updateGameContainer(game);

	

	function canBegin(msg, sessionName){
		if(!sessionName){
			msg.channel.sendMessage('You need to provide name of the session you want to start');
			return false;
		}
		if(game[msg.guild.id][sessionName].players[msg.author.id].master != true){
			msg.channel.sendMessage('You are not the session owner');
			return false;
		}
		return true;
	}
};

exports.leave = (msg, args) => {
	updateGameObject();
	let sessionName = args.join(' ');
	let session;

	if(args){
		session = game[msg.guild.id][sessionName];
	}

	if(!canLeave(msg)){
		return;
	}

	session.playersJoined--;
	msg.channel.sendMessage('Player ' + msg.author + ' left the session.');

	deletePlayer(msg, session, sessionName);

	updateGameContainer(game);

	function deletePlayer(msg, session, sessionName){
		if(session.playersJoined == 0){
			msg.channel.sendMessage('The game has been disbanded');
			delete game[msg.guild.id][sessionName];
		}
		else if(session.players[msg.author.id].master){
			session.players[Object.keys(session.players)[1]].master = true;
			msg.channel.sendMessage(`<@!${Object.keys(session.players)[1]}> is the new master`);
			delete session.players[msg.author.id];
			game[msg.guild.id][sessionName] = session;
		}
		else{
			delete session.players[msg.author.id];
			game[msg.guild.id][sessionName] = session;
		}
	}

	function canLeave(msg){
		if(!sessionName){
			msg.channel.sendMessage('You need to provide name of the session you want to leave');
			return false;
		}
		if(!session){
			msg.channel.sendMessage('There is no session with this name');
			return false;
		}
		if(!session.players.hasOwnProperty(msg.author.id)){
			msg.channel.sendMessage('You are not in this session');
			return false;
		}
		return true;
	}
};

exports.join = (msg, args, master) => {
	updateGameObject();
	let sessionName = args.join(' ');
	let session;

	if(args) session = game[msg.guild.id][sessionName];

	if(!canJoin(msg)){
		return;
	}

	session.players[msg.author.id] = {master: master || false};
	session.playersJoined++;
	msg.channel.sendMessage('Player ' + msg.author + ' connected.');

	game[msg.guild.id][sessionName] = session;

	updateGameContainer(game);

	function canJoin(msg){
		if(!sessionName){
			msg.channel.sendMessage('You need to provide name of the session you want to join');
			return false;
		}
		if(!session){
			msg.channel.sendMessage('There is no session with this name');
			return false;
		}
		if(session.players.hasOwnProperty(msg.author.id)){
			msg.channel.sendMessage('You already are in this session');
			return false;
		}
		if(session.isInProgress){
			msg.channel.sendMessage('You can not join the session that is in progress');
			return false;
		}
		return true;
	}
};

exports.kick = (msg, args) => {
	updateGameObject();
	let userToKick = args.shift();
	userToKick = translateUserName(userToKick);

	let sessionName = args.join(' ');
	let session;

	if(args) session = game[msg.guild.id][sessionName];

	if(!canBeKicked(msg, userToKick, sessionName)){
		return;
	}

	msg.author.id = userToKick;
	exports.leave(msg, args);

	function translateUserName(userName){
		return userName.substring(3,userName.length-1);
	}
	function canBeKicked(msg, userToKick, sessionName){
		if(!sessionName){
			msg.channel.sendMessage('You need to provide name of the session `GC: kick [player] [name]`');
			return false;
		}
		if(!session){
			msg.channel.sendMessage('There is no session with this name');
			return false;
		}
		if(game[msg.guild.id][sessionName].players[msg.author.id].master == false){
			msg.channel.sendMessage('You are not game master');
			return false;
		}
		if(!game[msg.guild.id][sessionName].players.hasOwnProperty(userToKick)){
			msg.channel.sendMessage('This user is not in this session');
			return false;
		}
		return true;
	}
}

function startPreparingGame(msg, args, sessionName){
	game[msg.guild.id][sessionName] = Session();
	let session = game[msg.guild.id][sessionName];

	msg.channel.sendMessage('Preparing session: ' + sessionName);

	exports.join(msg, args, true);
}

function Session(){
	let ob = {};
	ob.isInProgress = false;
	ob.playersJoined = 0;
	ob.players = {};

	return ob;
}

function updateGameContainer(game){
	gameController.setGame(game);
}

function updateGameObject(){
	game = gameController.getGame();
}

module.exports = exports;