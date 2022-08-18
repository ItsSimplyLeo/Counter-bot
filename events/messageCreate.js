const { Tags } = require('../database/sqlite');

var count = 0;

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        const guildId = message.guild.id;
        const channelId = message.channel.id;

        const tag = await Tags.findOne({ where: { guildId: guildId } });

        if (tag == null) return;
        if (tag.channelId != channelId) return;

        const content = message.content;
        if (isNaN(content)) {
            await message.delete()
                .then(msg => console.log(`Deleted invalid text (${content}) from ${msg.author.username}`));
            return;
        }

        await message.channel.messages.fetch({limit: 2}).then(messageMappings => {
            let messages = Array.from(messageMappings.values());
            let previousMessage = messages[1];

            count = parseInt(previousMessage)
            var contentCount = parseInt(content);
            if (contentCount === count + 1) {
                count = contentCount;
            } else {
                message.delete().then(msg => console.log(`Deleted invalid text (${content}) from ${msg.author.username}`));
            }
        }).catch(error => Logger.log("error", "Error fetching messages in channel"))
	}
};