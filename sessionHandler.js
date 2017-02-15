let isSessionInProgress = false;

exports.begin = (msg, args) => {
	if(isSessionInProgress){
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

function prepare(msg, playersNum){
	msg.channel.sendMessage('Przygotowywanie sesji...').then(m => {
		startSession(m, msg, playersNum);
	});
}

function startSession(m, msg, args){
	m.edit('Sesja rozpoczęta!');
}

module.exports = exports;