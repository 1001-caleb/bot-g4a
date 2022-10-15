import {SlashCommandBuilder} from '@discordjs/builders';
import type {ChatInputCommandInteraction} from 'discord.js';
import type { ExtendedClient } from './Client';

export class CommandBuilder extends SlashCommandBuilder {
    public callback!: unknown;

    public setCallback(fn : CommandFunction) {
        this.callback = fn;
        return this;
    }
}

type CommandFunction = (idk: { client: ExtendedClient; interaction: ChatInputCommandInteraction<'cached'> }) => unknown