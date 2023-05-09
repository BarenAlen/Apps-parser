// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '~/assets/styles/main.scss'
    ],
    vite: {
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

    runtimeConfig: {
        db_host: '127.0.0.1',
        db_user: 'root',
        db_password: '',
        db_name: 'apps'
    }
})
