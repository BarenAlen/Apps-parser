<template>
    <nav class="page-content h-100-vh d-flex align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-5">
                    <nuxt-link to="/gplay" class="btn-gplay btn btn-lg btn-outline-dark">
                        <span>
                            <svg class="kOqhQd" aria-hidden="true" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0,0h40v40H0V0z"></path><g><path d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z" fill="#EA4335"></path><path d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z" fill="#FBBC04"></path><path d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z" fill="#4285F4"></path><path d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z" fill="#34A853"></path></g></svg>
                        </span>
                        Google Play
                    </nuxt-link>
                </div>
                <div class="col-5">
                    <nuxt-link to="/appstore" class="btn-apstore btn btn-lg btn-outline-dark">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.773 22.773" xml:space="preserve">
                                <path fill="#a2aaad" d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zM20.67 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"/>
                            </svg>
                        </span>
                        App Store
                    </nuxt-link>
                </div>    
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    .btn-gplay,
    .btn-apstore {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        span {
            margin-right: 2rem;
            display: block;
            width: 72px;
            height: auto;
            svg {
                display: block;
            }
        }
    }
</style>