const Discord = require('discord.js')
const fs = require('fs')
const db = require('quick.db')
let cevap = JSON.parse(fs.readFileSync("./cevap.json", "utf8"));
exports.run = async (client, message, args) => {
 let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix
let komut = db.fetch(`ozelkomut_${message.guild.id}`)
let msg = message
	let customArgs = args.join(' ').split(" - ")
  let x = customArgs[1]
if(db.has(`dil_${message.guild.id}`) === false) {
        
  //Dil

//? niye böyle yaptınbıldıgım var ok
if (db.has(`premium_${message.guild.id}`) === true) {
  


   const dil = client[s]
  var a = 'TR_tr'
  
    if(db.has(`dil_${message.guild.id}`, "EN_us") === true) {
        var s = 'EN_us'
    
    }
  
  
  
        var a = "<@"+message.author.id+">, Lütfen eklemek istediğiniz komutu yazın.\nÖrnek : **`"+prefix+"komut-ekle komut - açıklama`**"
var b = 'Size Verilen Normal Kapisteyi Doldurdunuz.'
var c = "<@"+message.author.id+">, Botun var olan bir komutunu özel komut olarak ekleyemezsiniz."
var n = "Yeni özel komut oluşturuldu!"
var h = `Artık \`${prefix}${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`
var l = `Yeni özel komut oluşturuldu!`
    }
  
  if(db.has(`dil_${message.guild.id}`, 'en') === true) {
        
        var s = "<@"+message.author.id+">, Please type the command you want to add. \n Example: : **`"+prefix+"command-add command - description`**"
var b = 'You Have Filled the Normal Capacity Given to You.'
var c = "<@"+message.author.id+">, You cannot add an existing command of the bot as a custom command."
var n = 'New custom command created!'
var h = `Now when you type \`${prefix}${customArgs[0]}\`the bot will respond as \`${customArgs.slice(1).join(" - ")}\``
var l = ``
   }
	if(!customArgs[0]) {
		message.channel.send(a)
		return
	}
  if(!customArgs[0]) {
if (komut > 5) return message.channel.send(b) 
 return;
  }
	if(!customArgs.slice(1).join(" - ")) {
		message.channel.send(a)
		return
	}

	if (client.commands.has(customArgs[0]) || client.aliases.has(customArgs[0])) {
		message.channel.send()
		return
	}
 const request = require('node-superfetch');
	var array = []
	var kontrol2 = []
	let komutlar = cevap
	var altkomut = ''

if (db.fetch(`otocevap_${message.guild.id}`) > 10) {
    //kb
    message.channel.send(b)
  return
      };
	if(komutlar[message.guild.id]) {
		for (var i = 0; i < Object.keys(komutlar[message.guild.id]).length; i++) {
			if(customArgs[0] === Object.keys(komutlar[message.guild.id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id][i])[0]}": "${customArgs.slice(1).join(" - ").replace("\n", "\\n")}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id][i])[0]}": "${komutlar[message.guild.id][i][Object.keys(komutlar[message.guild.id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[message.guild.id][i])[0].toString())
		}
		if(!kontrol2.includes(customArgs[0])) {
			array.push(JSON.parse(`{"${customArgs[0]}": "${customArgs.slice(1).join(" - ").replace("\n", "\\n")}"}`))
			komutlar[message.guild.id] = array

			fs.writeFile("./cevap.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
        db.add(`ozelkomut_${message.guild.id}`, 1)
			})

			const embed = new Discord.RichEmbed()
				.setAuthor(`${n}`)
			  .setDescription(h)
				.setColor('RANDOM')
			message.channel.send({embed})
			return
		} else {
			komutlar[message.guild.id] = array

			fs.writeFile("./cevap.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			const embed = new Discord.RichEmbed()
				.setAuthor(`${customArgs[0]} adlı özel komut güncellendi!`)
				.setDescription(`Artık \`${prefix}${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`)
				.setColor('RANDOM')
			message.channel.send({embed})
			return
		}
	} else {
		array.push(JSON.parse(`{"${customArgs[0]}": "${customArgs.slice(1).join(" - ")}"}`))
		komutlar[message.guild.id] = array

		fs.writeFile("./cevap.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
    db.add(`ozelkomut_${message.guild.id}`, 1)
		})

		const embed = new Discord.RichEmbed()
			.setAuthor(`${n}`)
			.setDescription(`Artık \`${prefix}${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`)
			.setColor('RANDOM')
		message.channel.send({embed})
db.add(`ozelkomut_${message.guild.id}`, 1)		
    return
    
	}
}
  
