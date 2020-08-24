const {MessageEmbed} = require('discord.js') 

module.exports = {
    name: 'purge',
    description: 'Purge messages',

    async execute(client, message, args) {
       
        if (!message.member.hasPermission('MANAGE_MESSAGES' || 'ADMINISTRATOR')) {
			return message.channel.send("You don't have the `Manage Messages` permission to be able to use this command...");
		}

		if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES' || 'ADMINISTRATOR')) {
			return message.channel.send("I don't have the `Manage Messages` permission to be able to do this...");
		}

		if (isNaN(args[0])) return syntax(client, message);

		if (args[0] < 1) {
			return message.channel.send("You at least need to delete 1 message");
		}

		if (args[0] > 100) {
			return message.channel.send("You can't delete more than a 100 messages at once...");
		}

		await message.delete()
		await message.channel.bulkDelete(args[0])
		await message.channel.send({embde: new MessageEmbed().setColor(`GREEN`).setDescription(`Deleted ${parseInt(args[0]).toLocaleString()} messages!`)}).then(msg => {
			msg.delete({ timeout: 5002 })
		})

    }
}

function syntax(client, message){

    let embed = new MessageEmbed();
    embed.setTitle(`Purge Help - c!purge`);
    embed.setDescription(`**Description:** Deletes a certain number of messages!
    **Usage**: ${client.config.prefix}purge {number} 
    **Example**: 
    ${client.config.prefix}purge 9`);
    return message.channel.send({embed: embed})

}
