let rememberedNames = {};

exports.hasSavedName = (author) => {
	if(!rememberedNames.hasOwnProperty(author)){
		return false;
	}
	if(!rememberedNames[author].name){
		return false;
	}
	return true;
}

exports.getName = (author) => {
	return rememberedNames[author].name;
}

exports.setName = (msg, author, newName) => {
	if(!rememberedNames.hasOwnProperty(author)){
		rememberedNames[author] = {};
	}
	if(!newName){
		return msg.channel.sendMessage('You have to provide a name: `GC: remember [name]`');
	}
	rememberedNames[author].name = newName;
	msg.channel.sendMessage('New name remembered: ' + newName);
}

module.exports = exports;