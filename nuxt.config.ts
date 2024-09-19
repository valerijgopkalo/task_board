// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
    devtools: { enabled: true },
    vite: {
        resolve: {
            alias: {
                '@core': path.resolve(__dirname, './src/core'),
                '@components': path.resolve(__dirname, './src/desktop/components')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import "~/src/styles/variables/main.scss"; 
                        @import "~/src/styles/mixin/main.scss";
                    `
                }
            }
        }
    },
    hooks: {
        'pages:extend'(pages) {
          pages.push(
              {
                  name: 'homePage',
                  path: '',
                  file: path.resolve('./src/desktop/modules/taskBoard'),
              }
          );
        }
    }
})
