module.exports = function (api) {
  // Cache based on environment
  const isTest = process.env.NODE_ENV === 'test';
  api.cache(!isTest);

  if (isTest) {
    return {
      presets: [
        ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      ],
      plugins: [
        'react-native-reanimated/plugin',
      ],
    };
  }

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    ],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
