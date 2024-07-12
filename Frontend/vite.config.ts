import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import sass from 'sass'

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

    return defineConfig({
        plugins: [react()],
        css: {
            preprocessorOptions: {
                scss: {
                    implementation: sass,
                },
            },
        },
        resolve: {
            alias: [
                { find: '@', replacement: '/src' },
                { find: '@components', replacement: '/src/components' },
                { find: '@pages', replacement: '/src/pages' },
                { find: '@customization', replacement: '/src/customization' },
            ],
        },
        base: process.env.VITE_BASE_URL,
        server: {
            host: true,
            port: parseInt(process.env.VITE_PORT)
        },
    });
}