import Discord from "discord.js";

export class ExtendedClient extends Discord.Client<true> {
    public constructor (){
        super({intents: 37631})
    }

    public async start() : Promise<void> {
        await this.login();
    }
}
