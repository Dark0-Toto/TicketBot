const { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType } = require('discord.js');

const rowChannel = new ActionRowBuilder()
    .addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('selectChannel')
            .setMinValues(1)
            .setMaxValues(1)
            .addChannelTypes(ChannelType.GuildText)
            .setPlaceholder('Salon')
    )

module.exports = rowChannel