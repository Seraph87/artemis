//Load modules
const npm = require("../modules/NPM.js");
npm.npm();

//load database
dbinit = require("../modules/dbinit.js");
dbinit.dbinit();

//start
module.exports = {
  name: "remindme",
  description: "[general] set a reminder",
  explain: `This command will allow you to set a reminder for yourself.\n
  \`remindme 10 hours *Reminder Text Here*\` will set a reminder.\n
  \`remindme delete clear\` will clear all your reminders.\n
  \`remindme delete DeletionKey\` will remove the specified reminder.`,
  async execute(message) {
    //build prefix
    const prefixstart = getGuild.get(message.guild.id);
    const prefix = prefixstart.prefix;

    //update usage
    usage = getUsage.get("remindme");
    usage.number++;
    setUsage.run(usage);

    //form args
    const args = message.content.slice(prefix.length + 9).split(" ");

    //if no args
    if (!args[0]) {
      //pull reminders
      const reminders = db
        .prepare("SELECT * FROM remind WHERE uid = ? ORDER BY time DESC;")
        .all(message.author.id);

      //empty string
      let str = "";

      //loop trough reminders
      for (const data of reminders) {
        //define guild name
        let guildname = message.client.guilds.cache.get(data.gid);

        //if no guild
        if (!guildname) return;

        //define channel name
        let channelname = guildname.channels.cache.find(
          (channel) => channel.id === data.cid
        );

        //define time
        let timers = data.time;

        //form string
        str +=
          "\nWhen: " +
          moment(timers, "YYYYMMDDHHmmss").fromNow() +
          "\n" +
          `${guildname}` +
          "\n" +
          `${channelname}` +
          "\nReminder: " +
          data.reminder +
          "\nDeletion key: " +
          data.mid +
          "\n";
      }

      //form embed
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })
        )
        .setTitle("Remindme")
        .setColor(`RANDOM`)
        .setDescription("Reminders:\n" + str)
        .addField(prefix + "remindme ", "10 s reason")
        .addField(prefix + "remindme ", "10 m reason")
        .addField(prefix + "remindme ", "10 h reason")
        .addField(prefix + "remindme ", "delete DELETIONKEY")
        .addField(prefix + "remindme ", "delete clear");

      //send embed
      return message.channel.send({
        embed,
      });
    }

    //if delete
    if (args[0] == "delete") {
      //exact match
      if (args[1].toLowerCase() == "clear") {
        //wipe reminders
        db.prepare(`DELETE FROM remind WHERE uid = ${message.author.id}`).run();

        //notify
        return message.reply("Done, check " + prefix + "remindme");
      }

      //delete reminder
      db.prepare(
        `DELETE FROM remind WHERE mid = ${args[1]} AND uid = ${message.author.id}`
      ).run();

      //notify
      return message.reply("Done, check " + prefix + "remindme");
    }

    //exact match
    if (args[1]) {
      if (
        args[1].toLowerCase() == "s" ||
        args[1].toLowerCase() == "sec" ||
        args[1].toLowerCase() == "seconds"
      ) {
        //convert time
        let settime = Math.floor(args[0] * 1000);

        //form reminder text
        let remindtext = args.slice(2).join(" ");

        //form time
        let datefor = moment().add(settime, "ms").format("YYYYMMDDHHmmss");

        //form new database entry
        timerset = {
          mid: message.id,
          cid: message.channel.id,
          gid: message.guild.id,
          uid: message.author.id,
          time: datefor,
          reminder: remindtext,
        };

        //run database
        setRemind.run(timerset);

        //notify
        return message.reply(
          moment(datefor, "YYYYMMDDHHmmss").format("DD/MM/YYYY H:mm:ss") +
            " " +
            moment(datefor, "YYYYMMDDHHmmss").fromNow()
        );
      }

      //exact match
      if (
        args[1].toLowerCase() == "m" ||
        args[1].toLowerCase() == "min" ||
        args[1].toLowerCase() == "minutes"
      ) {
        //convert time
        let settime = Math.floor(args[0] * 60000);

        //form reminder text
        let remindtext = args.slice(2).join(" ");

        //form time
        let datefor = moment().add(settime, "ms").format("YYYYMMDDHHmmss");

        //form new database entry
        timerset = {
          mid: message.id,
          cid: message.channel.id,
          gid: message.guild.id,
          uid: message.author.id,
          time: datefor,
          reminder: remindtext,
        };

        //run database
        setRemind.run(timerset);

        //notify
        return message.reply(
          moment(datefor, "YYYYMMDDHHmmss").format("DD/MM/YYYY H:mm:ss") +
            " " +
            moment(datefor, "YYYYMMDDHHmmss").fromNow()
        );
      }

      //exact match
      if (
        args[1].toLowerCase() == "h" ||
        args[1].toLowerCase() == "hour" ||
        args[1].toLowerCase() == "hours"
      ) {
        //convert time
        let settime = Math.floor(args[0] * 3600000);

        //form reminder text
        let remindtext = args.slice(2).join(" ");

        //form time
        let datefor = moment().add(settime, "ms").format("YYYYMMDDHHmmss");

        //form new database entry
        timerset = {
          mid: message.id,
          cid: message.channel.id,
          gid: message.guild.id,
          uid: message.author.id,
          time: datefor,
          reminder: remindtext,
        };

        //run database
        setRemind.run(timerset);

        //notify
        return message.reply(
          moment(datefor, "YYYYMMDDHHmmss").format("DD/MM/YYYY H:mm:ss") +
            " " +
            moment(datefor, "YYYYMMDDHHmmss").fromNow()
        );
      }
    }

    //pull reminders
    const reminders = db
      .prepare("SELECT * FROM remind WHERE uid = ? ORDER BY time DESC;")
      .all(message.author.id);

    //empty string
    let str = "";

    //loop trough reminders
    for (const data of reminders) {
      //define guild name
      let guildname = message.client.guilds.cache.get(data.gid);

      //define channel name
      let channelname = guildname.channels.cache.find(
        (channel) => channel.id === data.cid
      );

      //define time
      let timers = data.time;

      //form string
      str +=
        "\nWhen: " +
        moment(timers, "YYYYMMDDHHmmss").fromNow() +
        "\n" +
        `${guildname}` +
        "\n" +
        `${channelname}` +
        "\nReminder: " +
        data.reminder +
        "\nDeletion key: " +
        data.mid +
        "\n";
    }

    //form embed
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setTitle("Remindme")
      .setColor(`RANDOM`)
      .setDescription("Reminders:\n" + str)
      .addField(prefix + "remindme ", "10 s reason")
      .addField(prefix + "remindme ", "10 m reason")
      .addField(prefix + "remindme ", "10 h reason")
      .addField(prefix + "remindme ", "delete DELETIONKEY")
      .addField(prefix + "remindme ", "delete clear");

    //send embed
    return message.channel.send({
      embed,
    });
  },
};
