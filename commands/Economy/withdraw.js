const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'withdraw',
    description: 'withdraw money from your bank account',

    execute(client, message, args) {
        let wallet = db.fetch(`${message.author.id}.money`);
        let bankaccnt = db.fetch(`${message.author.id}.bank`);
        let amountWithdrawing = args[0]

        if(!amountWithdrawing) message.reply("Please provide an amount").catch(console.error);

        if(amountWithdrawing > bankaccnt) message.reply("Oi you cant withdraw more than you have!").catch(console.error);

        if (amountWithdrawing && bankaccnt >= amountWithdrawing) {
            db.subtract(`${message.author.id}.bank`, amountWithdrawing)
            db.add(`${message.author.id}.money`, amountWithdrawing)
            message.channel.send(`Successfully <:TickYellow:715595910289031281> withdrew ${amountWithdrawing}:money_with_wings: from your bank account`).catch(console.error);
        }
    }
}
