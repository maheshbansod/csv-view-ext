import sharp from 'sharp';

const sizes = [16, 32, 48, 128];
const inputSVG = 'public/icons/icon.svg';

sizes.forEach((size) => {
  sharp(inputSVG)
    .resize(size, size)
    .toFile(`public/icons/icon-${size}.png`, (err, info) => {
      if (err) {
        console.error(`Error resizing to ${size}px:`, err);
      } else {
        console.log(`Saved icon-${size}.png`);
      }
    });
});
