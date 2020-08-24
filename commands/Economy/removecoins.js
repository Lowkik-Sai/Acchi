const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js')
const Discord = require('discord.js');

module.exports = {
    name: "removecoins",
    description: "Add coins to users",

    async execute(client, message, args) {
        
        let user = message.mentions.users.first();
        if(!user) user = isNaN(args[0]) ? undefined : await client.users.fetch(args[0]).catch((e) => undefined);
        if (!client.config.ownerIDs.includes(message.author.id)) return message.channel.send(`<:xtempl:726203462781501481> Bot Developers only!`).catch(console.error);
        if(!user || isNaN(args[1])) return syntax(client, message);
        db.subtract(`${user.id}.money`, Number(args[1]));
        return message.channel.send(`Successfully <:TickYellow:715595910289031281> removed ${args[1]} coins to ${user.username}'s balance`).catch(console.error);

    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Removecoins Help - .removecoins`);
    embed.setDescription(`**Description:** remove coins from users!
    **Usage**: ${client.config.prefix}removecoins {user} {amount} 
    **Example**: 
    ${client.config.prefix}removecoins ${client.user.toString()} 3423423 \n .removecoins ${client.user.toString()} 3425`);
    return message.channel.send({embed: embed}).catch(console.error);

}