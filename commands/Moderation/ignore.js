const Discord = require('discord.js');
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: 'ignore',
    description: 'ignore all commands from general members',
    
    execute(client, message, args) {
      
        let ignoreThis = message.mentions.roles.first() || message.mentions.channels.first();
        let current = db.get(ignoreThis instanceof Discord.Role ? `${message.guild.id}.ignoredRoles` : `${message.guild.id}.ignoredChannels`);
        if(!ignoreThis) return syntax(client, message);
        if(current != undefined){
            if(current.some((ID) => ID == ignoreThis.id)) return message.channel.send(`${ignoreThis} is already being ignored!`);
        }
        db.push(ignoreThis instanceof Discord.Role ? `${message.guild.id}.ignoredRoles` : `${message.guild.id}.ignoredChannels`, ignoreThis.id);
        return message.channel.send(`Now ignoring ${ignoreThis}`);

    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Ignore Help - c!ignore`);
    embed.setDescription(`**Description:** Clear warnings from a user from a server!
    **Usage**: ${client.config.prefix}ignore {channel}
    **Example**: 
    ${client.config.prefix}ignore ${message.guild.channels.cache.first().toString()}!`);
    return message.channel.send({embed: embed})

}
