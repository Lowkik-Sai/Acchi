const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'bird',
    description: 'get a bird pic',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/img/birb")
            .then((res) => res.json()).catch(console.error)
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Bird for ${message.author.username}`)
                .setImage(body.link)
                .setTimestamp(Date.now())
               message.channel.send(embed).catch(console.error);
            }).catch(console.error);

        }
    }