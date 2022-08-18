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

module.exports = { Tags }