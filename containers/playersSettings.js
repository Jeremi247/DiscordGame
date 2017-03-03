let playersSettings = {};

exports.hasSavedName = (author) => {
	if(!playersSettings.hasOwnProperty(author)){
		return false;
	}
	if(!playersSettings[author].sessionName){
		return false;
	}
	return true;
}

exports.getName = (author) => {
	return playersSettings[author].sessionName;
}

exports.setName = (msg, author, newName) => {
	playerHasSettings(msg.author.id);
	if(!newName){
		return msg.channel.sendMessage('You have to provide a name: `GC: remember [name]`');
	}
	playersSettings[author].sessionName = newName;
	msg.channel.sendMessage('New name remembered: ' + newName);
}

exports.disablePrefix = (msg) => {
	playerHasSettings(msg.author.id);

	playersSettings[msg.author.id].hasPrefixDisabled = true;
}

exports.enablePrefix = (msg) => {
	playerHasSettings(msg.author.id);
	
	playersSettings[msg.author.id].hasPrefixDisabled = false;
}

exports.hasPrefixDisabled = (msg) => {
	playerHasSettings(msg.author.id);
	
	if(playersSettings[msg.author.id].hasPrefixDisabled){
		return playersSettings[msg.author.id].hasPrefixDisabled;
	}
	else{
		return false;
	}
}

function playerHasSettings(author){
	if(!playersSettings.hasOwnProperty(author)){
		playersSettings[author] = {};
	}
}

module.exports = exports;