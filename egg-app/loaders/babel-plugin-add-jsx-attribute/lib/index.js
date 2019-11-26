"use strict";

exports.__esModule = true;
exports.default = void 0;
const fs = require('fs-extra')
const positionMethod = {
  start: 'unshiftContainer',
  end: 'pushContainer'
};
const trackIdmap = {}

const addJSXAttribute = ({
  types: t,
  template
}, opts) => {
  let moduleNameId = ''
  function getAttributeValue({
    literal,
    value
  }) {
    if (typeof value === 'boolean') {
      return t.jsxExpressionContainer(t.booleanLiteral(value));
    }

    if (typeof value === 'number') {
      return t.jsxExpressionContainer(t.numericLiteral(value));
    }

    if (typeof value === 'string' && literal) {
      return t.jsxExpressionContainer(template.ast(value).expression);
    }

    if (typeof value === 'string') {
      return t.stringLiteral(value);
    }

    return null;
  }

  function getAttribute({
    spread,
    name,
    value,
    literal
  }) {
    if (spread) {
      return t.jsxSpreadAttribute(t.identifier(name));
    }

    return t.jsxAttribute(t.jsxIdentifier(name), getAttributeValue({
      value,
      literal
    }));
  }

  return {
    visitor: {
      ClassDeclaration(path, stats) {
        const moduleName = path.node.id.name
        const absoultFilePath = stats.file.opts.filename;
        const fileName = absoultFilePath.replace(/(.*\/)*([^.]+).*/ig, '$2');
        const projectPath = process.cwd()
        moduleNameId = `${encodeURI(`${fileName}-${moduleName}`)}`
        trackIdmap[moduleNameId] = 1;
        fs.writeFile(`${projectPath}/build/statics/track-assets.json`, JSON.stringify(trackIdmap), (err) =>{
          console.log(err)
        })
      },
      JSXOpeningElement(path) {
        if (!opts.elements.includes(path.node.name.name)) { return };

        opts.attributes.forEach(({
          name,
          value = null,
          spread = false,
          literal = false,
          position = 'end'
        }) => {
          const method = positionMethod[position];
          const newAttribute = getAttribute({
            spread,
            name,
            value,
            literal
          });
          newAttribute.value.value = moduleNameId
          const attributes = path.get('attributes');

          const isEqualAttribute = attribute => {
            if (spread) {
              return attribute.get('argument').isIdentifier({
                name
              });
            }

            return attribute.get('name').isJSXIdentifier({
              name
            });
          };

          const replaced = attributes.some(attribute => {
            if (!isEqualAttribute(attribute)) {return false};
            attribute.replaceWith(newAttribute);
            return true;
          });

          if (!replaced) {
            path[method]('attributes', newAttribute);
          }
        });
      }
    }
  };
};

var _default = addJSXAttribute;
exports.default = _default;