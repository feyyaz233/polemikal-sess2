message.guild.createRole({
    name: "Kurucu",
    color: "RED",
    permissions: ["ADMINISTRATOR"]
  });

  message.guild.createRole({
    name: "Admin",
    color: "RED",
    permissions: ["BAN_MEMBERS", "MANAGE_MESSAGES"]
  });

  message.guild.createRole({
    name: "Moderatör",
    color: "RED",
    permissions: ["MANAG_MESSAGES"]
  });

  message.guild.createRole({
    name: "Üye",
    color: "RED"
  });
  
  message.guild.createRole({
        name: 'Kurucu',
        color: 'RED',
        permissions: [
            "ADMINISTRATOR",
    ]
      })