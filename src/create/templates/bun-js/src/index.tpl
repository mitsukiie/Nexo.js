import { Bootstrap } from "__NEXO_PACKAGE__";
import { GatewayIntentBits } from "discord.js";

await Bootstrap.init({
  token: process.env.TOKEN,
  intents: [GatewayIntentBits.Guilds],
  paths: {
    commands: "src/commands",
    events: "src/events",
  },
});
