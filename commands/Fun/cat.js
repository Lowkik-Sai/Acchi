const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'cat',
    description: 'get a cat pic',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/img/cat")
            .then((res) => res.json()).catch(console.error)
            .then((body) => {
                let embed = new MessageEmbed()
                .setTitle(`${message.author.username} here's your cat!`)
                .setColor("RANDOM")
                .setTimestamp(Date.now())
                .setImage(body.link)
               message.channel.send(embed).catch(console.error);
            }).catch(console.error);

    }
}