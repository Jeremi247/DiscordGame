let game = Session();

exports.begin = (msg, args) => {
	if(game.isBeingPrepared){
		msg.channel.sendMessage('Sorry can\'t do. Session in progress.');
	}
	else if(args[0] === 'new' && !args[1].isNaN){
		startPreparingGame(msg, args[1]);
	}
	else{
		msg.channel.sendMessage(
			'Niepoprawna komenda.\n'+
			'Komenda to: `GC: start new {ilość graczy}`'
		);
	}
};

function startPreparingGame(msg, maxPlayers){
	msg.channel.sendMessage('Przygotowywanie sesji...');
	game.maxPlayers = maxPlayers;
	game.isBeingPrepared = true;
	exports.join(msg, true);
}

function startSession(msg){
	msg.channel.sendMessage('Sesja rozpoczęta!');
}

exports.leave = (msg) => {
	if(!canLeave(msg)){
		return;
	}

	game.playersJoined--;
	msg.channel.sendMessage('Player ' + msg.author + ' left the session.');

	if(game.playersJoined == 0){
		msg.channel.sendMessage('The game has been disbanded');
		game.isBeingPrepared = false;
		game.players = {};
		return;
	}

	msg.channel.sendMessage((game.maxPlayers - game.playersJoined) + ' more players required.');

	if(game.players[msg.author.id].master){
		game.players[Object.keys(game.players)[1]].master = true;
		msg.channel.sendMessage(`<@!${Object.keys(game.players)[1]}> is the new master`);
		delete game.players[msg.author.id];
		console.log(game.players[msg.author.id]);
	}
	else{
		delete game.players[msg.author.id];
	}

	function canLeave(msg){
		if(game.isInProgress){
			msg.channel.sendMessage('You can\' leave session in progress.');
			return false;
		}
		if(!game.players.hasOwnProperty(msg.author.id)){
			msg.channel.sendMessage('You are not in this session');
			return false;
		}
		if(!game.isBeingPrepared){
			msg.channel.sendMessage('There is no session that you can leave');
			return false;
		}
		return true;
	}
};

exports.join = (msg, master) => {
	if(!canJoin(msg)){
		return;
	}

	game.players[msg.author.id] = {master: master || false};
	game.playersJoined++;
	msg.channel.sendMessage('Player ' + msg.author + ' connected.');

	if(game.playersJoined >= game.maxPlayers){
		msg.channel.sendMessage('Session started');
		startSession(msg);
	}
	else
	{
		msg.channel.sendMessage((game.maxPlayers - game.playersJoined) + ' more players required.');
	}

	function canJoin(msg){
		if(!game.isBeingPrepared){
			msg.channel.sendMessage('Żadna sesja nie jest teraz tworzona');
			return false;
		}
		if(game.players.hasOwnProperty(msg.author.id)){
			msg.channel.sendMessage('Jesteś już w sesji');
			return false;
		}
		if(game.playersJoined >= game.maxPlayers){
			msg.channel.sendMessage('Sesja jest pełna');
			return false;
		}
		return true;
	}
};

function Session(){
	let ob = {};
	ob.isBeingPrepared = false;
	ob.isInProgress = false;
	ob.playersJoined = 0;
	ob.maxPlayers = 0;
	ob.players = {};

	return ob;
}

module.exports = exports;