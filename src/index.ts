// src/index.ts
import { Client, GatewayIntentBits, Collection, Message } from "discord.js";
import fs from "fs";
import path from "path";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const commands = new Collection<string, any>();

// Carregar comandos da pasta
const commandsPath = path.join(__dirname, "..", "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath).default;
  if (command?.name && command?.execute) {
    commands.set(command.name, command);
  }
}

client.once("ready", () => {
  console.log(`Bot online como ${client.user?.tag}`);
});

client.on("messageCreate", (message: Message) => {
  // Troque ! pelo seu prefixo!
  if (!message.content.startsWith("k:")) return;

  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  const command = commands.get(commandName!);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Erro ao executar o comando!");
  }
});

client.login(${{ secret(10) }});
