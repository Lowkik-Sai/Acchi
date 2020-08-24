const Discord = require('discord.js')
const db = new (require("quick.db").table)("guilds"); 

module.exports = {
    name: 'warns',
    description: 'Displays all warnings for specific user',
    
    execute(client, message, args) {
     
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
	if(db.get(`${message.guild.id}.cases`) == undefined) db.set(`${message.guild.id}.cases`,[]);
        let warns = db.fetch(`${message.guild.id}.cases`).some((d) => d.ID == member.id) == false ? "There are no warnings for this user" : db.fetch(`${message.guild.id}.cases`).find((d) => d.ID == member.id).cases.map((w, i) => `Warn #${w.caseN}\nReason: ${w.reason}\n`).join('\n')
        let embed = new Discord.MessageEmbed();
        embed.setTitle(`Warns <:Warning:725127934071013418> for ${member.user.tag}`)
        embed.setDescription(warns);
        embed.setColor("#f7c203")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        return message.channel.send({embed: embed});

    }
}