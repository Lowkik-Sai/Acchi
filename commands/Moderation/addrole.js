const Discord = require('discord.js');

module.exports = {
    name: "addrole",
    execute(client, message, args) {

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find((r) => r.name == args.slice(1).join(" "));
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have enough perms to execute this command!");
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I need `Manage Roles` permission in order to execute this command!');
        if(!member) return syntax(client, message);
        if(!role) return syntax(client, message);
        if(!role.editable) return message.channel.send('I cannot manage that role!');
        if(member.roles.cache.has(role.id)) return message.channel.send("I cannot add a role to the user if they already have it, try choosing a different role!");

        member.roles.add(role);
        return message.channel.send({embed: new Discord.MessageEmbed().setColor(`GREEN`).setDescription(`Successfully added ${role} to ${member.user.username}`)});
        
    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Addrole Help - c!addrole`);
    embed.setDescription(`**Description:** Adds a role to the specific member mentioned!
    **Usage**: ${client.config.prefix}addrole {user} {role} 
    **Example**: 
    ${client.config.prefix}addrole ${client.user.toString()} ${message.guild.roles.cache.random().toString()} \n c!addrole ${client.user.toString()} 723613778763317262\n c!addrole ${client.user.toString()} bob`);
    return message.channel.send({embed: embed})

}
