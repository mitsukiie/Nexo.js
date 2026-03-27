import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Nexo.js',
  tagline: 'Crie bots Discord modernos com menos código e mais controle.',
  favicon: 'img/nexo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.seu-projeto.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mitsuki',
  projectName: 'Nexo',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.6,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/nexo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'nexo.js docs',
      logo: {
        alt: 'nexo.js Logo',
        src: 'img/nexo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          href: 'https://github.com/mitsukiie/Nexo.js',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Começando',
          items: [
            {
              label: 'Introdução',
              to: '/docs/comecando/introducao',
            },
            {
              label: 'Instalação',
              to: '/docs/comecando/instalacao',
            },
            {
              label: 'Primeiro Bot',
              to: '/docs/comecando/primeiro-bot',
            },
          ],
        },
        {
          title: 'Guia',
          items: [
            {
              label: 'Comandos',
              to: '/docs/guia/comandos',
            },
            {
              label: 'Eventos',
              to: '/docs/guia/eventos',
            },
            {
              label: 'Responders',
              to: '/docs/guia/responders',
            },
            {
              label: 'UI',
              to: '/docs/guia/ui',
            },
            {
              label: 'Configuração',
              to: '/docs/guia/configuracao',
            },
          ],
        },
        {
          title: 'Projeto',
          items: [
            {
              label: 'Repositório no GitHub',
              href: 'https://github.com/mitsukiie/Nexo.js',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} nexo.js docs. Feito com Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
