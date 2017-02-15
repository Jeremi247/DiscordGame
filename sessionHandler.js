let game = Session();

exports.begin = (msg, args) => {
	if(game.isSessionInProgress){
		msg.channel.sendMessage('Sorry can\'t do. Session in progress.');
	}
	else if(args[0] === 'new' && !args[1].isNaN){
		prepare(msg, args[1]);
	}
	else{
		msg.channel.sendMessage(
			'Niepoprawna komenda.\n'+
			'Komenda to: `GC: start new {ilość graczy}`'
		);
	}
}

function prepare(msg, maxPlayers){
	msg.channel.sendMessage('Przygotowywanie sesji...').then(m => {
		console.log(game);
		game.maxPlayers = maxPlayers;
		game.isSessionInProgress = true;

		//startSession(m, msg, maxPlayers);
	});
}

function startSession(msg){
	msg.channel.sendMessage('Sesja rozpoczęta!');
}

exports.join = (msg, args) => {
	if(!game.isSessionInProgress){
		return msg.channel.sendMessage("Żadna sesja nie jest teraz tworzona");
	}
	if(!game.players.indexOf(msg.author.id)){
		return msg.channel.sendMessage("Jesteś już w sesji");
	}
	if(game.playersJoined >= game.maxPlayers){
		return msg.channel.sendMessage("Sesja jest pełna");
	}

	game.players[game.playersJoined] = msg.author.id;
	game.playersJoined++;
	msg.channel.sendMessage("Connected")
	console.log(game.playersJoined +" "+ game.maxPlayers)

	if(game.playersJoined >= game.maxPlayers){
		msg.channel.sendMessage("Session started")
		startSession(msg);
	}
}

function Session(){
	let ob = {};
	ob.isSessionInProgress = false;
	ob.playersJoined = 0;
	ob.maxPlayers = 0;
	ob.players = [];

	return ob
}
/*function Session(){
	this.isSessionInProgress = false;
	this.playersJoined = 0;
	this.maxPlayers = 0;
	this.players = [];

	let object = this;
}*/
module.exports = exports;