const Discord = require('discord.js');
const db = new (require("quick.db").table)("guilds");
const dbadwords = require("../../Assets/badwords.json");

module.exports = {
    name: "badwords",
    description: 'set bad word filter on or off',

    execute(client, message, args){

        let status = db.fetch(`${message.guild.id}.badwords`);
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have enough perms to execute this command!");

        let embed = new Discord.MessageEmbed();
        embed.setTitle(`Bad word Configuration for ${message.guild.name}`);
        embed.addField("Enabled", status.enabled || "Non-existant");
        embed.addField("Words", status.set != undefined ? typeof status.set == "string" ? dbadwords.map((str) => `\`${str}\``).join(", ") : status.set.map((str) => `\`${str}\``).join(", ") : "None");
        return message.channel.send({embed: embed});

    }
}