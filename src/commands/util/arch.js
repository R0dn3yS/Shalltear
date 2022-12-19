module.exports = {
  name: 'arch',
  description: 'Search archwiki',
  run: async (_client, message, args) => {
    const url = 'https://wiki.archlinux.org/index.php?search=' + args.join('+');
    const newUrl = await fetch(url).then(res => res.url);
    return message.channel.send(newUrl);
  }
}