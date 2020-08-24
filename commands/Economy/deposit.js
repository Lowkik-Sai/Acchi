const Discord = require("discord.js");
const db = new (require("quick.db").table)("economy");

module.exports = {
    name: "deposit",
    description: "deposit money to bank",

    execute(client, message, args){

        let authorMoney = db.fetch(`${message.author.id}.money`);
        let moneyBeingDeposited = args[0];

        if (!moneyBeingDeposited) return message.reply("How much are you depositing?")

        if (authorMoney < moneyBeingDeposited) {
            message.channel.send("You cant deposit more than you own")
        } else {
            db.subtract(`${message.author.id}.money`, moneyBeingDeposited)
            db.add(`${message.author.id}.bank`, moneyBeingDeposited)
            let embed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .addField("Deposit Info", `You deposited $${moneyBeingDeposited} coins to your bank`)
            message.channel.send(embed)
        }
    }
}