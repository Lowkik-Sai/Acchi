const {MessageEmbed} = require('discord.js')
module.exports ={ 
    name:"shop",
    description: 'view items in the shop',

    execute(client, message, args) {
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("**__Aspireʀʙx's Shop__**\n• Whoever said that money can't buy happiness simply didn't know where to go shopping!")
        .addField("<:bowling:725370050776924209> **Bowling Set** - __1,560__ coins", "Bowling is not a sport because you have to rent the shoes!")
        .addField("<:alarm_clock:725371342387413042> **Alarm Clock** - __520__ coins", "The trouble with an alarm clock is that what seems sensible when you set it seems absurd when it goes off!")
        .addField("<:classical_building:725370346542202973> **Mansion** - __75,000__ coins", "The mansion should not be graced by its master, the master should grace the mansion!")
        .addField("<:cookie:725370965558689883>  **Cookie** - __90__ coins", "When You're Down and Feeling Worse, Keep a Cookie in Your Purse!")
        .addField("<:boxing_glove:725370050894364763> **Boxing Gloves** - __820__ coins", "Boxing is the most extreme metaphor of personal liability – you enter the ring alone and compete the same way!")
        .addField("<:birthday:725371290453671986> **Birthday Cake** - __7,000__ coins", "Life's too short to say no to a birthday cake!")
        .addField("<:airplane:725370824353120266> **Private Jet** - __65,620__ coins", "Take the vacation and get a jet that takes you to Hawaii!")
        .addField("<:fries:725370965915205703> **Fries** - __35__ coins", "Happier than a seagull with a French fry!")
        .addField("<:AspireBadge:725385469181034577> **Aspire Badge** - __35,000__ coins ", "Great Badge to add to your inventory!")
        .addField("<:clapper:725370051183509524> **Movie Clapper** - __900__ coins", "I am big! It's the pictures that got small!")
        message.channel.send(embed).catch(console.error);
    }
}