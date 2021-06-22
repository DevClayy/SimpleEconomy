  const config = require("../config.json");
const Discord = require("discord.js");
const db = require('quick.db')
module.exports = {
  name: "withdraw", // Command Name
  description: "List all of my commands/info about a specific command.", // Description
  aliases: ["with"], // Aliases
  usage: " ", // Usage
  cooldown: 0, // Cooldown In Seconds
  guildOnly: false, // If Command In DMs return
  admin: false, // Bot Admin only
  async execute(message, args, client) {    
      let prefix = config.prefix
  

let user = message.author;

        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(`❌ | **You do not have any Money to Withdraw!**`)
            if (!money) return message.channel.send(embed)
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`✅ | You have withdrawn all your coins from your bank`); 
            message.channel.send(embed5)

        } else {

            let embed2 = new Discord.MessageEmbed() 
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`❌ | Specify an amount to withdraw!`);

            if (!args[0]) {
                return message.channel.send(embed2)
            }
            let embed6 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`❌ | Your Amount Is Not A Number!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            }
            let embed3 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`❌ | You can't withdraw negative money!`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`❌ | You don't have that much money in the bank!`);

            if (member2 < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`✅ | You have withdrawn ${args[0]} coins from your bank!`);

            message.channel.send(embed5)
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${message.guild.id}_${message.author.id}`, args[0])
        }
    }
}