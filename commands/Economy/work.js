const Discord = require("discord.js");
const ms = require("parse-ms")
const db = new (require("quick.db").table)("economy");

module.exports = {
	name: 'work',
	description: 'work, and earn money',
	execute(client,message, args) {
        let timeoutworked = 180000;
        let worked =  db.fetch(`${message.author.id}.worked`)


        if (worked != null && timeoutworked - (Date.now() - worked) > 0) {
            let time = ms(timeoutworked - (Date.now() - worked));
            message.channel.send(`You have already worked please come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`).catch(console.error);


        } else {
            let amountearned = Math.floor(Math.random() * 500) + 1

            let jobs = ["Developer", "Scientist", "Doctor", "Shopkeeper", "Bot Developer", "Police","Streamer", "Manager", "Pilot", "Data Scientist", "Mobile Developer", "Front End Engineer", "Database Administrator","Dank Memer Lover", "Hacker"]
            let job = jobs[Math.floor(Math.random()* jobs.length)]

            let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${message.author.tag}, it paid off`, message.author.displayAvatarURL())
            .setDescription(`${message.author}, you worked as a ${job} and earned ${amountearned} coins`)

            message.channel.send(embed).catch(console.error);

            db.add(`${message.author.id}.money`, amountearned)
            db.set(`${message.author.id}.worked`, Date.now())
        }

	},
};

//"Bot Developer", "Police","Streamer", "Manager", "Pilot", "Data Scientist", "Mobile Developer", "Front End Engineer", "Databade Administrator","Dank Memer Lover"