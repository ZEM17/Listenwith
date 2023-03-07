import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://120.78.138.159:3000/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''), //不加这个要命
			},
		},
	},
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue'],
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
})
