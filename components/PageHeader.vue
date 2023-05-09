<template>
    <header class="mb-4">
        <nav>
            <div class="container">
                <ul class="nav row justify-content-center">
                    <li class="col-6 nav-item text-end">
                        <nuxt-link class="nav-link pt-3 pb-2 px-0" to="/gplay">Google Play</nuxt-link>
                    </li>
                    <li class="col-6 nav-item">
                        <nuxt-link class="nav-link pt-3 pb-2 px-0" to="/appstore">App Store</nuxt-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
    .nav-link {
        display: inline-block;
        position: relative;
        &::after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            height: 4px;
            top: 0;
            background-color: transparent;
            transition: background-color 200ms;
        }
        &.active {
            text-decoration: underline;
            &::after {
                background-color: #000;
            }
        }
    }
</style>