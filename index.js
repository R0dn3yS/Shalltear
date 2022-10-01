const { ActivityType, Client, Collection, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv');
const { readdirSync } = require('fs');

dotenv.config()

const prefix = '\\';

const myIntents = new IntentsBitField();
myIntents.add(3276799);

const client = new Client({
  intents: myIntents,
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync('./commands/');

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
  })
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

client.login(process.env.DISCORD_TOKEN);
