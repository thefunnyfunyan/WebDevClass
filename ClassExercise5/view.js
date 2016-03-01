var fs = require('fs');

function render(template, params){
  var templateString = fs.readFileSync(template, {encoding: "utf-8"});
  return build(templateString, params);
}

function build(template, params){
  return template.replace(/<%(.*?)%>/g, function(match, code){
      if(code.startsWith("=")) return eval(code.substr(1));
      eval(code);
      return "";
  });
}

module.exports = exports = {render: render}
