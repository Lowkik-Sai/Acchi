const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'unban a user',

    async execute(client, message, args) {

        if(!message.member.hasPermission(["BAN_MEMBER", "ADMINISTRATOR"])) return message.channel.send("...")

        let user = message.mentions.users.first() || isNaN(args[0]) ? undefined : await client.users.fetch(args[0]).catch((e) => undefined);
        if(!user) return syntax(client, message);
    
        let reason = args.slice(1).join(" ")
        if(!reason) reason = "..."
    
        try {
            message.guild.members.unban(user.id, {reason: reason})
            message.channel.send({embed: new MessageEmbed().setDescription(`${user.username} has been unbanned`)});
        } catch(e) {
            message.channel.send(`Error: ${e}`)
        }
    }
}

function syntax(client, message){

    let embed = new MessageEmbed();
    embed.setTitle(`Unban Help - c!unban`);
    embed.setDescription(`**Description:** Unbans a user from the guild!
    **Usage**: ${client.config.prefix}unban {userID} 
    **Example**: 
    ${client.config.prefix}unban ${client.user.id} Time to rejoin!\n ${client.config.prefix}unban <@688256825069666395> Served his time!`);
    return message.channel.send({embed: embed})

}
