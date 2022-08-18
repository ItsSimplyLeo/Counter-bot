const { Tags } = require('../database/sqlite');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        Tags.create();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};