import { readdirSync } from 'fs';
import { join } from 'path';
import type { ExtendedClient, CommandBuilder } from 'structures';


export async function commandHandler(client: ExtendedClient) {
    const categories = readdirSync(join (__dirname, '..', 'commands'));

    for (const category of categories) {
        const commands = readdirSync(join(__dirname, '..', 'commands', category));
            for (const command of commands) {
                const  {default: cmd} : { default: CommandBuilder }= await import(
                    join(__dirname, '..', 'commands', category, command)
                );

                client.commands.set(cmd.name, cmd)
            }
    }

    client.once('ready', () => {
        client.application.commands.set(client.commands.map(cmd => cmd.toJSON()))
    })
}
