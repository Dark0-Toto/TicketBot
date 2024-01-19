const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const {embedTicketOpen} = require('../../configs/embeds/embedTicketOpen');
const {openTicket} = require('../../configs/buttons/Buttons');
const {embed2} = require('../../configs/embeds/embedTicket');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Cree un ticket')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const req = await interaction.client.db.selectone('tickets', 'guildId', interaction.guild.id);
        embed2.setDescription(`Envoie de l'embed du ticket...`)
        if (req.length < 1) {
            const msg = await interaction.reply({embeds: [embed2], ephemeral: true});
            setTimeout(async() => {
                embed2.setDescription(`Embed de ticket envoyé !`);
                await msg.edit({ embeds: [embed2]});
                await interaction.channel.send({ embeds: [embedTicketOpen], components: [openTicket] });
            }, 2000);
        } else {
            const channel = interaction.guild.channels.cache.get(req[0].channel);
            await channel.send({ embeds: [embedTicketOpen], components: [openTicket] });
            return await interaction.reply({ content: `**Message envoyé dans ${channel}**`, ephemeral: true});
        }
    }
}