const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "bal",
    description: "check your balance",

    execute(client, message, args) {
        let user = message.mentions.users.first() || message.author;
        let money = db.fetch(`${user.id}.money`);
        let bank = db.fetch(`${user.id}.bank`);
        if([undefined, null].includes(money)) money = 0;
        if([undefined, null].includes(bank)) bank = 0;
        let embed = new MessageEmbed()
        .setAuthor(`${user.username}, Here's ${user.id == message.author.id ? "your": `${user.username}'s`} balance`)
        .setColor("#FFFFFF")
        .addField("Wallet", `$${money} coins`)
        .addField("Bank", `$${bank} coins`)
        .setThumbnail(user.avatarURL());
        message.channel.send(embed).catch(console.error);
    }
}
