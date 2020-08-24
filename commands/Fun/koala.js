const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'koala',
    description: 'get a koala pic',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/img/koala")
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Koala for ${message.author.username}`)
                .setImage(body.link)
                .setTimestamp(Date.now())
               message.channel.send(embed)
            })

        }
    }