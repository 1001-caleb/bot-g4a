import Discord from 'discord.js';
import type { CommandBuilder } from './Command';
import { commandHandler, eventHandler } from '../handlers';
import mongoose from 'mongoose';
export class ExtendedClient extends Discord.Client<true> {
	public constructor() {
		super({ intents: 37631 });
	}

	public commands = new Discord.Collection<string, CommandBuilder>();

	public async start(): Promise<void> {
        mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'));
		await commandHandler(this);
		await eventHandler(this);
		await this.login();
	}
}
