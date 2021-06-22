const config = require("../config.json");
const Discord = require("discord.js")
const db = require('quick.db')
module.exports = {
  name: "balance", // Command Name
  description: "List all of my commands/info about a specific command.", // Description
  aliases: ["bal"], // Aliases
  usage: " ", // Usage
  cooldown: 5, // Cooldown In Seconds
  guildOnly: false, // If Command In DMs return
  admin: false, // Bot Admin only
  async execute(message, args, client) {    
      let prefix = config.prefix
 
      
     let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;


    let bank = await db.fetch(`bank_${user.id}`);

    if (user) {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
        .setDescription(
          `**${user.user.username}'s Money**\n\n[💲] Pocket: ${bal}\n [💰] Bank: ${bank}`
        );
      message.channel.send(moneyEmbed);
    } else {
      return message.channel.send("**`Please enter a valid user!`**");
    }
  }
}