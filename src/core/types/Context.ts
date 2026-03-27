import type { App, ExtendedClient } from '@base';
import type { CommandManager, ResponderManager } from '@modules';
import type { CooldownManager } from '../utils/Cooldown';

export interface AppContext {
  client: ExtendedClient;
  app: App;
  commands: CommandManager;
  cooldowns: CooldownManager;
  responders: ResponderManager;
}
