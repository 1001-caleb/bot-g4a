import { EventBuilder } from 'structures';

export default new EventBuilder('ready').setCallback(async client => {
	console.log(`Logged in ass ${client.user!.tag}`);
});
