const config = require("../config.json");
const Discord = require("discord.js")
const db = require('quick.db')
const ms = require('ms')
const amount = ['213', '876', '363', '3263', '168', '2222', '222', '22', '3', '897', '978', '568', '167', '564', '653', '123', '7247', '0156', '0999', '6660', '1234', '8976', '4696', '5923', '1982', '9899', '9369']


module.exports = {
  name: "beg", // Command Name
  description: "List all of my commands/info about a specific command.", // Description
  aliases: ["free-money"], // Aliases
  usage: " ", // Usage
  cooldown: 1, // Cooldown In Seconds
  guildOnly: false, // If Command In DMs return
  admin: false, // Bot Admin only
  async execute(message, args, client) {    
      let prefix = config.prefix
      
      
                  const begmoney = Math.floor(Math.random() * 10) + 1;
                const amountssa = `${amount[Math.floor(Math.random()*amount.length)]}`
                    
  let timeout = 3600000;

  let beg = await db.fetch(`beg_${message.guild.id}_${message.author.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:nope:856127367445741568> You've already begged recently\n\n> **You can only beg \`1\` time a hour.** `);
    message.channel.send(timeEmbed)
  } else {
    
    
                 const embed = new Discord.MessageEmbed()
                 .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
                 .setDescription(`You have begged and gained: ${amountssa} Coins!`)
                 message.channel.send(embed)
             db.add(`money_${message.guild.id}_${message.author.id}`, amountssa)
             db.set(`beg_${message.guild.id}_${message.author.id}`, Date.now())
    
  }
                
                
 
      }
}