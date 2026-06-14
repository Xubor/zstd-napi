const fs = require('node:fs');
const path = require('node:path');

const buildType = process.config.target_defaults?.default_configuration ?? 'Release';
const rootDir = __dirname;
const bindingPath = path.join(rootDir, 'build', buildType, 'binding.node');
const skeletonPath = path.join(rootDir, 'binding.js.skeleton');
const outputPath = path.join(rootDir, 'binding.js');
const marker = '<insert-base64-encoded-binding-here>';

function main() {
	const skeletonContent = fs.readFileSync(skeletonPath, 'utf8');

	if(!skeletonContent.includes(marker)) {
		throw new Error(`Placeholder "${marker}" was not found in ${skeletonPath}`);
	}

	const bindingBuffer = fs.readFileSync(bindingPath);
	const bindingBase64 = bindingBuffer.toString('base64');

	const outputContent = skeletonContent.replace(marker, bindingBase64);
	fs.writeFileSync(outputPath, outputContent, 'utf8');
}

main();
