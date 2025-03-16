# 📊 CSV Viewer Extension

<div align="center">

![CSV Viewer Logo](public/icons/icon.svg)

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Transform your CSV viewing experience with a sleek, modern interface right in your browser! 🚀

</div>

## ✨ Features

- 🎯 **Instant CSV Parsing** - Lightning-fast file processing using Papa Parse
- 📱 **Responsive Design** - Beautiful on any screen size
- 🎨 **Modern UI** - Clean, intuitive interface built with Vue 3 and Tailwind CSS
- 🔍 **Smart Formatting** - Automatic data type detection and formatting
- ⚡ **Performance Optimized** - Handles large CSV files with ease

## 🚀 Quick Start

#### Mozilla Firefox

Available on the [Mozilla Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/csv-viewer/) store.

#### Google Chrome

Available on the [Chrome Web Store](https://chromewebstore.google.com/detail/csv-viewer/nkkliddllkckohhkodjcbajhnbaljlag)

### From source

#### Requirements

- pnpm
- node version that supports vite 6

#### Installation

The script `scripts/build.sh` will install and build the extension.

Just run
```sh
sh scripts/build.sh firefox
```
or
```sh
sh scripts/build.sh chrome
```

The extension files will be saved in the `./dist/` folder. Load the extension in your browser.


## Development

See the instructions above to install from source.

Start the development server:
```bash
pnpm dev
```

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Build Tool**: Vite
- **CSV Parsing**: Papa Parse
- **UI Components**: Headless UI

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/maheshbansod">Light</a>

⭐️ Star this repo if you find it helpful!
</div>