//  let prefix = db.fetch(`prefix_${message.guild.id}`) || ('+')

//	const customArgs = args.join(' ').split(" - ")
  //let x = customArgs[1]
  
	if(!customArgs[0]) {
		message.channel.send("<@"+message.author.id+">, Lütfen eklemek istediğiniz komutu yazın.\nÖrnek : **`"+prefix+"komut-ekle komut - açıklama`**")
		return
	}
  if(!customArgs[0]) {
if (komut > 5) return message.channel.send('Size Verilen Özel Komut Kapistesini Doldurdunuz.') 
 return;
  }
	if(!customArgs.slice(1).join(" - ")) {
		message.channel.send("<@"+message.author.id+">, Lütfen komut açıklamasını yazın.\nÖrnek : **`"+prefix+"komut-ekle komut - açıklama`**")
		return
	}

	if (client.commands.has(customArgs[0]) || client.aliases.has(customArgs[0])) {
		message.channel.send("<@"+message.author.id+">, Botun var olan bir komutunu özel komut olarak ekleyemezsiniz.")
		return
	}
 const request = require('node-superfetch');
	var array = []
	var kontrol2 = []
	let komutlar = cevap
	var altkomut = ''
  
if (db.fetch(`otocevap_${message.guild.id}`) > 5) {
    //kb
    message.channel.send("Sınırı astın")
  return
      };

	if(komutlar[message.guild.id]) {
		for (var i = 0; i < Object.keys(komutlar[message.guild.id]).length; i++) {
			if(customArgs[0] === Object.keys(komutlar[message.guild.id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id][i])[0]}": "${customArgs.slice(1).join(" - ").replace("\n", "\\n")}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id][i])[0]}": "${komutlar[message.guild.id][i][Object.keys(komutlar[message.guild.id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[message.guild.id][i])[0].toString())
		}
		if(!kontrol2.includes(customArgs[0])) {
			array.push(JSON.parse(`{"${customArgs[0]}": "${customArgs.slice(1).join(" - ").replace("\n", "\\n")}"}`))
			komutlar[message.guild.id] = array

			fs.writeFile("./cevap.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
        db.add(`otocevap_${message.guild.id}`, 1)
			})

			const embed = new Discord.RichEmbed()
				.setAuthor("Yeni özel komut oluşturuldu!")
			  .setDescription(`Artık \`${prefix}${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`)
				.setColor('RANDOM')
			message.channel.send({embed})
			return
		} else {
			komutlar[message.guild.id] = array

			fs.writeFile("./cevap.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			const embed = new Discord.RichEmbed()
				.setAuthor(`${customArgs[0]} adlı özel komut güncellendi!`)
				.setDescription(`Artık \`${prefix}${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`)
				.setColor('RANDOM')
			message.channel.send({embed})
			return
		}
	} else {
		array.push(JSON.parse(`{"${customArgs[0]}": "${customArgs.slice(1).join(" - ")}"}`))
		komutlar[message.guild.id] = array

		fs.writeFile("./cevap.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
    db.add(`otocevap_${message.guild.id}`, 1)
		})

		const embed = new Discord.RichEmbed()
			.setAuthor("Yeni özel komut oluşturuldu!")
			.setDescription(`Artık \`${prefix}${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`)
			.setColor('RANDOM')
		message.channel.send({embed})
db.add(`otocevap_${message.guild.id}`, 1)		
    return
    
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['komutekle', 'komut-ekle', 'komutoluştur', 'create-command', 'commandcreate'],
	permLevel: 4,
	kategori: 'moderasyon',
category: 'moderation',
}

exports.help = {
	name: 'otocevap-oluştur',
  enname:'create-command',
	description: 'Sunucunuza özel komut ekler.',
	usage: 'komut-ekle [komut] - [açıklama]',
  endescription: 'Adds custom commands to your server.',
  enusage: 'create-command'
}