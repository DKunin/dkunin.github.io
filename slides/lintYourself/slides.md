class: center, middle

## Lint Yourself
##### expand one, build one

---
class: center, middle

### Кто я?

- Дмитрий Кунин
- avito.ru, tech unit lead, trust and safety
- @dkunin

---
class: center, middle

### В конце

- ссылки на материалы
- примеры кода
- ссылка на презентацию

---
class: list-center
### Небольшой опрос

- Человеческая ошибка

--

- Невнимательность

--

- Гремлины

---

class: center, middle, no-padding, nopages

<img src="./images/enter-gremlin.jpg" />

---


class: center, middle, no-padding, nopages

<img src="./images/spn_gremlins__gizmo_winchester_by_nargynargy.jpg" />

---

class: list-center

### О чем я расскажу

- Что делает линтер
- Как он это делает
- С чем его приготовить
- Куда его положить
- Собственные правила для esLint
- Кастомный линтер

???

Профит - понимая как рабоатет любой линтер - его легче расширить или писать свой или дебажить

---
class: center, middle

### Что пакостят гремлины

- Лишние скобки, недостающие скобки
- Недообъявленная переменная
- Переобъявленная переменная
- Переопределенная константа
- == вместо ===
- ...

---
class: list-center

### Чем поможет линтер

- ~~Головная боль~~

--

- Общие стили

--

- Меньше ошибок

--

- Кастомизация


---
class: list-center

### Популярные линтеры

- JSLint
<div><img src="./images/jslint.png" alt="" height="150px"></div>

--

- JSHint

--

- EsLint

--

- TsLint

--

- styleLint

--

- textLint

--

- Prettier (+-)
- ShellCheck (+-)
- WebHint (+-)

---

class: list-center

### Процесс Линтинга

- Исходный код

--

- Парсер AST

--

- Анализатор (+ плагины)

--

- Список ошибок

--

- (Опционально) Fix


---

class: middle
codehighlight: [1, 2, 4, 10]

```
var esprima = require('esprima');
var program = 'const answer = 42';

esprima.tokenize(program);
[ { type: 'Keyword', value: 'const' },
  { type: 'Identifier', value: 'answer' },
  { type: 'Punctuator', value: '=' },
  { type: 'Numeric', value: '42' } ]
  
esprima.parseScript(program);
{ type: 'Program',
  body:
   [ { type: 'VariableDeclaration',
       declarations: [Object],
       kind: 'const' } ],
  sourceType: 'script' }
```

---
class: middle, center, no-padding, nopages

![](./images/ast-explorer.png)

---
class: list-center

### Настройки линтеров

- .eslintrc
- .stylelintrc
- tslint.json / tslint.yaml
- .textlintrc
- package.json (!)

---

class: list-center

### eslint-plugin-compat

package.json:
```
{
  // ...
  "browserslist": ["last 1 versions", "not ie <= 8"],
}
```

---


### Тип запуска CLI

```bash
eslint index.js
```
![](./images/eslint-cli.png)

---

### Тип запуска Node

codehighlight: [1, 2, 11, 14]

```
const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine({
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    'no-unused-vars': 'off',
  }
});

const report = cli.executeOnText("let foo = 'bar';;").results[0];

if (report.errorCount) {
  console.log(report.messages);
} else {
  console.log('No errors');
}
```

---

class: list-center

### Как встроить его во флоу
- при сохранении
- git precommit/prepush/prerecieve
- CI-step

---

class: list-center

### Ингридиенты для кастомного планига eslint

- Конфиг
- Функция
- Фикс
- Пре/постпроцессинг
- Тесты

---

### Пример правил eslint

codehighlight: [2, 5]

```
{
    "plugins": [
        "@avito/custom-rules"
    ],
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"],
        "@avito/custom-rules/prefer-js-prefix": [1, { "multiline": true }],
        ...
    }
}
```

---

### Кастомное правило eslint

codehighlight: [3, 6, 7, 14]

```
module.exports = {
    meta: { ... },
    create: function(context) {
        // context => parserOptions/ruleId/options/settings etc.
        return {
            CallExpression: function(node) {
                if (
                    getNestedProperty(node, 'callee.property.name') ===
                        'querySelector' &&
                    !getNestedProperty(node, 'arguments.0.value').startsWith(
                        '.js-'
                    )
                ) {
                    context.report(
                        node,
                        'Use js-* prefix for accessing DOM nodes',
                        function(fixer) {
                          return ...;
                        }
                    );
                }
            }
        };
    }
};
```

---

codehighlight: [8, 9, 14]

```
const rule = require('./prefer-node-suffix');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig(...);

const ruleTester = new RuleTester();

ruleTester.run('prefer-node-suffix', rule, {
    valid: [
        'const itemsNode = document.querySelector(".js-items");',
        'const obj = {}; obj.tabsNode = itemsNode.querySelector(".js-tabs");'
    ],

    invalid: [
        {
            code: 'const items = document.querySelector(".js-items");',
            errors: [
                {
                    message: 'Use postfix Node, when accessing DOM nodes, items => itemsNode',
                    type: ''
                }
            ]
        }
    ]
});
```
---

class: center, middle

### Пре/постпроцессинг


