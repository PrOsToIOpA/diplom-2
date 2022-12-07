export const deepLink: any = {
  prefixes: ['https://raboomapp.com/', 'raboomapp://'],
  config: {
    SigningScreen: {
      path: 'SigningScreen/:raboomId',
      params: {
        raboomId: null,
      },
    },
    LikedScreen: 'LikedScreen',
    SearchScreen: 'SearchScreen',
    MoneyRequestScreen: 'MoneyRequestScreen',
  },
};
