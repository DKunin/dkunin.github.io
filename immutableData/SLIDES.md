--

# Immutable Data
## Неизменяемые данные в приложении: что, зачем и как
Дмитрий Кунин, AT-Consulting, senior front end developer

--

### План

* Что
* Зачем
* Как

--

### Что

* Данные которые не меняются
* Persistance Data, Immutable Data

![](http://www.diyphotography.net/files/images/6/ben-trails-05.jpg)

--

### Принцип работы

* Вместо мутирования существующего значения - каждый раз создается новый объект

        var list = I.List.of(1,2,3);
        var list2 = list.push(4);

        console.log(list.toJS()) // 1,2,3
        console.log(list === list2) // false

--

### Готовые библиотеки

* immutable.js
* mori
* seamless-immutable
* immutato
* pim
* seti
* texo
* ancient-oak

--

### Высокая скорость работы за счет дерева бинарных ключей



--
### Отличия значений и идентификатора



--

# Зачем

--

### Сложность сохранения состояния

* Слушатели событий
* "Грязное" состояние

--

### Сравнение объектов / списков

* Необходмио проверить только root node

        var map1 = I.Map({a:1, b:2, c:3});
        var map2 = map1.set('b', 2);
        console.log(I.is(map1, map2)); // нет изменений, данные одинаквы
        var map3 = map1.set('b', 50);
        console.log(I.is(map1, map3)); // есть изменения

--
### Отсутсвие побочных эфектов

* Защита от изменений наших данных
    - от внешних модулей
    - от функций

--

### Простое клонирование объекта

        var map1 = Immutable.Map({a:1, b:2, c:3});
        var clone = map1;

--

# Практически бесплатный undo/redo


--
### Добавление простой логики мемоизации


--
### Нет необходимости защитного копирования


--

# Как

--
### Массивы

        var list1 = Immutable.List.of(1, 2);
        var list2 = list1.push(3, 4, 5);
        var list3 = list2.unshift(0);
        var list4 = list1.concat(list2, list3);
        assert(list1.size === 2);
        assert(list2.size === 5);
        assert(list3.size === 6);
        assert(list4.size === 13);
        assert(list4.get(0) === 1);

--

### Объекты

        var map1 = Immutable.Map({a:1, b:2, c:3});
        var map2 = map1.set('b', 50);
        map1.get('b'); // 2
        map2.get('b'); // 50

--


### Многое другое

* Stack
* OrderedMap
* Set
* OrderedSet
* Record


--
### Принимает и возвращает обычные JS объекты

        var map1 = Immutable.Map({a:1, b:2, c:3, d:4});
        var map2 = Immutable.Map({c:10, a:20, t:30});
        var obj = {d:100, o:200, g:300};
        var map3 = map1.merge(map2, obj);

        console.log(map3.toJS()) // { a: 20, b: 2, c: 10, d: 100, g: 300, o: 200, t: 30 }

--

### Ленивые последовательности

        var oddSquares = Immutable.Seq.of(1,2,3,4,5,6,7,8)
          .filter(x => x % 2).map(x => x * x);

        console.log(oddSquares.get(1)); // 9

--

### Групповые операции

        var list1 = Immutable.List.of(1,2,3);
        var list2 = list1.withMutations(function (list) {
          list.push(4).push(5).push(6);
        });
        assert(list1.size === 3);
        assert(list2.size === 6);

--
## Стоит ли бросаться переделывать существующие проекты?

--
## Стоит пощупать в следующем? 

--
# Вопросы?

Дмитрий Кунин

http://dkun.in/

--