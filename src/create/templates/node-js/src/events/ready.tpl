import { Events } from "discord.js";
import { createEvent } from "__NEXO_PACKAGE__";

export default createEvent({
  name: Events.ClientReady,
  once: true,
  run(client) {
    console.log(`Bot ${client.user?.tag} online.`);
  },
});
