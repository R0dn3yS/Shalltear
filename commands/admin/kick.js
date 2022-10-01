const { EmbedBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
  name: 'kick',
  description: 'Kicks a user',
  run: async (client, message, args) => {
    args.shift();

    const kUser = message.mentions.users.first();
    const kMember = message.mentions.members.first();
    const reason = args.join(' ');
    const adminLog = message.guild.channels.resolve('535389016338464771');

    if (!kMember) {
      return message.reply('No user specified.');
    } else if (!reason) {
      return message.reply('Please provide a reason.');
    }

    kMember.kick(reason).catch((e) => {
      console.error(e);
      return message.reply('I cannot kick this user');
    });

    const embed = new EmbedBuilder()
      .setTitle('Member kicked')
      .setThumbnail(kUser.displayAvatarURL())
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setColor('#FF0000')
      .setTimestamp()
      .setDescription(stripIndents`**> Kicked member:** ${kUser}
      **> Kicked by:** ${message.member}
      **> Reason:** ${reason}`);

      return adminLog.send({ embeds: [embed] });
  }
}