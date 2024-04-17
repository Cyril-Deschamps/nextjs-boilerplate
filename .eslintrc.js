/* eslint-disable i18next/no-literal-string */
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["fixWithTranslateRouteLib.js"],
  plugins: ["@typescript-eslint", "i18next", "deprecation"],
  overrides: [
    {
      files: [
        "src/__tests__/**/*",
        "src/__mocks__/**/*",
        "src/__tests-utils__/**/*",
      ],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "no-use-before-define": "off",
      },
    },
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "block-scoped-var": "warn",
    "eol-last": ["warn", "always"],
    // TS
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "deprecation/deprecation": "warn",

    // Hooks
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "useLoader",
      },
    ],

    // JSX
    "react/no-unescaped-entities": 0,
    "react/jsx-curly-brace-presence": ["warn", { props: "always" }],
    "react/jsx-key": [
      process.env.NODE_ENV === "production" ? "error" : "warn",
      { checkFragmentShorthand: true },
    ],
    "react/jsx-no-target-blank": [
      process.env.NODE_ENV === "production" ? "error" : "warn",
      { enforceDynamicLinks: "always", warnOnSpreadAttributes: true },
    ],
    "react/jsx-sort-props": [
      "warn",
      { shorthandLast: true, reservedFirst: true },
    ],
    "react/self-closing-comp": [
      "warn",
      {
        component: true,
        html: true,
      },
    ],

    // i18n
    /*"i18next/no-literal-string": [
      "warn",
      {
        ignoreCallee: [
          "get",
          "post",
          "put",
          "delete",
          "logger",
          "useTranslation",
          "test",
        ],
        ignore: ["active"],
        ignoreProperty: ["appearance"],
        ignoreAttribute: ["placement"],
      },
    ],*/

    // Disable specific imports
    "no-restricted-imports": [
      process.env.NODE_ENV === "production" ? "error" : "warn",
      {
        paths: [
          {
            name: "react-router-dom",
            importNames: ["Routes", "Link", "NavLink"],
            message: "Please use components from services/routing/components",
          },
          {
            name: "react-router-dom",
            importNames: ["useParams", "useNavigate"],
            message: "Please use hooks from services/routing",
          },
          {
            name: "formik",
            importNames: ["Formik", "Form"],
            message:
              "Please use Form from services/forms which contains Formik and Form",
          },
        ],
      },
    ],

    // Testing
    "testing-library/prefer-screen-queries": "off",
  },
};
