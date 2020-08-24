const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'koalafact',
    description: 'get a koala fact',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/facts/koala")
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Koala Fact ${message.author.username}`)
                .setDescription(body.fact)
                .setTimestamp(Date.now())
               message.channel.send(embed)
            })

        }
    }