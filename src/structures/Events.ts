import type { ClientEvents } from 'discord.js'
import type { ExtendedClient } from './Client'

export class EventBuilder<T extends keyof ClientEvents> {
    public constructor(public name: T, public once: boolean) {}

    public callback!: EventFunction<T>;

    public setCallback(){}
}

type EventFunction<T extends keyof ClientEvents> = (client: ExtendedClient, ...args: ClientEvents[T] ) => unknown