import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import manifestJson from './manifest.json';
import fs from 'fs';

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
        ]
    }
});
