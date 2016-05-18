---

### Ленивые последовательности

    var oddSquares = Immutable.Seq.of(1,2,3,4,5,6,7,8)
      .filter(x => x % 2).map(x => x * x);

    console.log(oddSquares.get(1)); // 9


class: center, middle

## Immutable + Persistent 

---

### Принцип работы
.bigcode[
  # 
    var list = Immutable.List.of(1,2,3);
    var list2 = list.push(4);

    console.log(list.toJS()) // [1,2,3] 
    console.log(Immutable.is(list,list2)) // false
]

---

### Принцип работы

.bigcode[
  # 
    List.prototype.push = function(value){
      // Делаем клон
      var clone = deepCopy(this);
      // Меняем значение в клоне
      clone[clone.length] = value;
      // Вовзращаем клон
      return clone;  
    }

]
---

### Скорость работы

.row[ .side.side-one[
  # 
    var list = [];
    for(var i=0;i < 1000000;i++) {
      list.push(i);
    }
]
.side[
# vanilla: 83 ms
] ]
.row[.side.side-one[
  # 
    var list = mori.vector();
    for (var i=0; i < 1000000; i++) {
      mori.conj(list, i);
    }
]
.side[
# mori: 288 ms
]]

---

### Направленный ациклический граф
.center.middle[
.image[![](slide1.png)]
]
---

class: center, middle
.image[![](slide2.png)]

---
class: center, middle
.image[![](slide3.png)]

---
class: center, middle

.image[![](slide4.png)]

---
class: center, middle

.image[![](slide5.png)]

---
class: center, middle

.image[![](slide6.png)]
---
class: center, middle

.image[![](slide7.png)]
---
class: center, middle

.image[![](slide8.png)]

---

### Готовые библиотеки

.block.narrow[
* .red[immutable.js]
* .red[mori]
* seamless-immutable
* immutato
* pim
* seti
* texo
* ancient-oak
]
---

class: center, middle
name: why

# Зачем использовать?

---

template: why

# .red[Решать проблемы!]

---

### Мутирующие объекты могут мутировать :)))
.narrow[
  # 
    var identity = "Федор";
    ...
    identity = "Федор Петрович";
    ...
    identity = "Косой";
    ]

---

class: center, middle

# Интерфейс .red[должен] следить за изменениями

---

### Слушатели событий
    
    var userData = {
                    name:"Федор",
                    online:true,
                    profilePic: "/url/user1.png"
                  };

    Object.observe(userData, function(changes){
      rerenderProfile();
    });

    userData.name = "Федор Петрович";
    userData.online = false;
    userData.profilePic = "/newurl/user2.png";

---

class: middle

# 

    var userData = { ... };
    Object.observe(userData, ... );
    userData.name.nickname = "Косой"; // Изменения не замечены

---

### "Грязная" проверка Грязные танцы

    var userData = {
        dirty: false,
        _raw: { name: "Федор Петрович",
                online: true,
                profilePic: "/url/user1.png"},
        get: function(key){
            return this._raw[key] 
        },
        set: function(key, newValue){
            this._raw[key] = newValue;
            this.dirty = true;
        }
    }

---

.invisible[#] 

    funtion renderProfile(data) {
        if(!data.dirty) return;
        data.dirty = false;
        ...
    }

    userData.set("online", true);

    renderProfile(userData); // ok

---
#### 
    funtion renderProfile(data) {
        if(!data.dirty) return;
        data.dirty = false;
    }

    funtion renderContactItem(data) {
        if(!data.dirty) return;
        data.dirty = false;
    }    

    data.set("online", true);

    renderProfile(userData); // ok
    renderContactItem(userData); // dirty = false; no render


---

### Сравнение Immutable объектов / списков  

    var user1 = Immutable.Map({ 
                name: "Федор Петрович",
                online: true,
                profilePic: "/url/user1.png"}); 
--
    
    var user2 = user1.set("name", "Косой");
    console.log(Immutable.is(user1, user2)); // false    

--
    
    var user3 = user2.set("name", "Федор Петрович");
    console.log(Immutable.is(user1, user3)); // true


---
### Глубокое сравнение

    var user1 = Immutable.Map({
      skills: Immutable.Map({str: 23, int: 18, luck: 99}), 
      category: Immutable.Map({gentelaman: true})
    });
--
    var user2 = user1.setIn(["skills", "int"], 0);

    Immutable.is(user2 , user1)   
--
    Immutable.is(second.get("skills") , first.get("skills")) //false
--
    Immutable.is(second.get("category"), first.get("category")) //true 

---

class: middle, center

# Плюшки

---

### Отсутствие побочных эффектов

.middle[
# 
    function updateValueAndLog(updateFunction) {
      var data = {name: "Федор"};
      updateFunction(data);
      console.log(data); // ?
    }]
--
.middle[# 
    var user = Immutable.Map({ 
                name: "Федор Петрович",
                online: true,
                profilePic: "/url/user1.png"});

    var userClone = user;
]


---

class: middle, center

# Практически бесплатный undo/redo
---
class: center, middle

# .red[Как] пользоваться?

---
### Массивы

    var list1 = Immutable.List.of(1, 2);
    assert(list1.size === 2);
    
    var list2 = list1.push(3, 4, 5);
    assert(list2.size === 5);
    
    var list3 = list2.unshift(0);
    assert(list3.size === 6);
    
    var list4 = list1.concat(list2, list3); 
    assert(list4.size === 13);
  
    assert(list4.get(0) === 1);

---

### Объекты

    var user1 = Immutable.Map({ 
                name: "Федор Петрович",
                online: true,
                profilePic: "/url/user1.png"});

    var user2 = user1.set("name", "Косой");
    
    user1.get("name"); // "Федор Петрович"
    user2.get("name"); // "Косой"

---

### Принимает и возвращает обычные JS объекты

    var user1 = Immutable.Map({ 
                name: "Федор Петрович",
                online: true,
                profilePic: "/url/user1.png"});

    var stat  = { name:"Косой", age: 37 };
    var user2 = user1.merge(stat);

    console.log(user2.toJS()) 
    // { name: "Косой", 
    //  online: true, 
    //  profilePic: "/url/user1.png",
    //  age: 37 }

---

### Многое другое

* Stack
* OrderedMap
* Set
* OrderedSet
* Record

---

### Групповые операции

    var traits1 = Immutable.List.of("communication","luck","skill");
    var traits2 = traits1.withMutations(function (traits) {
      traits.push("dexterity").push("power").push("speed");
    });
    assert(traits1.size === 3);
    assert(traits2.size === 6);

---
class: center, middle
name: almost-final
## Стоит пощупать в следующем проекте? 

---
template: almost-final

# .red[Да!] 

---