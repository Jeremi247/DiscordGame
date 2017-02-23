let game = {};

exports.startNew = (msg, args) => {
	var sessionName = args.slice();
	sessionName.shift();
	sessionName = sessionName.join(' ');

	console.log(sessionName);
	console.log(args);

	if(!game[msg.guild.id]) game[msg.guild.id] = {};

	if(!args[0]){
		return msg.channel.sendMessage('Number of players is required');
	}

	if(game[msg.guild.id][sessionName]){
		msg.channel.sendMessage('Sorry can\'t do. This name is taken.');
	}
	else if(!args[0].isNaN && sessionName){
		startPreparingGame(msg, args, sessionName);
	}
	else{
		msg.channel.sendMessage(
			'Niepoprawna komenda.\n'+
			'Komenda to: `GC: start [ilość graczy] [nazwa sesji] {hasło}`'
		);
	}
};

function startPreparingGame(msg, args, sessionName){
	game[msg.guild.id][sessionName] = Session();
	let session = game[msg.guild.id][sessionName];

	msg.channel.sendMessage('Przygotowywanie sesji ' + sessionName);

	session.maxPlayers = args[0];

	if(args[2]){
		session.password = args[2];
	}
	args[0] = sessionName;

	args.shift();
	exports.join(msg, args, true);
}

function startSession(msg){
	msg.channel.sendMessage('Sesja rozpoczęta!');
}

exports.leave = (msg, args) => {
	var sessionName = args.join(' ');
	let session;

	if(args) session = game[msg.guild.id][sessionName];

	if(!canLeave(msg)){
		return;
	}

	session.playersJoined--;
	msg.channel.sendMessage('Player ' + msg.author + ' left the session.');

	if(session.playersJoined == 0){
		msg.channel.sendMessage('The game has been disbanded');
		delete game[msg.guild.id][sessionName];
		return;
	}

	msg.channel.sendMessage((session.maxPlayers - session.playersJoined) + ' more players required.');

	game[msg.guild.id][sessionName] = session;

	if(session.players[msg.author.id].master){
		session.players[Object.keys(session.players)[1]].master = true;
		msg.channel.sendMessage(`<@!${Object.keys(session.players)[1]}> is the new master`);
		delete session.players[msg.author.id];
	}
	else{
		delete session.players[msg.author.id];
	}

	function canLeave(msg){
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
	var sessionName = args.join(' ');
	let session = {};

	if(args) session = game[msg.guild.id][sessionName];

	if(!canJoin(msg)){
		return;
	}

	session.players[msg.author.id] = {master: master || false};
	session.playersJoined++;
	msg.channel.sendMessage('Player ' + msg.author + ' connected.');

	if(session.playersJoined >= session.maxPlayers){
		msg.channel.sendMessage('Session started');
		startSession(msg);
	}
	else
	{
		msg.channel.sendMessage((session.maxPlayers - session.playersJoined) + ' more players required.');
	}

	game[msg.guild.id][sessionName] = session;

	function canJoin(msg){
		if(!session){
			msg.channel.sendMessage('There is no session with this name');
			return false;
		}
		if(session.players.hasOwnProperty(msg.author.id)){
			msg.channel.sendMessage('You already are in this session');
			return false;
		}
		if(session.playersJoined >= session.maxPlayers){
			msg.channel.sendMessage('Session is full');
			return false;
		}
		return true;
	}
};

function Session(){
	let ob = {};
	ob.isInProgress = false;
	ob.playersJoined = 0;
	ob.maxPlayers = 0;
	ob.players = {};

	return ob;
}
module.exports = exports;