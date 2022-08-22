const { Tags } = require('../database/sqlite');
const { ActivityType } = require('discord.js')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        Tags.create();
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('you count.', {type: ActivityType.Watching})
	},
};