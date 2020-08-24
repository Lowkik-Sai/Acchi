const Discord = require('discord.js');
const db = require('quick.db');
const spam = new db.table('antispam');

module.exports = {
    name: "config",
    description: "configuration for the server",
    async execute (client, message, args) {

        if(args[0] == "anti-spam"){

            let embed = new Discord.MessageEmbed();
            embed.setTitle(`Configuration for anti-spam`);
            embed.setDescription(`1. Do you want to execute this command to the whole server?\n2. Do you want to execute this command to a specific channel?\n3. Cancel`);
            embed.setColor("#363131")
            let q = await message.channel.send({embed: embed});

            let AnswerResp = await message.channel.awaitMessages((m) => m.author.id == message.author.id && /[1-3]/.test(m.content),{
                max: 1,
                time: 20000,
                errors: ["time"]
            });
            if(AnswerResp.first().content.toLowerCase() == "1"){
                spam.set(message.guild.id, message.guild.channels.cache.map((c) => c.id).array());
                return message.channel.send(`Now inspecting the entire server <:magnifine:725422784322470021>`);
            } else if(AnswerResp.first().content.toLowerCase() == "2"){
                let channelMentionsResponse = await message.channel.awaitMessages((m) => m.author.id == message.author.id && /<#[0-9]{18}>/gmi.test(m.content),{
                    maxProcessed: 1,
                    time: 20000,
                    errors: ["time"]
                });
                spam.set(message.guild.id, channelMentionsResponse[0].mentions.channels.map((c) => c.id).array());
                return message.channel.send(`Now inspecting: ${channelMentionsResponse[0].mentions.channels.map((c) => c.toString()).join(', ')}`);
            } else {
                return message.channel.send(`Canceled process`);
            }

        }

    }
}