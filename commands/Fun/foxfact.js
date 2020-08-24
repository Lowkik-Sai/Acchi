const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'foxfact',
    description: 'get a fox fact',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/facts/fox")
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Fox Fact ${message.author.username}`)
                .setDescription(body.fact)
                .setTimestamp(Date.now())
               message.channel.send(embed)
            })

        }
    }