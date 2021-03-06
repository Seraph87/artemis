//Load modules
const npm = require("../modules/NPM.js");
npm.npm();

//load database
dbinit = require("../modules/dbinit.js");
dbinit.dbinit();

//start
module.exports = {
  name: "topic",
  description: "[mod] Set a discussion topic",
  explain: `This command will allow you to change a discussion to a predefined topic.`,
  execute(message) {
    //build prefix
    const prefixstart = getGuild.get(message.guild.id);
    const prefix = prefixstart.prefix;

    //if no proper perms
    if (!message.member.permissions.has("KICK_MEMBERS")) return;

    //update usage
    usage = getUsage.get("topic");
    usage.number++;
    setUsage.run(usage);

    //subjects
    let selectthis = [
      "Which Linux distribution did you first use,\nand why did you start using it?",
      "Do you have a favourite Linux/UNIX command?\nUse `" +
        prefix +
        "man command` to know what a command does, never use commands you do not know.",
      "Are you currently dual booting another OS or distribution,\nwhy do you dual boot, or why do you not?",
      "Do you know any programming languages,\nand which one is your favourite?",
      "Which games do you usually play,\nand are they available on Linux?",
      "Do you have any safety tips for others to know regarding the Corona virus?",
      "What made you interested in Linux Mint?",
      "What is your favorite editor?",
      "Do you prefer using the terminal or a gui?",
      "What distribution made you stop 'distro' hopping, why?\nIf you distro hop what distribution are you considering next, why?",
      "What is your biggest pet peeve with linux?",
      "What is the oddest thing you have put linux on?",
      "What is your favourite desktop environment or/and window manager?",
      "What is a handy lesser known terminal command?",
      "Mechanical or membrane keyboard? Why?",
      "Do you know any games that run exceptionally well on Linux?",
      "Which distributions have you tried before, and which one suited you the best and which one the worst, elaborate your answer.",
    ];

    //pick a random subject
    let selectedthis = selectthis[~~(Math.random() * selectthis.length)];

    //change channel topic to subject
    message.client.channels.cache
      .get(message.channel.id)
      .setTopic(selectedthis);

    //create embed
    const topicstart = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.avatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor("RANDOM")
      .setDescription(
        "For the next 30 minutes this will be the topic!\nTrying to go off-topic may have consequences."
      )
      .addField("The topic that I have selected for you is: \n", selectedthis)
      .setFooter("Behave properly, and respect each others opinions.\n")
      .setTimestamp();

    //send embed
    message.channel.send({
      embed: topicstart,
    });
  },
};
