const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'birdfact',
    description: 'get a bird fact',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/facts/bird")
            .then((res) => res.json()).catch(console.error)
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Bird Fact ${message.author.username}`)
                .setDescription(body.fact)
                .setTimestamp(Date.now())
               message.channel.send(embed).catch(console.error);
            }).catch(console.error);
        }
    }