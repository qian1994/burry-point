const path = require('path')
module.exports = function(api) {

    api.cache(true);
  
    console.log('-----babel start----');
  
  
    const presets = [
      ["@babel/preset-env", {
        useBuiltIns: "usage",
        }
      ],
    //   "@babel/preset-flow",
    ];
  
    const plugins = [
      "@babel/plugin-transform-modules-commonjs",
      "@babel/plugin-proposal-object-rest-spread",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-react-jsx",
    //   ["@babel/plugin-transform-react-jsx", { pragma: "Nerv.createElement" }],
      ["import", { libraryName: "antd", libraryDirectory: "es", style: "less" }, "ant"],
      ["import", { libraryName: "antd-mobile", libraryDirectory: "es", style: "less" }, "antd-mobile"],
      [
        path.resolve(__dirname, 'loaders/babel-plugin-add-jsx-attribute'),
        {
          "elements": ["div"],
          "attributes": [
            {
              "name": "cvte-track-id",
              "value": "asdfsd",
            }
          ]
        }
      ]
    ];
  
    return {
      presets,
      plugins
    };
  };
  