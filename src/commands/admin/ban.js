const { EmbedBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
  name: 'ban',
  description: 'Bans a user',
  run: async (client, message, args) => {
    if (!client.admins.includes(message.author.id)) return message.channel.send('You do not have permission for this command.');

    args.shift();

    const bUser = message.mentions.users.first();
    const bMember = message.mentions.members.first();
    const reason = args.join(' ');
    const adminLog = message.guild.channels.resolve('535389016338464771');

    if (!bMember) {
      return message.reply('No user specified.');
    } else if (!reason) {
      return message.reply('Please provide a reason.');
    }

    bMember.ban({ reason: reason }).catch((e) => {
      console.error(e);
      return message.reply('I cannot ban this user');
    });

    const embed = new EmbedBuilder()
      .setTitle('Member banned')
      .setThumbnail(bUser.displayAvatarURL())
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setColor('#FF0000')
      .setTimestamp()
      .setDescription(stripIndents`**> Banned member:** ${bUser}
      **> Banned by:** ${message.member}
      **> Reason:** ${reason}`);

      return adminLog.send({ embeds: [embed] });
  }
}
