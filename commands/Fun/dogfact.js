const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'dogfact',
    description: 'get a bird fact',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/facts/dog")
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Dog Fact ${message.author.username}`)
                .setDescription(body.fact)
                .setTimestamp(Date.now())
               message.channel.send(embed)
            })

        }
    }