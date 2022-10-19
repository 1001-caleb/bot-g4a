import { PermissionFlagsBits } from 'discord.js';
import { CommandBuilder } from 'structures';

export default new CommandBuilder()
	.setName('roles')
	.setDescription('Configurar los roles del servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
	.addSubcommand(sub =>
		sub
			.setName('new')
			.setNameLocalization('es-ES', 'crear')
			.addStringOption(o =>
				o.setName('name').setNameLocalization('es-ES', 'nombre').setRequired(true)
			)
			.setDescription('Nombre del rol')

			.addStringOption(o =>
				o.setName('Color').setDescription('Color del rol').setMinLength(7).setMaxLength(7)
			)

			.addBooleanOption(o =>
				o
					.setName('hoisted')
					.setNameLocalization('es-ES', 'izado')
					.setDescription('si el rol se mostrará por encima de los demas')
			)

			.addBooleanOption(o =>
				o
					.setName('mentionable')
					.setNameLocalization('es-ES', 'mencionable')
					.setDescription('si el rol se podrá mencionar')
			)
	)
	.addSubcommand(sub =>
		sub
			.setName('delete')
			.setNameLocalization('es-ES', 'eliminar')
			.setDescription('Elimina un rol existente')
			.addRoleOption(r =>
				r
					.setName('role')
					.setNameLocalization('es-ES', 'rol')
					.setDescription('Rol a eliminar')
					.setRequired(true)
			)
	)
    .setCallback(async ({ client, interaction}) => {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand){
            case 'new': {
                const name = interaction.options.getString('name', true);
                const color = interaction.options.getString('color');
                const hoist = interaction.options.getBoolean('hoisted') || false;
                const mentionable = interaction.options.getBoolean('mentionable')  || false;

                const hexColor = Number(color?.replace('#', '0x').toLocaleLowerCase());

                if( color && isNaN(hexColor)){
                    return interaction.reply({
                        content: 'El color debe ser un hexadecimal',
                        ephemeral: true
                    })
                }

                const role = await interaction.guild.roles.create({
                    name,
                    color: hexColor,
                    hoist,
                    mentionable,
                    reason: `Rol creado por ${interaction.user.tag}}`
                }).catch(() => undefined)

                if (!role) {
                    return interaction.reply({
                        content: 'No se pudo crear el rol',
                        ephemeral: true
                    })
                }

                return interaction.reply({
                    content: `se creo el rol ${role}`,
                    ephemeral: true
                })
            }
        }
    })