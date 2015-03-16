--

# Immutable Data
## Неизменяемые данные в приложении: что, как и зачем
Дмитрий Кунин, AT-Consulting, senior front end developer

--
### План

* Что
* Как
* Зачем

--

### Что такое неизменямые данные

* Данные которые не меняются
* Persistance Data, Immutable Data
[http://www.diyphotography.net/files/images/6/ben-trails-05.jpg]
--

### Готовые библиотеки

* immutable.js
* seamless-immutable
* immutato
* pim
* seti
* texo

--

### Принцип работы

* Вместо мутирования сужещствующего значения - каждый раз создается новый объект

        var list = I.List.of(1,2,3);
        var list2 = list.push(4);

        console.log(list.toJS()) // 1,2,3
        console.log(list === list2) // false

--

### Клонирование объекта

        var map1 = Immutable.Map({a:1, b:2, c:3});
        var clone = map1;

--


### Сравнение объектов

        var map1 = I.Map({a:1, b:2, c:3});
        var map2 = map1.set('b', 2);
        console.log(map1 === map2); // no change
        var map3 = map1.set('b', 50);
        console.log(map1 !== map3); // change
--


### В чем преимущества

* Безстатусная работа
* Приложение может быть чистой функцией

