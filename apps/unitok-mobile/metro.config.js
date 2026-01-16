const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });

// const { getDefaultConfig } = require('expo/metro-config');
// const { withNativeWind } = require('nativewind/metro');
// const path = require('path');

// const projectRoot = __dirname;
// const workspaceRoot = path.resolve(projectRoot, '../..');

// const config = getDefaultConfig(projectRoot);

// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(workspaceRoot, 'node_modules'),
// ];

// config.resolver.extraNodeModules = {
//   tailwindcss: path.resolve(projectRoot, 'node_modules/tailwindcss'),
// };

// config.transformer.babelTransformerPath = require.resolve(
//   'react-native-svg-transformer',
// );
// config.resolver.assetExts = config.resolver.assetExts.filter(
//   (ext) => ext !== 'svg',
// );
// config.resolver.sourceExts.push('svg');

// module.exports = withNativeWind(config, {
//   tailwindConfig: path.resolve(projectRoot, 'tailwind.config.js'),
// });

// // const { getDefaultConfig } = require('expo/metro-config');
// // const { withNativeWind } = require('nativewind/metro');
// // const path = require('path');

// // const config = getDefaultConfig(__dirname);

// // // SVG support (safe)
// // config.transformer.babelTransformerPath = require.resolve(
// //   'react-native-svg-transformer',
// // );

// // config.resolver.assetExts = config.resolver.assetExts.filter(
// //   (ext) => ext !== 'svg',
// // );
// // config.resolver.sourceExts.push('svg');

// // // module.exports = config;

// // // module.exports = withNativeWind(config, { input: './global.css' });

// // module.exports = withNativeWind(config, {
// //   tailwindConfig: path.resolve(__dirname, 'tailwind.config.js'),
// // });

// // // const { getDefaultConfig } = require('expo/metro-config');
// // // const { withNativeWind } = require('nativewind/metro');

// // // const config = getDefaultConfig(__dirname);

// // // module.exports = withNativeWind(config);
