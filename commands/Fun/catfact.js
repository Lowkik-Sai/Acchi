const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'catfact',
    description: 'get a cat fact',

    execute(client, message, args) {
        fetch("https://some-random-api.ml/facts/cat")
            .then((res) => res.json()).catch(console.error)
            .then((body) => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Cat Fact ${message.author.username}`)
                .setDescription(body.fact)
                .setTimestamp(Date.now())
               message.channel.send(embed).catch(console.error);
            }).catch(console.error);

        }
    }