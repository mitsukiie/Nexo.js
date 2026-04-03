#!/usr/bin/env node

import { version } from "../../package.json";
import { createProgram, registerFallback, runProgram } from "../cli/runner";
import { registerCommand as registerCreateCommand } from "../commands/create.command";
import { registerCommand as registerDevCommand } from "../commands/dev.command";
import { registerCommand as registerStartCommand } from "../commands/start.command";

const program = createProgram(version);

registerDevCommand(program);
registerStartCommand(program);
registerCreateCommand(program);
registerFallback(program);

runProgram(program).catch((error: unknown) => {
	console.error(error);
	process.exit(1);
});
