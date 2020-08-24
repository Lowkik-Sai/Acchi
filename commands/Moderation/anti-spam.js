const Discord = require('discord.js');
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: "anti-spam",
    description: "configuration for the server",
    async execute (client, message, args) {

        let settings = db.get("702604965343920168.antispam")
        let embed = new Discord.MessageEmbed();
        embed.setAuthor(`Anti Spam Settings for ${message.guild.name}`, message.guild.iconURL());
        embed.addField("Links", `
Spam Interval ${settings.links == undefined ? "None" : settings.links.interval || "None"}
Max Spam ${settings.links == undefined ? "None" : settings.links.max || "None"}
Regex ${ settings.links == undefined ? "None" : settings.links.regex == "default" ? client.config.linkRegExp : settings.links.regex || "None"}
`);
        embed.addField("Emojis", `
Spam Interval ${settings.emojis == undefined ? "None" : settings.emojis.interval || "None"}
Max Spam ${settings.emojis == undefined ? "None" : settings.emojis.max || "None"}
Regex ${settings.emojis == undefined ? "None" : settings.emojis.regex == "default" ? client.config.emojiRegExp : settings.emojis.regex || "None"}
`);
        embed.addField("Caps", `
        Spam Interval ${settings.caps == undefined ? "None" : settings.caps.interval || "None"}
        Max Spam ${settings.caps == undefined ? "None" : settings.caps.max || "None"}
        Regex ${settings.caps == undefined ? "None" : settings.caps.regex == "default" ? client.config.capRegExp : settings.caps.regex || "None"}
`);
        return message.channel.send({embed});

        // if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need \`Manage Server\` permission in order to execute this command!`);

        // let embed = new Discord.MessageEmbed();
        // embed.setTitle(`Configuration for anti-spam`);
        // embed.setDescription(`1. Do you want to execute this command to the whole server?\n2. Do you want to execute this command to a specific channel?\n3. Cancel`);
        // embed.setColor("#363131")
        // let q = await message.channel.send({embed: embed});

        // let AnswerResp = await message.channel.awaitMessages((m) => m.author.id == message.author.id && /[1-3]/.test(m.content),{
        //     max: 1,
        //     time: 20000,
        //     errors: ["time"]
        // }).catch(console.error)
        // if(AnswerResp.first().content.toLowerCase() == "1"){
        //     spam.set(message.guild.id, message.guild.channels.cache.map((c) => c.id));
        //     return message.channel.send({embed: new Discord.MessageEmbed().setColor(`GREEN`).setDescription(`Now inspecting the entire server... <:magnifine:725422784322470021>`)});
        // } else if(AnswerResp.first().content.toLowerCase() == "2"){
        //     let channelMentionsResponse = await message.channel.awaitMessages((m) => m.author.id == message.author.id && /<#[0-9]{18}>/gmi.test(m.content),{
        //         maxProcessed: 1,
        //         time: 20000,
        //         errors: ["time"]
        //     }).catch(console.error)
        //     spam.set(message.guild.id, channelMentionsResponse[0].mentions.channels.map((c) => c.id));
        //     return message.channel.send({embed: new Discord.MessageEmbed().setColor(`GREEN`).setDescription(`Now inspecting: ${channelMentionsResponse[0].mentions.channels.map((c) => c.toString()).join(', ')}`)});
        // } else {
        //     return message.channel.send(`Canceled process`);
        // }

    }
}