```
processors: {
    ".ext": {
        preprocess: function(text, filename) {
            return [string];
        },
        postprocess: function(messages, filename) {
            return [Message];
        },
        supportsAutofix: true
    }
}
```

---

codehighlight: [4, 12, 13]

### Кастомное правило tslint

```
  import * as ts from "typescript";
  import * as Lint from "tslint";

  export class Rule extends Lint.Rules.AbstractRule {
      public static FAILURE_STRING = "import statement forbidden";

      public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
          return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
      }
  }

  class NoImportsWalker extends Lint.RuleWalker {
      public visitImportDeclaration(node: ts.ImportDeclaration) {
          // ... some logic ...
          this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
          super.visitImportDeclaration(node);
      }
  }
```


---

### Кастомное правило stylelint

```
var stylelint = require("stylelint")

var ruleName = "plugin/foo-bar"
var messages =  stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected ...",
})

module.exports = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptionObject) {
  return function(postcssRoot, postcssResult) {
    var validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, { .. })
    if (!validOptions) { return }
    // ... some logic ...
    stylelint.utils.report({ .. })
  }
})

module.exports.ruleName = ruleName
module.exports.messages = messages
```

---

### Кастомное правило textlint

```
import { parse } from "txt-to-ast";
export default class TextProcessor {
    constructor(options = {}) {
        this.options = options;
        this.extensions = this.config.extensions ? this.config.extensions : [];
    }
    availableExtensions() {
        return [".txt", ".text"].concat(this.extensions);
    }
    processor(ext) {
        return {
            preProcess(text, filePath) {
                return parse(text);
            },
            postProcess(messages, filePath) {
                // Lint logic
                return {
                    messages,
                    filePath: filePath ? filePath : "<text>"
                };
            }
        };
    }
}
```

---
class: list-center

### Что нужно уметь линтеру

- Разбирать на AST
- Бегать по AST
- Выводить ошибки
- (Опционально) Исправлять ошибки

---

class: list-center

### Подходы

- Новый синтаксис
- Расширенный синтаксис

???

- Обучаемый парсер (напр. Ohmlang) + walker + reporter
- Универсальный парсер с плагинами

---

```
---

class: list-center

### Подходы

- Новый синтаксис
- Расширенный синтаксис

???

- Обучаемый парсер (напр. Ohmlang) + walker + reporter
- Универсальный парсер с плагинами

---
```

---

class: list-center

### Обучаемый парсер

- Текст в AST
- Грамматика
- Функция хождения
- Вывод ошибок

---

class: list-center

### Обучаемый парсер

```
NLDatalog.grammar = ohm.grammar(`
  NLDatalog {
    Rules
      = ListOf<Rule, "\\n">
    Rule
      = Clause          -- fact
    Clause
      = ( classRow | word )+
    word = wordChar+
    classDecl = "class: "
    classRow = classDecl (className ("," className)*)*
    className = classChar+
    classChar = ~(eol | "," | "\\n") any
    wordChar = any
    eol = "\\r"? "\\n"
  }
`);
```

---
```
RemarkJSSlider.semantics = RemarkJSSlider.grammar
  .createSemantics()
  .addOperation('toAST', {
    Rules(rules) {
      return new Program(rules.toAST());
    },

    Rule_fact(head) {
      return new Rule(head.toAST(), []);
    },
    ...
```
---

codehighlight: [1, 4, 6, 11]

```javascript
const walker = new ASTWalker();

const linter = {
  ClassRow(node, parent) {
    if (node.classNames.length === 0) {
      throw new Error('No ClassRows should be empty');
    }
  }
}

walker.traverse(ast,
{
   enterNode: (node, parent) =>
   {  
      if (node.type && linter[node.type]) {
        linter[node.type](node, parent)
      }
   }
});
```

---

class: list-center

### Кастомизация существующего (unified)

- Markdown => доп. токены => AST
- Правило на доп. токены
- ~Функция хождения~
- ~Вывод ошибок~

---

class: center, middle

```
function tokenSlideSeparator(eat, value, silent) {
  var match = /^={1,3}/g.exec(value);

  if (match) {
    if (silent) {
      return true;
    }

    return eat(match[0])({
      type: 'slideBreak',
      children: [{type: 'text', value: match[0]}]
    });
  }
}
```
---

### [WIP] Добавление правила к набору правил

---
class: center, middle, nopages

![gremlin](./images/gremlin-gizrambo.jpg)

---



class: center, middle, nopages

# Вопросы?

.blue[dkun.in]
.blue[@DKunin]


---

# Полезные материалы
- https://eslint.org/docs/developer-guide/working-with-plugins
- https://stylelint.io/developer-guide/plugins/
- https://palantir.github.io/tslint/develop/custom-rules/
- https://github.com/dustinspecker/awesome-eslint
- https://github.com/caramelomartins/awesome-linters
- https://github.com/SAP/chevrotain
- https://github.com/acornjs/acorn
- https://github.com/jquery/esprima
- https://github.com/sindresorhus/awesome-lint
- https://github.com/syntax-tree/unists
- https://github.com/unifiedjs/unified
- https://github.com/DKunin/ohm-example
- https://github.com/DKunin/unified-test