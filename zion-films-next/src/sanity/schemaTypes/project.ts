import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Portfólio',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título do Vídeo',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoria',
            type: 'string',
            options: {
                list: [
                    { title: 'Publicidade', value: 'Publicidade' },
                    { title: 'Institucional', value: 'Institucional' },
                    { title: 'Eventos', value: 'Eventos' },
                    { title: 'Clipe', value: 'Clipe' },
                    { title: 'Casamento', value: 'Casamento' },
                    { title: 'Outros', value: 'Outros' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'videoUrl',
            title: 'Link do YouTube',
            type: 'url',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Capa do Vídeo',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Texto Alternativo',
                }
            ],
            validation: (rule) => rule.required(),
        }),
    ],
})
