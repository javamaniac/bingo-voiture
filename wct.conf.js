module.exports = {
  verbose: false,
  sauce: false,
  suites: [
    'test/index.html',
    // 'test/bingo-app.html'
  ],
  plugins: {
    sauce: {
      disabled: true
    },
    local: {
      //disabled: false,
      remote: false,
      browsers: [
        'chrome',
        'firefox'
      ],
      browserOptions: {
        chrome: ["window-size=1920,1080", "headless", "disable-gpu", "no-sandbox"],
        firefox: ["--headless"]
      }
    }
  }
};
