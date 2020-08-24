const { MessageEmbed } = require('discord.js');
const db = new (require("quick.db").table)("economy");

module.exports = {
    name: "crime",
    async execute (client, message, args) {
        const con = await db.connect();
        let cd = parseInt(1 * 60 * 60 * 1000);
        try {
            let coins = Math.floor(Math.random() * 101);
            const [ rows ] = await con.execute(`SELECT * FROM users WHERE id = ? AND guildid = ?`, [ `${message.author.id}`, `${message.guild.id}` ]);
            if (rows[0].crimeCooldown > Date.now()) return message.channel.send(`You need to wait **${remainingCooldown(rows[0].crimeCooldown)}** more!`);
            con.execute(`UPDATE users SET coins = coins + '${coins}' WHERE id = ? AND guildid = ?`, [ `${message.author.id}`, `${message.guild.id}` ]);
            con.execute(`UPDATE users SET crimeCooldown = '${Date.now() + cd}' WHERE id = ? AND guildid = ?`, [ `${message.author.id}`, `${message.guild.id}` ]);
            let success = new MessageEmbed()
                .setColor("#00FF00")
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
                .setDescription(`You have succesfully commited a crime for ${coins} coins!`);
            message.channel.send(success);
        } catch (error) {
            let embed = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription(error.message);
            message.channel.send(embed);
        }
    }
}