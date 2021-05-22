module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx'],
        alias: {
          screens: './src/screens',
          components: './src/components',
          store: './src/store',
          styles: './src/styles',
          constants: './src/constants',
          assets: './src/assets',
        },
      },
    ]
  ],
};