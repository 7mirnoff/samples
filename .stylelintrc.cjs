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
    "selector-class-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        "message": "Class selectors should be in kebab-case.",
        "ignore": ["class", "selector"]
      }
    ]
  },
  customSyntax: "postcss-scss"
}