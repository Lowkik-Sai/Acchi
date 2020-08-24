const Discord = require('discord.js');
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: "close",
    aliases: ["c"],
    description: "Close a support ticket",
    async execute(client, message, args){

        let ticketsys = db.fetch(`${message.guild.id}.ticketsys`);
        if(ticketsys == undefined) return message.channel.send("Run ``.config ticket`` to setup the ticket system!");
        
        let channel = message.mentions.channels.first() || message.guild.channels.cache.find((c) => c.type == "text" && c.parentID == ticketsys.cat && [c.name, c.id].includes(args.join(" "))) || message.channel;
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I need \`Manage Channels\` permision in order to execute this command!");
        if(!channel) return message.channel.send("That is a invalid channel ID!");
	    if(!ticketsys.channels.includes(channel.id)) return message.channel.send("This channel is not part of the ticket system!")
        
        await channel.delete();
        message.channel.send(`${channel.name} deleted successfully!`).catch(() => undefined);

    }
}