const { Discord, Client, Collection } = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Client();
const fs = require('fs');

client.once("ready", () => {
  console.log("I'm ready!")
});

client.on("ready", () => {
  console.log(
    "Bot: Hosting " +
      `${client.users.cache.size}` +
      " users, in " +
      `${client.channels.cache.size}` +
      " channels of " +
      `${client.guilds.cache.size}` +
      " guilds."
  );
  
  const activities = [
    `${client.users.cache.size} users!`,
    `${client.guilds.cache.size} servers!`,
    `${client.channels.cache.size} channels!`,
    `over my developers!`,
    `discord.js`,
    `youtube with my developers!`,
    `animes with my developers!`
    ]
  
  let i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING'}), 30000);
  
  });

client.commands = new Collection();
client.aliases = new Collection();
client.category = fs.readdirSync("./commands");
client.config = require("./config.json");
client.snipes = new Collection();
client.badWords = new Collection();
client.spam = Object.defineProperties(new Object(),{
    link: {
        value: new Map(),
        writable: true
    },
    emoji: {
        value: new Map(),
        writable: true
    },
    cap: {
        value: new Map(),
        writable: true
    }
});


["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix))
return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.execute(client, message, args);
});

client.login(token);