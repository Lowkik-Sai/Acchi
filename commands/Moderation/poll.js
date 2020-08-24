const Discord = require('discord.js')
const db = new (require("quick.db").table)("guilds");
const ms = require('ms');

module.exports = {
    name: 'poll',
    description: 'polling events',

    async execute (client, message, args) {

        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have the ``Manage Guild`` perms to execute this command...");

        message.channel.send(`What should the poll message be?`);

        let pollMsgRespColl = await message.channel.awaitMessages((m) => m.author.id == message.author.id,{
            max: 1,
            time: 20000,
            errors: ["time"]
        });
        pollMsgRespColl.first().delete();

        message.channel.send(`How long should this poll last?`);

        let durationRespColl = await message.channel.awaitMessages((m) => m.author.id == message.author.id && ms(m.content),{
            max: 1,
            time: 20000,
            errors: ["time"]
        });
        durationRespColl.first().delete();

        let embed = new Discord.MessageEmbed();
        embed.setTitle(`Poll`);
        embed.setColor(`RANDOM`);
        embed.setFooter(`Poll set by ${message.author.username}`)
        .setTimestamp()
        embed.setDescription(pollMsgRespColl.first().content);
        let msg = await message.channel.send({embed: embed});
        await msg.react("726083968457244702");
        await msg.react("726083912232861779");

        return db.push(`${message.guild.id}.polls`,{
            msgID: msg.id,
            host: message.author.id,
            channel: message.channel.id,
            endDate: Date.now()*ms(durationRespColl.first().content),
            removeReactions: false
        });

        // return message.channel.send(`Poll Operation is successful <:TickGreen:715595196032745643>`);

    }
}

async function getChannel(message){

    let result = null;
    let resp = await message.channel.awaitMessages((m) => m.author.id == message.author.id && /<#[0-9]{18}>/.test(m.content),{
        max: 1,
        time: 20000,
        errors: ["time"]
    });
    if(resp.first().mentions.channels.first()){
        result = resp.first().mentions.channels.first();
    } else {
        result = await getChannel(message);
        return message.channel.send(`Please mention a valid channel!`);
    }
    return result;

}