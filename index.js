const { ActivityType, Client, Collection, IntentsBitField, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
const { readdirSync } = require('fs');
const { stripIndents } = require('common-tags');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

dotenv.config()

const prefix = '\\';
let memberCount;
let countChannel;

const myIntents = new IntentsBitField();
myIntents.add(3276799);

const client = new Client({
  intents: myIntents,
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync('./commands/');
client.admins = ['325254775828512778', '708544768342229012', '245592600793317377'];

['command'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.once('ready', () => {
  console.log(`${client.user.username} is ready on ${client.guilds.cache.size} servers.`);

  client.user.setPresence({
    activities: [{
      name: 'over you',
      type: ActivityType.Watching,
    }],
  });

  countChannel = client.channels.resolve('947819208518008874');
  memberCount = countChannel.guild.memberCount;
  countChannel.edit({ name: `Members: ${memberCount}` });
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.channel.name === 'quotes') {
    const year = new Date().getFullYear().toString().substring(2);
    const QUOTE_REGEX = new RegExp(`"(.+)" - <@!?(\\d{17,19})> 2k${year}`);

    if (!QUOTE_REGEX.test(message.content)) {
      message.delete();
      const botMessage = await message.channel.send('This message is not a quote.');
      await delay(2500);
      botMessage.delete();
    }

    return;
  }

  if (message.content.startsWith('[') && message.content.endsWith(']')) {
    const digits = message.content.substring(1, message.content.length - 1);

    if (parseInt(digits).toString() === digits) {
      message.channel.send(`https://nhentai.net/g/${digits}`);
    }
    return;
  }
});

client.on('messageCreate', message => {
  if (message.content.includes(':3') || message.content.toLowerCase().includes('x3')) {
    message.channel.send({
      files: [{
        attachment: './furry.mp4',
        name: 'furry.mp4',
      }],
    });
  }

  if (message.author.id === '268401778251268137' && message.content.toLowerCase().includes('cnc')) {
    message.channel.send({
      files: [{
        attachment: './bonk.gif',
      }]
    });
  }

  if (message.author.id === '268401778251268137') {
    if (Math.ceil(Math.random() * 50) === 1) {
      message.channel.send(`"${message.content}" <:dubbie:1039928554760196196>`);
    }
  }
});

client.on('messageDelete', async (message) => {
  if (message.channel.name === 'quotes') return;
  if (message.content.length > 1000) return;

  const dLog = message.guild.channels.resolve('790787179663196191');

  const dEmbed = new EmbedBuilder()
    .setTitle('Deleted Message')
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setColor('#FFA500')
    .setDescription(stripIndents`**> User:** ${message.author}
    **> Deleted in:** ${message.channel}
    **> Message:** ${message.content}`)
    .setTimestamp()

  return dLog.send({ embeds: [dEmbed] });
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) return;
  if (oldMessage.length + newMessage.length > 1000) return;

  const eLog = oldMessage.guild.channels.resolve('790792385889566751');

  const eEmbed = new EmbedBuilder()
    .setTitle('Edited Message')
    .setThumbnail(oldMessage.author.displayAvatarURL())
    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setColor('#FFA500')
    .setDescription(stripIndents`**> User:** ${oldMessage.author}
    **> Edited in:** ${oldMessage.channel}
    **> Old message:** ${oldMessage.content}
    **> New message:** ${newMessage.content}`)
    .setTimestamp()

  return eLog.send({ embeds: [eEmbed] });
});

client.on('guildMemberAdd', async (member) => {
  memberCount += 1;
  countChannel.edit({ name: `Members: ${memberCount}` });

  member.roles.add('789192241087512687');
});

client.on('guildMemberRemove', async (_member) => {
  memberCount -= 1;
  countChannel.edit({ name: `Members: ${memberCount}` });
});

client.login(process.env.DISCORD_TOKEN);
