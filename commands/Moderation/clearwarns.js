const Discord = require('discord.js')
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: 'clearwarns',
    description: 'Clears all warnings for specific user',
    
    execute(client, message, args) {
     
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let current = db.get(message.guild.id).cases;
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need Manage Server permission in order to execute this command!`);
        if(!member) return syntax(client, message);
        db.set(`${message.guild.id}.cases`, current.filter((d) => d.ID != member.id));
        let embed = new Discord.MessageEmbed();
         embed.setDescription(`Successfully cleared all warnings from ${args.join(' ')}`);
         embed.setColor(`#f7c203`)
         embed.setFooter(`Executed by ${message.author.tag}`, message.author.displayAvatarURL());
         return message.channel.send({embed: embed});
    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Clearwarns Help - c!clearwarns`);
    embed.setDescription(`**Description:** Clear warnings from a user from a server!
    **Usage**: ${client.config.prefix}clearwarns {user}
    **Example**: 
    ${client.config.prefix}clearwarns ${client.user.toString()}`);
    return message.channel.send({embed: embed})

}
