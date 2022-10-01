module.exports = {
  name: 'ping',
  description: 'Returns latency and API ping',
  run: async (client, message, _args) => {
    const msg = await message.channel.send('Pinging...');

    msg.edit(`Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
  }
}