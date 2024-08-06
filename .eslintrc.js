// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "max-lines-per-function": [
      "error",
      100,
      {
        skipBlankLines: true,
        skipComments: true,
      },
    ],
  },
};
