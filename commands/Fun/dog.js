const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'dog',
    description: 'get a reddit meme',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/img/dog")
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(body.link)
                .setTitle(`Dog Picture for ${message.author.username}`)
                .setTimestamp(Date.now())
               message.channel.send(embed)
            })

    }
}