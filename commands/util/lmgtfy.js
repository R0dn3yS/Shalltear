module.exports = {
  name: 'lmgtfy',
  description: 'Let me google that for you',
  run: (_client, message, args) => {
    return message.channel.send('https://lmgtfy.app/?q=' + args.join('+'));
  }
}