const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js');
const ms = require('parse-ms');

module.exports = {
    name: 'beg',
    description: 'beg for money',

    execute(client, message, args) {
        let timeoutworked = 1800000;
        let worked =  db.fetch(`${message.author.id}.begged`);

        // if(message)

        if (worked != null && timeoutworked - (Date.now() - worked) > 0) {
            let time = ms(timeoutworked - (Date.now() - worked));
            message.channel.send(`Stop begging so much it makes you look like a normie come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**\nDonators have reduced cooldowns`).catch(console.error);
        } else {
            let amountearned = Math.floor(Math.random() * 500) + 1

            let jobs = ["Justin Bieber", "Larry The Cable Guy", "Lightning McQueen", "Kylie Jenner", "Your Mom", "The Mailman", "Woody", "ᴍʀᴄʀʏᴘᴛɪᴄx", "NerdThatNoOneLikes", "CedarBlocks" ]
            let job = jobs[Math.floor(Math.random()* jobs.length)]

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${job} donated ${amountearned} :money_with_wings:, it was placed in your wallet`)

            message.channel.send(embed);

            db.add(`${message.author.id}.money`, amountearned);
            db.set(`${message.author.id}.begged`, Date.now());
        }

    }
}