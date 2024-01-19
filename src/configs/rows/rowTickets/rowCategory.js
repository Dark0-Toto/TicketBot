const { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType } = require('discord.js');

const rowCategory = new ActionRowBuilder()
    .addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('selectCategory')
            .setMinValues(1)
            .setMaxValues(1)
            .addChannelTypes(ChannelType.GuildCategory)
            .setPlaceholder('Categorie')
    )

module.exports = rowCategory