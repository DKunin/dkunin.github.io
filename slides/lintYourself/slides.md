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

- Чем помогает линтер
- Как он это делает
- С чем его приготовить
- Куда его положить
- Правила для esLint
- Кастомный линтер

<div class="gizmo-walk"></div>

???

Профит - понимая как работает любой линтер - его легче расширить или писать свой или дебажить

---

class: center, middle

### План

<ul>
  <li class="current-plan-step">Чем помогает линтер<div class="gizmo-walk-se"></div></li>
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

- Единый контракт

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
- styleLint
- textLint

---
class: center, middle

### Окололинтерье

- Prettier
- ShellCheck
- WebHint
- SonarTS

---

class: center, middle

### План

<ul>
  <li class="secondary">Чем помогает линтер</li>
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
  <li class="secondary">Чем помогает линтер</li>
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
  <li class="secondary">Чем помогает линтер</li>
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
  <li class="secondary">Чем помогает линтер</li>
  <li class="secondary">Как он это делает</li>
  <li class="secondary">С чем его приготовить</li>
  <li class="secondary">Куда его положить</li>
  <li class="current-plan-step">Правила для esLint<div class="gizmo-walk"></div></li>
  <li class="secondary">Кастомный линтер</li>
</ul>

---

class: center, middle

### Ингредиенты для кастомного плагина eslint

- Конфиг
- Функция
- Фикс
- Пре/постпроцессинг
- Тесты

---
class: center, middle

### Какую проблему решаем

```
// 👎 
document.querySelector('.items');

// 👍
document.querySelector('.js-items');

```

---

### Пример правил eslint

codehighlight: [3, 9]

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

codehighlight: [2, 5, 6, 13]

```
module.exports = {
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
              'Use js-* prefix for accessing DOM nodes');
        }
      }
    };
  }
};
```

---

codehighlight: [5, 8]

```
const rule = require('./prefer-node-suffix');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();
ruleTester.run('prefer-node-suffix', rule, {
    valid: [
        'const itemsNode = document.querySelector(".js-items");',
        'const obj = {}; obj.tabsNode = itemsNode.querySelector(".js-tabs");'
    ],
    invalid: [
        {
            code: 'const items = document.querySelector(".items");',
            errors: [...]
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

class: center, middle

### Пример правила tslint
```
// 👎 
class Barman {
    ...
}
// 👍
class Barista {
    ...
}

```


---

codehighlight: [4, 5, 6, 7]

### Кастомное правило tslint

```
  import * as ts from "typescript";
  import * as Lint from "tslint";

  class NoBarmenWalker extends Lint.RuleWalker {
      public visitClassDeclaration(node: ts.ImportDeclaration) {
          if (node.name.text === 'Barman') {
              this.addFailure(this.createFailure(
                node.name.getStart(),
                node.name.getWidth(),
                Rule.FAILURE_STRING)
              );
          };
          //...
      }
  }

```

---

class: center, middle

### План

<ul>
  <li class="secondary">Чем помогает линтер</li>
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

- Кастомный токенизатор (напр. Ohmlang) + walker + reporter
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

- Кастомный токенизатор (напр. Ohmlang) + walker + reporter
- Универсальный парсер с плагинами

---
```

---

class: center, middle

### Кастомный токенизатор

- Текст в AST
- Грамматика
- Функция хождения
- Вывод ошибок

---

class: center, middle
codehighlight: [3, 9, 10]

### Кастомный токенизатор

```
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
```

---

class: center, middle
codehighlight: [1, 3]

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
codehighlight: [1, 5, 7, 8, 14]

```
const walker = new ASTWalker();

walker.traverse(ast,
{
   enterNode: (node, parent) =>
   {  
      if (node.type && linter[node.type]) {
        linter[node.type](node, parent)
      }
   }
});

const linter = {
  ClassRow(node, parent) {
    if (node.classNames.length === 0) {
      throw new Error('No ClassRows should be empty');
    }
  }
}
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
codehighlight: [2, 5]

```
function tokenClassListSeparator(process, value) {
    const match = /^class:(.+)/.exec(value);
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
codehighlight: [4, 7, 13]

### Добавление правила к набору правил

```
  const visit = require('unist-util-visit');
  const reason = 'ClassName cannot be empty';

  function noEmptyClassList(tree, file) {
      visit(tree, 'classList', (file) => {
        return (node) => {
            const classList = node.value
              .replace('class:', '')
              .split(',')
              .map(singleClassName => singleClassName.trim())
              .filter(Boolean);

            if (classList.length === 0) {
                file.message(reason);
            }
        };
      });
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

- Чем помогает линтер
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

- dkun.in
- @DKunin
- https://bit.ly/fec-lint

<img src="./images/qrcode.png" alt="" width="400px" class="qr-code">

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
- https://github.com/SonarSource/SonarTS