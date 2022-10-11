module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/return-in-computed-property": "off",
    "vue/no-side-effects-in-computed-properties": "off",
    "vue/no-unused-components": "off",
    "no-unused-vars": "off",
    "no-useless-escape": "off",
  },
  globals: {
    APP_CONFIG: false,
  },
};
