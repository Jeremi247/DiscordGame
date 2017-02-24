let game = {};

exports.startNew = (msg, args) => {
	let sessionName = args.join(' ');

	if(!game[msg.guild.id]) game[msg.guild.id] = {};

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

function startPreparingGame(msg, args, sessionName){
	game[msg.guild.id][sessionName] = Session();
	let session = game[msg.guild.id][sessionName];

	msg.channel.sendMessage('Preparing session: ' + sessionName);

	exports.join(msg, args, true);
}

function startSession(msg){
	msg.channel.sendMessage('Session started!');
}

exports.leave = (msg, args) => {
	let sessionName = args.join(' ');
	let session;

	if(args) session = game[msg.guild.id][sessionName];

	if(!canLeave(msg)){
		return;
	}

	session.playersJoined--;
	msg.channel.sendMessage('Player ' + msg.author + ' left the session.');

	isSessionEmpty(msg);
	deletePlayer();

	game[msg.guild.id][sessionName] = session;


	function deletePlayer(){
		if(session.players[msg.author.id].master){
			session.players[Object.keys(session.players)[1]].master = true;
			msg.channel.sendMessage(`<@!${Object.keys(session.players)[1]}> is the new master`);
		}
		delete session.players[msg.author.id];
	}
	
	function isSessionEmpty(msg){
		if(session.playersJoined == 0){
			msg.channel.sendMessage('The game has been disbanded');
			delete game[msg.guild.id][sessionName];
			return;
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

	function canJoin(msg){
		if(!sessionName){
			msg.channel.sendMessage('You need to provide name of the session you want to leave');
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
		return true;
	}
};

function Session(){
	let ob = {};
	ob.isInProgress = false;
	ob.playersJoined = 0;
	ob.players = {};

	return ob;
}

module.exports = exports;