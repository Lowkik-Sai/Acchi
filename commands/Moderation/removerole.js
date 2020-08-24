const Discord = require('discord.js');

module.exports = {
    name: "removerole",
    async execute(client, message, args) {

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find((r) => r.name == args.slice(1).join(" "));
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have enough perms to execute this command!");
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I need `Manage Roles` permission in order to execute this command!');
        if(!member || !role) return syntax(client, message);
        if(!role.editable) return message.channel.send('I cannot manage that role!');
        if(!member.roles.cache.has(role.id)) return message.channel.send("I cannot remove a role that the user doesn't have!");

        member.roles.remove(role);
        return message.channel.send({embed: new Discord.MessageEmbed().setColor(`GREEN`).setDescription(`Successfully removed ${role} from ${member.user.username}`)});
        
    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Removerole Help - c!removerole`);
    embed.setDescription(`**Description:** Removes a role from a member!
    **Usage**: ${client.config.prefix}removerole {user} {role}
    **Example**: 
    ${client.config.prefix}removerole ${client.user.toString()} ${message.guild.roles.cache.random().toString()}\n ${client.config.prefix}removerole ${client.user.toString()} 723613778763317262\n ${client.config.prefix}removerole ${client.user.toString()} dave`);
    return message.channel.send({embed: embed})

}
