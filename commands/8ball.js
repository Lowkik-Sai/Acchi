const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "8ball",
    description:"ask the bot a question",

    execute(client, message, args) {
        let question = args.slice(0).join(" ")
        if(!question) message.reply("What are you asking the wise 8ball? <:8ball:726161574741409794>").catch(console.error);

        if(question) {
            let replies = [
                "ask again later",
                "yes",
                "no",
                "Most likely",
                "Outlook not so good",
                "can you leave me alone, jeez",
                `I'm not that advanced right now to answer that question!`,
                "Please give me a break",
                "Uhm I'm not in the mood right now to answer",
                "Can you get me some water first or some fuel",
                "Stop! asking me those questions",
                "Ugh inviting me to your server right now would be the best thing",
                "What time do you think it's for me right now..? 2am in the morning!",
                "Kid don't be silly",
                "Let me ask my owners first",
                "Ask Chitanda#1968, if he doesn't respond, that mean I told him not to!",
                "As I see it, yes.",
                "Yes – definitely.",
                "Without a doubt.",
                "You may rely on it.",
                "You may rely on him.",
                "Outlook good.",
                "It is decidedly so.",
                "It is certain.",
                "Better not tell you now.",
                "Cannot predict now.",
                `Reply ${message.reply}, try again.`,
                "Concentrate and ask again.",
                "Very doubtful.",
                "My sources say no.",
                "My reply is no.",
                "Don't count on it.",
                "Yes, definitely"
            ]
            let reply = replies[Math.floor(Math.random() * replies.length)];
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .addField("Your Question", question)
            .setFooter(message.author.tag,)
            .addField("My answer", reply)
            message.channel.send(embed).catch(console.error);

        }
    }
}