import { EventBuilder } from 'structures';

export default new EventBuilder('ready').setCallback(async client => {
	console.log(`Logged in ass ${client.user!.tag}`);
	client.guilds.cache.get('1004488600878075954')?.commands.set([]);
});
