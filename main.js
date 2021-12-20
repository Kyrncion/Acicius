require("dotenv").config();
const { ACICIUS_TOKEN, OWNERS, ACICIUS_PREFIX, INVITE } = process.env;
const client = new Discord.Client({
  commandPrefix: ACICIUS_PREFIX,
  owner: OWNERS.split(","),
  invite: INVITE,
  disableMentions: "everyone",
  partials: ["GUILD_MEMBER"],
  ws: { intents: [Intents.NON_PRIVILEGED, "GUILD_MEMBERS"] },
});
const fs = require("fs");
const bot = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});
bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./Commands/")
  .filter((f) => f.endsWith(".js"));
for (const file of commandFiles) {
  const props = require(`./Commands/${file}`);
  console.log(`${file} loaded`);
  bot.commands.set(props.help.name, props);
}

bot.on("ready", async () => {
  console.log(
    `${bot.user.username} is online on ${bot.guilds.cache.size} servers!`
  );

  bot.user.setActivity("With JavaScript", { type: "PLAYING" });
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  client.on("error", (err) => client.logger.error(err.stack));

  client.on("warn", (warn) => client.logger.warn(warn));

  client.on("commandRun", (command) => {
    if (command.uses === undefined) return;
    command.uses++;
    if (command.lastRun === undefined) return;
    command.lastRun = new Date();
  });

  if (!cmd.startsWith(config.prefix)) return;

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
});

client.registry
  .registerDefaultTypes()
  .registerTypesIn(path.join(__dirname, "types"))
  .registerGroups([
    ["util-public", "Utility"],
    ["util-voice", "Utility (Voice)"],
    ["util", "Utility (Owner)"],
    ["info", "Discord Information"],
    ["random-res", "Random Response"],
    ["random-img", "Random Image"],
    ["random-seed", "Seeded Randomizers"],
    ["single", "Single Response"],
    ["auto", "Automatic Response"],
    ["events", "Events"],
    ["search", "Search"],
    ["pokedex", "Pokédex"],
    ["analyze", "Analyzers"],
    ["games-sp", "Single-Player Games"],
    ["games-mp", "Multi-Player Games"],
    ["edit-image", "Image Manipulation"],
    ["edit-avatar", "Avatar Manipulation"],
    ["edit-meme", "Meme Generators"],
    ["edit-text", "Text Manipulation"],
    ["edit-number", "Number Manipulation"],
    ["voice", "Play Audio"],
    ["music", "Music"],
    ["remind", "Reminders"],
    ["phone", "Phone"],
    ["code", "Coding Tools"],
    ["other", "Other"],
    ["roleplay", "Roleplay"],
  ])
  .registerDefaultCommands({
    help: false,
    ping: false,
    prefix: false,
    commandState: false,
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", async () => {
  client.logger.info(
    `[READY] Logged in as ${client.user.tag}! ID: ${client.user.id}`
  );

  client.on("commandError", (command, err) =>
    client.logger.error(`[COMMAND:${command.name}]\n${err.stack}`)
  );

  bot.login(ACICIUS_TOKEN);
});
