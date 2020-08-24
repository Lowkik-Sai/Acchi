const db = new (require("quick.db").table)("economy");

module.exports = {
	name: 'pay',
	description: 'give some of your money to someone else',
	execute: async(client,message, args) => {
		let user = message.mentions.members.first() 

    let member = db.fetch(`${message.author.id}.money`)


    if (!user) {
        return message.channel.send('you forgot to mention somebody.').catch(console.error);
    }
    if (!args[1]) {
        return message.channel.send('Please specify an amount.').catch(console.error);
    }
    if (message.content.includes('-')) { 
        return message.channel.send('Negative money can not be paid.').catch(console.error);
    }

    if (member < args[1]) {
        return message.channel.send(`That's more money than you've got in your balance. try again.`).catch(console.error);
    }

    message.channel.send(`${message.author.tag}, You successfully paid ${user.user.username} ${args[1]}$.`).catch(console.error);
    db.add(`${user.id}.money`, args[1])
    db.subtract(`${message.author.id}.money`, args[1])

	},
};