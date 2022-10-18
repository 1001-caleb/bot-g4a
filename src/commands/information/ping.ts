import { CommandBuilder } from 'structures';

export default new CommandBuilder()
	.setName('ping')
	.setNameLocalization('es-ES', 'latencia')
	.setDescription('Muestra la latencia del Bot')
    .addSubcommand(cmd => cmd.setName('aea').setDescription('si'))
	.setCallback(async ({ client, interaction }) => {
		return interaction.reply(`Ping! ${client.ws.ping} ms`);
	});
