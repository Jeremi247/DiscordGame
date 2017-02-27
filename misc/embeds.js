const icons = require('./icons.json');

exports.status = (msg, stats) => {
	let hp = '';
	let mp = '';

	for(let i = 0; stats.hp > i;i++)
		hp += icons.heart;

	for(let i = 0; stats.mp > i;i++)
		mp += icons.mana;

	return {
		author: {
			name: `${msg.member.displayName} Lv. ${stats.level} [${stats.exp}/${stats.expreq}]`,
			icon_url: msg.author.displayAvatarURL
		},
		fields:[
			{
				name: 'Stats',
				//sshhh U see nothing :P
				value: `${hp}\n${mp}\n[${icons.coin}](https://www.youtube.com/watch?v=Gu8A8uWAJaA)${stats.coins}`
			}
		]
	};
};
