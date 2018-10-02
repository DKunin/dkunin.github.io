class: center, middle, nopages
background-image: url(./images/title-slide.png)

<div class="main-title">
  <h2>Lint Yourself</h2>
  <h4>Дмитрий Кунин</h4>
</div>

---
class: center, middle

### Кто я?

- Дмитрий Кунин
- avito, tech lead, trust & safety
- @dkunin

---
class: center, middle

### В конце

- ссылки на материалы
- примеры кода
- ссылка на презентацию

---
class: center, middle
### Небольшой опрос

# ?

---
class: center, middle
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

class: center, middle

### Что пакостят гремлины

- ((), {,
- foo is undefined
- var foo = 1;var foo = 3;
- == / ===
- ...

---

class: center, middle, no-padding, nopages

<img src="./images/spn_gremlins__gizmo_winchester_by_nargynargy.jpg" />

---

class: center, middle

### План

- Что делает линтер
- Как он это делает
- С чем его приготовить
- Куда его положить
- Правила для esLint
- Кастомный линтер

<div class="gizmo-walk"></div>

???

Профит - понимая как рабоатет любой линтер - его легче расширить или писать свой или дебажить

---

class: center, middle

### План

<ul>
  <li class="current-plan-step">Что делает линтер<div class="gizmo-walk-se"></div></li>
  <li class="secondary">Как он это делает</li>
  <li class="secondary">С чем его приготовить</li>
  <li class="secondary">Куда его положить</li>
  <li class="secondary">Правила для esLint</li>
  <li class="secondary">Кастомный линтер</li>
</ul>

---
class: center, middle

### Чем поможет линтер

- ~~Головная боль~~

--

- Меньше ошибок

--

- Общие стили

--

- Кастомизация


---
class: center, middle

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

class: center, middle

### План

<ul>
  <li class="secondary">Что делает линтер</li>
  <li class="current-plan-step">Как он это делает<div class="gizmo-jump"></div></li>
  <li class="secondary">С чем его приготовить</li>
  <li class="secondary">Куда его положить</li>
  <li class="secondary">Правила для esLint</li>
  <li class="secondary">Кастомный линтер</li>
</ul>

---

class: center, middle

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
class: center, middle

### План

<ul>
  <li class="secondary">Что делает линтер</li>
  <li class="secondary">Как он это делает</li>
  <li class="current-plan-step">С чем его приготовить<div class="gizmo-walk-ee"></div></li>
  <li class="secondary">Куда его положить</li>
  <li class="secondary">Правила для esLint</li>
  <li class="secondary">Кастомный линтер</li>
</ul>

---
class: center, middle

### Настройки линтеров

- .eslintrc
- .stylelintrc
- tslint.json / tslint.yaml
- .textlintrc
- package.json (!)

---

class: center, middle

### eslint-plugin-compat

package.json:
```
{
  // ...
  "browserslist": ["last 1 versions", "not ie <= 8"],
}
```

---
class: center, middle

### Тип запуска CLI

```
eslint index.js
```
![](./images/eslint-cli.png)

---

class: center, middle

### Тип запуска Editor Plugin

![](./images/eslint-sublime-plugin.png)

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

class: center, middle

### План

<ul>
  <li class="secondary">Что делает линтер</li>
  <li class="secondary">Как он это делает</li>
  <li class="secondary">С чем его приготовить</li>
  <li class="current-plan-step">Куда его положить<div class="gizmo-jackhammer"></div></li>
  <li class="secondary">Правила для esLint</li>
  <li class="secondary">Кастомный линтер</li>
</ul>

---

class: center, middle

### Как встроить его во флоу
- при сохранении
- git precommit/prepush/prerecieve
- CI-step

---

class: center, middle

### План

<ul>
  <li class="secondary">Что делает линтер</li>
  <li class="secondary">Как он это делает</li>
  <li class="secondary">С чем его приготовить</li>
  <li class="secondary">Куда его положить</li>
  <li class="current-plan-step">Правила для esLint<div class="gizmo-walk"></div></li>
  <li class="secondary">Кастомный линтер</li>
</ul>

---

class: center, middle

### Ингридиенты для кастомного плагина eslint

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

class: center, middle

### План

<ul>
  <li class="secondary">Что делает линтер</li>
  <li class="secondary">Как он это делает</li>
  <li class="secondary">С чем его приготовить</li>
  <li class="secondary">Куда его положить</li>
  <li class="secondary">Правила для esLint</li>
  <li class="current-plan-step">Кастомный линтер<div class="gizmo-walk-se"></div></li>
</ul>


---
class: center, middle

### Что нужно уметь линтеру

- Разбирать на AST
- Бегать по AST
- Выводить ошибки
- (Опционально) Исправлять ошибки

---

class: center, middle

### Подходы

- Новый синтаксис
- Расширенный синтаксис

???

- Обучаемый парсер (напр. Ohmlang) + walker + reporter
- Универсальный парсер с плагинами

---

class: middle

```
---

class: center, middle

### Подходы

- Новый синтаксис
- Расширенный синтаксис

???

- Обучаемый парсер (напр. Ohmlang) + walker + reporter
- Универсальный парсер с плагинами

---
```

---

class: center, middle

### Обучаемый парсер

- Текст в AST
- Грамматика
- Функция хождения
- Вывод ошибок

---

class: center, middle

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

class: center, middle

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

class: center, middle
codehighlight: [1, 4, 6, 11]

```
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

class: center, middle

### Кастомизация существующего (unified)

- MD => доп. токены => AST
- Правило на доп. токены
- ~~Функция хождения~~
- ~~Вывод ошибок~~

---

class: center, middle

```
function tokenClassListSeparator(process, value) {
    const match = /^class:(.+)/g.exec(value);
    if (match) {
        return process(match[0])({
            type: 'classRow',
            children: [{ type: 'classList', value: match[0] }]
        });
    }
}
```
---
class: center, middle

### Добавление правила к набору правил

```
  const visit = require('unist-util-visit');
  const reason = 'ClassName cannot be empty';

  function visitor(file) {
      return (node) => {
          ...// checking classList
          if (classList.length === 0) {
              file.message(reason);
          }
      };
  }

  function noEmptyClassList(tree, file) {
      visit(tree, 'classList', visitor(file));
  }

  module.exports = noEmptyClassList;

```

---
class: center, middle
codehighlight: [2, 3, 5, 6, 10,11]
```
//...
const noEmptyClassListToken = require('./no-empty-class-list-token');
const noEmptyClassListRule = require('./no-empty-class-list-rule');
//...
const extraRule = rule('remark-lint:no-empty-class-list-rule', noEmptyClassListRule);
guide.plugins = guide.plugins.concat(extraRule);

remark()
    .use(markdown)
    .use(noEmptyClassListToken)
    .use(guide)
    .use(html)
    .process(slides, function(err, file) {
        console.error(report(err || file));
    });

```

---

class: center, middle

### Итого

- Что делает линтер
- Как он это делает
- С чем его приготовить
- Куда его положить
- Правила для esLint
- Кастомный линтер

---

class: center, middle, nopages

![gremlin](./images/gremlin-gizrambo.jpg)

---

class: center, middle, nopages

# Вопросы?

dkun.in
@DKunin

---
class: smaller
#### Полезные материалы
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
