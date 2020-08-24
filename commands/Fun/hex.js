const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'hex',
    description: 'displays hex color of certain role',

    execute(client, message, args) {
    
        let role = message.mentions.roles.first() || message.guild.roles.cache.find((r) => new RegExp(`${args.join(" ")}.*`).test(r.name) || r.id == args[0]);
        if(!role) return syntax(client, message);
        let embed = new MessageEmbed();
        embed.setDescription(`${role.toString()}'s hex color is ${role.hexColor}`);
        return message.channel.send({embed});

    }
}

function syntax(client, message){

    let embed = new MessageEmbed();
    embed.setTitle(`Hex Help - c!hex`);
    embed.setDescription(`**Description:** Displays hex color of certain role
    **Usage**: ${client.config.prefix}hex {role} 
    **Example**: 
    ${client.config.prefix}hex ${message.guild.roles.cache.first().toString()}\n${client.config.prefix}hex ${message.guild.roles.cache.random().toString()}`);
    return message.channel.send({embed: embed})

}