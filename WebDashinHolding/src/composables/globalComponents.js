// src/components/globalComponents.js
import GlobalLoader from '@/composables/GlobalLoader.vue';

export default {
    install: (app) => {
        app.component('GlobalLoader', GlobalLoader)
    }
}