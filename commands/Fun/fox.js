const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'fox',
    description: 'get a reddit meme',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/img/fox")
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(body.link)
                .setTitle(`Fox Picture for ${message.author.username}`)
                .setTimestamp(Date.now())
               message.channel.send(embed)
            })

    }
}