import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: [
                        'react',
                        'react-dom',
                        'react-router-dom',
                        'axios',
                        'react-hot-toast'
                    ]
                }
            }
        }
    },
    optimizeDeps: {
        esbuild: {
            loader: 'jsx',
            include: /src\/.*\.jsx?$/,
            exclude: []
        }
    }
})
