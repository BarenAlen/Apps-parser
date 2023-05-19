// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '~/assets/styles/main.scss'
    ],
    vite: {
        server: {
            https: true,
            hmr: {
                protocol: 'wss'
            }
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
        
        db_host: '127.0.0.1',
        db_user: 'root',
        db_password: '',
        db_name: 'apps'
    }
})
