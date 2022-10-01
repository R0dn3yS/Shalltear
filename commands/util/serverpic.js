module.exports = {
  name: 'serverpic',
  description: 'Returns the server picture',
  run: async (_client, message, _args) => {
    message.channel.send(await message.guild.iconURL());
  }
}