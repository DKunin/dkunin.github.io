class: center, middle

## Lint Yourself
##### expand one, build one
---
class: center, middle
## Кто я такой

- Дима Кунин
- Tech Unit Lead Trust&Safety Avito
- @dkunin
- dkun.in

---

## О чем я расскажу

- Что делает линтер
- Какую он приносит пользу
- Как работает линтер
- Как написать собственные правила для esLint
- Как написать собственный кастомный линтер
- Как встроить его во флоу

---

## Lint

Wiki: Undesirable bits of fiber and fluff found in sheep's wool

---

#### В чем преимущества линтинга

- Возможность сосредоточится на самых сложных аспектах програмирования

--

- Общие стили для распределенных команд (код пишет "один" человек)

--

- Меньше ошибок

--

- Возможность кастомизации линтеров

???

Нацелен на ускорение кода, защиту от мелких нежелательных кусков fiber and fluff
Линтер запускается перед тестами, приводит к единому своду правил

---

## Разница юнит тестов и линтеров

- Т: Проверяют параметры на входе/выходе
- Л: Проверяют исходный код

???

Линтеры и тесты не исключают, а дополняют друг-друга

---

## Популярные линтеры

- JSLint/JSHint

--

- Eslint (Standart)

--

- TsLint

--

- stylelint

--

- webhint.io

--

- Prettier

---

## Процесс Линтинга

- Исходный код
- Парсер AST (https://github.com/acornjs/acorn, https://github.com/jquery/esprima)
- Анализатор
- Список ошибок
- (Опционально) Fix

---
```
  > var esprima = require('esprima');
  > var program = 'const answer = 42';

  > esprima.tokenize(program);
  [ { type: 'Keyword', value: 'const' },
    { type: 'Identifier', value: 'answer' },
    { type: 'Punctuator', value: '=' },
    { type: 'Numeric', value: '42' } ]
    
  > esprima.parseScript(program);
  { type: 'Program',
    body:
     [ { type: 'VariableDeclaration',
         declarations: [Object],
         kind: 'const' } ],
    sourceType: 'script' }
```

---
## Настройки линтеров
### Конфиг файлы

- .eslintrc
- .stylelintrc
- tslint.json / tslint.yaml
- web.config

---
## Настройки линтеров
### Тип запуска

- CLI
- code
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
## Пример правил eslint

```
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
#### Разработка кастомного правила для eslint

```
/**
 * Получить вложенное свойство
 * @param {Object} object
 * @param {string} path
 * @return {?}
 */
function getNestedProperty(object = {}, path = '') {
    return path.split('.').reduce((prop, step) => {
        if (prop && prop[step]) {
            return prop[step];
        }

        return '';
    }, object);
}

module.exports = {
    create: function(context) {
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

## Кастомный плагин для tslint

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

## Кастомный плагин для stylelint

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

## Кастомный плагин для webhint

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

## Как разработать кастомный линтер
- https://github.com/SAP/chevrotain

---
## AST = :power:
- Имея Абстрактное синтаксическое дерево - вы можете все что угодно

---

## Демо
- Пример собственного линтера для системы слайдов Remark

---

## Как встроить его во флоу
- при сохранении
- при коммите/пуше
- CI-step

---
class: center, middle, nopages
# Вопросы?

.blue[dkun.in]

.blue[@DKunin]