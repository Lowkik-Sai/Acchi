const db = new (require("quick.db").table)("economy");
const Discord = require('discord.js')
const ms = require('parse-ms');

module.exports = {
    name: 'scout',
    description: 'scout for money',

    execute(client, message, args) {

        let timeoutworked = 1800000;
        let worked =  db.fetch(`${message.author.id}.scouted`);

        if (worked != null && timeoutworked - (Date.now() - worked) > 0) {
            let time = ms(timeoutworked - (Date.now() - worked));
            message.channel.send(`You have already scouted please come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`).catch(console.error);

        } else {
            let amountearned = Math.floor(Math.random() * 500) + 1

            let jobs = ["Supermarket", "Dog", "Pantry", "Car", "Patch of Grass", "Piggy Bank", "Cookie jar", "ladie's handbag", "kangroo pocket"]
            let job = jobs[Math.floor(Math.random()* jobs.length)]

            let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${message.author}, you searched a ${job} and found ${amountearned} coins`)

            message.channel.send(embed)

            db.add(`${message.author.id}.money`, amountearned)
            db.set(`${message.author.id}.scouted`, Date.now())
        }

    }
}