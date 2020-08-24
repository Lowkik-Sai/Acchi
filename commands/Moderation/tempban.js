const {MessageEmbed} = require('discord.js');
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: 'tempban',
    description: 'Temporarily bans user from the user for 7 days',

    execute(client, message, args) {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("...")
        if(!member) return syntax(client, message);
        member.ban({
            reason: args.slice(1).join(' ') || "Not Specified",
        }).then((gm) => {
            db.push(`${message.guild.id}.softbans`,{
                userID: member.user.id,
                reason: args.slice(1).join(' ') || "Not Specified",
                date: Date.now()*604800000
            })
            return message.channel.send({embed: new MessageEmbed().setColor(`GREEN`).setDescription(`${gm.user.username} has been banned.\n Reason: ${args.join(' ') || "Not Specified"}`)});
        });
        
    }
}

function syntax(client, message){

    let embed = new MessageEmbed();
    embed.setTitle(`Softban Help - c!softban`);
    embed.setDescription(`**Description:** Temporarily bans the user from the guild for the specified time!
    **Usage**: ${client.config.prefix}tempban {user} {reason} 
    **Example**: 
    ${client.config.prefix}tempban ${client.user.toString()} They made me do it`);
    return message.channel.send({embed: embed})

}
