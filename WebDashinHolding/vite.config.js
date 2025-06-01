import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        vueDevTools(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    server: {
        host: '0.0.0.0', // 允许所有 IP 访问
        strictPort: true, // 端口占用时直接退出
        // 代理配置必须放在 server 对象内
        proxy: {
            '/api': {
                target: 'http://lcalhost.icu:3005',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                bypass: (req) => {
                    if (req.headers.accept?.includes('text/html')) {
                        return '/index.html'
                    }
                }
            },
        }
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
