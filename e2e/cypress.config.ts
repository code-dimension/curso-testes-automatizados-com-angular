import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'qx6gps',
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run gerenciador-tarefas:serve-static',
        production: 'nx run gerenciador-tarefas:serve-static',
      },
      ciWebServerCommand: 'nx run gerenciador-tarefas:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
    video: true,
  },
});
