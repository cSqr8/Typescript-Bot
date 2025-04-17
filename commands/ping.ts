import { Message } from "discord.js";

export default {
  name: "ping",
  async execute(message: Message) {
    const sent = await message.reply("Calculando ping...");
    const ping = sent.createdTimestamp - message.createdTimestamp;
    const apiPing = message.client.ws.ping;

    sent.edit(`Ping: ${ping}ms`);
  },
};
