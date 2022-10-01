module.exports = {
  name: 'arch',
  description: 'Search archwiki',
  run: (_client, message, args) => {
    return message.channel.send('https://wiki.archlinux.org/index.php?search=' + args.join('+'));
  }
}