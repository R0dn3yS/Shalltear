module.exports = {
  name: 'userpic',
  description: 'Returns the users picture',
  run: async (client, message, args) => {
    let user;

    if (args[0]) {
      user = message.mentions.users.first();
    } else {
      user = message.member.user;
    }

    message.channel.send(await user.displayAvatarURL());
  }
}