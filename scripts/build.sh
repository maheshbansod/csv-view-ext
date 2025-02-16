mode="${1:-firefox}"

echo "Installing dependencies..."
pnpm install

echo "Building for $mode"
pnpm build --mode="$mode"

echo "Build complete."
echo "You may find the build in ./dist/"
