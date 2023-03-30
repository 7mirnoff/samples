module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-rational-order",
  ],
  plugins: [
    "stylelint-order",
    "stylelint-scss"
  ],
  rules: {
    "selector-class-pattern": "^\.([a-z][a-zA-Z0-9]*)(-[a-zA-Z0-9]+)*$"

  },
  customSyntax: "postcss-scss"
}