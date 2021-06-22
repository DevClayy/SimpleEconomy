const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db')
module.exports = {
  name: "leaderboard", // Command Name
  description: "List all of my commands/info about a specific command.", // Description
  aliases: ["lb"], // Aliases
  usage: "<user>", // Usage
  cooldown: 0, // Cooldown In Seconds
  guildOnly: false, // If Command In DMs return
  admin: false, // Bot Admin only
  async execute(message, args, client) {    
      let prefix = config.prefix

      
let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor("GREEN")
                .setFooter("Nothing To See Here Yet!")
            return message.channel.send(noEmbed)
        };

        money.length = 10;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            finalLb += `#**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** [💲] ${money[i].data} Coins \n`;
        }; 

        const embed = new Discord.MessageEmbed()
            .setTitle(`Leaderboard Of ${message.guild.name}`)
            .setColor("GREEN")
            .setDescription(finalLb)
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
};
