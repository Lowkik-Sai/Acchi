const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js')
const Discord = require('discord.js');

module.exports = {
    name: "reset",
    description: "Clear all stored information inside the database for this particular user",

    async execute(client, message, args) {
        
        let user = message.mentions.users.first();
        if(!user) user = isNaN(args[0]) ? undefined : await client.users.fetch(args[0]).catch((e) => undefined);
        if(!client.config.ownerIDs.includes(message.author.id)) return message.channel.send(`Bot Developers only!`).catch(console.error);
        if(!user) return syntax(client, message);
        db.delete(user.id);
        return message.channel.send(`Successfully <:TickYellow:715595910289031281> resetted ${user.username}'s Economy `).catch(console.error);

    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Reset Help - .Reset`);
    embed.setDescription(`**Description:** Adds coins to users!
    **Usage**: ${client.config.prefix}reset {user} 
    **Example**: 
    ${client.config.prefix}wipeinventory ${client.user.toString()}`);
    return message.channel.send({embed: embed}).catch(console.error);

}