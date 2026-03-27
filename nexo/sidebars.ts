import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: "🚀 Começando",
      items: [
        "comecando/introducao",
        "comecando/instalacao",
        "comecando/primeiro-bot",
      ],
    },
    {
      type: "category",
      label: "📘 Guia",
      items: [
        "guia/comandos",
        "guia/eventos",
        "guia/responders",
        "guia/ui",
        "guia/configuracao",
      ],
    },
  ],
};

export default sidebars;