const {SlashCommandBuilder} = require('discord.js');
const {embed4} = require('../../configs/embeds/embedTicket');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('Claim your ticket')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .setNSFW(false),
    async execute(interaction) {
        setTimeout(async() => {
            await interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
                SendMessages: false,
                ReadMessageHistory: true,
            }),
            await interaction.channel.permissionOverwrites.edit(interaction.guild.members.cache.get(interaction.channel.topic).id, {
                SendMessages: true,
                ReadMessageHistory: true,
                ViewChannel: true
            })

            embed4.setDescription(`Le ticket a bien ete claim par ${interaction.user}`);
            interaction.channel.send({embeds: [embed4]})
        }, 2000);

        embed4.setDescription('Vous avez bien recupére le ticket !');
        await interaction.reply({embeds: [embed4], ephemeral: true});
    }
}