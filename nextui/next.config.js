module.exports = {
    async rewrites() {
      return [
        {
          source: '/phrase/:path*',
          destination: 'http://localhost:3001/phrase/:path*',
        },
      ];
    },
  };
  