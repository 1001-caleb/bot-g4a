import Discord from "discord.js";
import type { CommandBuilder } from "./Command";
import {commandHandler} from '../handlers' 
export class ExtendedClient extends Discord.Client<true> {
    public constructor (){
        super({intents: 37631})
    }

    public commands = new Discord.Collection<string, CommandBuilder>()

    public async start() : Promise<void> {
        await commandHandler(this)
        await this.login();
    }
}
