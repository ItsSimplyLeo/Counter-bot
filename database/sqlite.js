// Require Sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('counters', {
	guildId: {
		type: Sequelize.STRING,
		unique: true,
	},
	channelId: {
        type: Sequelize.STRING,
        defaultValue: 0
    }
});

const trackedGuilds = []

async function getGuild(guildId) {

	if (trackedGuilds[guildId] != null) return trackedGuilds[guildId]

	const tag = await Tags.findOne({ where: { guildId: guildId } });

	if (tag == null) {
		return null;
	}

	trackedGuilds[guildId] = tag.channelId;
	return trackedGuilds[guildId];
}

module.exports = { Tags, getGuild }