exports.run = async(client, message, args) => {
  let user = message.mentions.users.first() || message.author;
 let invites = await message.guild.fetchInvites() 
  let regular = invites.array().find(invite => invite.inviter.id === user.id) ? invites.find(invite => invite.inviter.id === user.id).uses : 0
 
  message.channel.send(`toplam ${regular} davetin var`)
}
exports.conf = {
  aliases: []
}
exports.help = {
  name: "davetlerim"
}