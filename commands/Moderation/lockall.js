const {MessageEmbed} = require('discord.js');
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: 'lockdownall',
    description: 'lock all the channels in a server',

    execute(client, message, args) {
        
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need \`Manage Server\` permission in order to execute this command!`);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You need \`Manage Channel\` permission in order to execute this command!`);

        Promise.all(message.guild.channels.cache.filter((c) => c.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")).map(async (c) => {
            db.push(`${message.guild.id}.lockdownChannels`, c.id);
            return await c.overwritePermissions([{
                id: message.guild.roles.everyone,
                deny: ["SEND_MESSAGES"]
            }]);
        })).then((channels) => {
            let embed = new MessageEmbed();
            embed.setTitle(`Lockdown Successful`);
            embed.setColor(`#1da212`);
            embed.setDescription(`Locked down:\n${channels.map((c) => c.toString()).join('\n')}`);
            embed.setFooter(`Executed by ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send({embed: embed});
        }).catch((e) => {
           console.log(e);
           message.channel.send(e.message);
        });

    }
}

function syntax(client, message){

    let embed = new MessageEmbed();
    embed.setTitle(`Lockdownall Help - c!lockdownall`);
    embed.setDescription(`**Description:** Lock channels so users cannot type in them!
    **Usage**: ${client.config.prefix}lockdownall
    **Example**: 
    ${client.config.prefix}lockdownall`);
    return message.channel.send({embed: embed})

}
