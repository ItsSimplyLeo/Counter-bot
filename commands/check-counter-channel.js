const { SlashCommandBuilder } = require('discord.js');
const { Tags } = require('../database/sqlite')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check-counter-channel")
        .setDescription("Check what channel the counter is watching"),

    async execute(interaction) {
        const guildId = interaction.guildId;
        const channel = interaction.options.getChannel('channel');
        
        const tag = await Tags.findOne({ where: { guildId: guildId } });

        if (tag != null) {
            await interaction.reply(`The current counter channel is: ${tag.channelId}`);
        } else {
            await interaction.reply(`There is currently no channel set.`);
        }
    }
}