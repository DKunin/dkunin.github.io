class: center, middle

## Lint Yourself
##### expand one, build one
---
class: center, middle

### Кто я?

- Дмитрий Кунин
- avito.ru, tech unit lead, trust and safety
- @dkunin
- dat://fritter.dkun.in

---

### О чем я расскажу

- Что делает линтер
- Как он это делает
- С чем его приготовить
- Куда его положить
- Собственные правила для esLint
- Кастомный линтер

---

### Lint

Wiki: Undesirable bits of fiber and fluff found in sheep's wool

---

### В чем преимущества линтинга

- ~~Головная боль~~

--

- Общие стили

--

- Меньше ошибок

--

- Кастомизация

???

Нацелен на ускорение кода, защиту от мелких нежелательных кусков fiber and fluff
Линтер запускается перед тестами, приводит к единому своду правил

---

### Популярные линтеры

- JSLint/JSHint

--

- Eslint

--

- TsLint

--

- stylelint

--

- textlint

--

- webhint.io

--

- Prettier (+-)

---

### Процесс Линтинга

- Исходный код
- Парсер AST
- Анализатор (+ плагины)
- Список ошибок
- (Опционально) Fix

???

(https://github.com/acornjs/acorn, https://github.com/jquery/esprima)

---

class: middle

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
### Настройки линтеров

- .eslintrc
- .stylelintrc
- tslint.json / tslint.yaml
- web.config

---

### Тип запуска CLI

```

eslit ... --output...

```
---

### Тип запуска CLI

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

### Как встроить его во флоу
- при сохранении
- при коммите/пуше/перед приемкой
- CI-step

---

### Пример правил eslint

```json
{
    "plugins": [
        "plugin1"
    ],
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"],
        "plugin1/rule1": "error"
    }
}
```

---

### Кастомное правило eslint

```
module.exports = {
*     create: function(context) {
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
                        'Use js-* prefix for accessing DOM nodes'
                    );
                }
            }
        };
    }
};
```

---
### Кастомное правило eslint

```
module.exports = {
     create: function(context) {
        return {
*            CallExpression: function(node) {
                if (
                    getNestedProperty(node, 'callee.property.name') ===
                        'querySelector' &&
                    !getNestedProperty(node, 'arguments.0.value').startsWith(
                        '.js-'
                    )
                ) {
                    context.report(
                        node,
                        'Use js-* prefix for accessing DOM nodes'
                    );
                }
            }
        };
    }
};
```
---

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

  // The walker takes care of all the work.
  class NoImportsWalker extends Lint.RuleWalker {
      public visitImportDeclaration(node: ts.ImportDeclaration) {
          // create a failure at the current position
          this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));

          // call the base version of this visitor to actually parse this node
          super.visitImportDeclaration(node);
      }
  }
```


---

### Кастомное правило stylelint

```
// Abbreviated example
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

### Кастомное правило webhint

```
import { Category } from 'hint/dist/src/lib/enums/category';
import { FetchEnd, IHint, HintMetadata } from 'hint/dist/src/lib/types';
import { HintContext } from 'hint/dist/src/lib/hint-context';

export default class MyNewHint implements IHint {
    public static readonly meta: HintMetadata = {}

    public constructor(context: HintContext) {
        // Your code here.

        const validateFetchEnd = (fetchEnd: FetchEnd) => {
            // Code to validate the hint on the event fetch::end.
        }

        const validateElement = (element: ElementFound) => {
            // Code to validate the hint on the event element::element-type.
        }

        context.on('element', validateElement);
        context.on('fetch::end::*', validateFetchEnd);
        // As many events as you need, you can see the
        // list of events [here](../../connectors/events/).
    }
}
```

---

### Как разработать кастомный линтер
- https://github.com/SAP/chevrotain

---

### AST = :power:
- Имея Абстрактное синтаксическое дерево - вы можете все что угодно

---

### Демо
- Пример собственного линтера для системы слайдов Remark

---

class: center, middle, nopages

# Вопросы?

.blue[dkun.in]

.blue[@DKunin]