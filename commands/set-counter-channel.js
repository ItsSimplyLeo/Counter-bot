const { SlashCommandBuilder } = require('discord.js');
const { Tags } = require('../database/sqlite')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-counter-channel")
        .setDescription("Set the channel to watch the counting")
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription("The channel to watch")
                .setRequired(true)),

    async execute(interaction) {
        const guildId = interaction.guildId;
        const channel = interaction.options.getChannel('channel');
        const channelId = channel.id;
        
        const tag = await Tags.findOne({ where: { guildId: guildId } });

        if (tag == null) {
            await Tags.create({
				guildId: guildId,
				channelId: channelId,
			});
        } else {
            await Tags.update( { channelId: channelId }, { where: { guildId: guildId } });
        }

        const updated = await Tags.findOne({ where: { guildId: guildId } });
        await interaction.reply(`Channel has been set to ${updated.channelId}`);
    }
}