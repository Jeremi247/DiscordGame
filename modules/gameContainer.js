let game = {};

exports.getGame = () => {
	return game;
};

exports.setGame = (receivedGame) => {
	game = receivedGame;
};

module.exports = exports;