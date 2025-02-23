import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import manifestJson from './manifest.json';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
    const OUT_DIR = 'dist';
    return {
        plugins: [
            vue(),
            tailwindcss(),
            {
                name: 'copy-manifest',
                closeBundle() {
                    console.info("Copying manifest file");
                    const finalManifest = mode === 'firefox' ? {
                        ...manifestJson,
                        background: {
                            scripts: [manifestJson.background.service_worker],
                        },
                        browser_specific_settings: {
                            gecko: {
                                id: "css-view-ext@lightextensions"
                            }
                        }
                    } : manifestJson;
                    fs.writeFile(`${OUT_DIR}/manifest.json`, JSON.stringify(finalManifest), (err) => {
                        if (err) {
                            console.error("Couldn't write the manifest file");
                            console.error(err);
                            return;
                        }
                        console.info("Manifest file written");
                    });
                },
            }
        ],
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    popup: resolve(__dirname, 'popup.html'),
                }
            }
        }
    }
});
