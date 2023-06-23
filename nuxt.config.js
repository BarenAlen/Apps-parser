// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '~/assets/styles/main.scss'
    ],
    vite: {
        server: {
            https: true,
            // hmr: {
            //     protocol: 'wss'
            // }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@/assets/styles/shared" as *;
                    `
                }
            }
        }
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        }
    ],
    router: {
        options: {
          linkActiveClass: "active",
          linkExactActiveClass: "exact-active"
        }
    },
    modules: [
        '@pinia/nuxt',
    ],
    imports: {
        dirs: ['./stores'],
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    runtimeConfig: {
        // Настройки базы данных
        
        db_host: process.env.DB_HOST,
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD || '',
        db_name: process.env.DB_NAME
    }
})
