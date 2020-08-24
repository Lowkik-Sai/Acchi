const {MessageEmbed} = require('discord.js');
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: 'remove',
    description: '',

    execute(client, message, args) {
      
        let member = message.mentions.members.first() || message.guild.members.cache.get((m) => m.name == args.join(" ") || m.id == args.join(" "));
        let ticketsys = db.fetch(`${message.guild.id}.ticketsys`);
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You need `Manage Channels` permission in order to execute this command!");
        if(!member) return message.channel.send("Mention a member next time!");
        if(!ticketsys) return message.channel.send("Run .config ticket before you execute this command!")
        if(!ticketsys.channels.includes(message.channel.id)) return message.channel.send("This isn't part of the ticket system!");

        message.channel.createOverwrite(member, {});

        let embed = new MessageEmbed();
        embed.setColor("GREEN");
        embed.setDescription(`Successfully changed permissions for ${member.toString()} and allowed them to view the channel, and send messages.`);
        return message.channel.send({embed});

    }
}