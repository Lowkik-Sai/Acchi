const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js')
const Discord = require('discord.js');

module.exports = {
    name: "addcoins",
    description: "Add coins to users",

    async execute(client, message, args) {
        
        let user = message.mentions.users.first();
        if(!user) user = isNaN(args[0]) ? undefined : await client.users.fetch(args[0]).catch((e) => undefined);
        if (!client.config.ownerIDs.includes(message.author.id)) return message.channel.send(`Bot Developers only!`).catch(console.error);
        if(!user || isNaN(args[1])) return syntax(client, message);
        db.add(`${user.id}.money`, Number(args[1]));
        return message.channel.send(`Successfully added ${args[1]} coins to ${user.username}'s balance`).catch(console.error);

    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Addcoins Help - c!addcoins`);
    embed.setDescription(`**Description:** Adds coins to users!
    **Usage**: ${client.config.prefix}addrole {user} {amount} 
    **Example**: 
    ${client.config.prefix}addcoins ${client.user.toString()} 3423423 \n c!addcoins ${client.user.toString()} 3425`);
    return message.channel.send({embed: embed}).catch(console.error);

}
