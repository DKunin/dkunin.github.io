
class: center, middle

## Dat Protocol
![](./images/dat-hexagon.svg)
---
class: center, middle

### Кто я?

- Дмитрий Кунин
- avito.ru, tech unit lead, trust and safety
- @dkunin
- dat://fritter.dkun.in

---

class: center

### Про что я расскажу

--
<div class="emoji middle">💕</div>

???
Вы думали, что пришли на технический доклад? Но нет - это история любви!

---

class: center, middle

### Знакомьтесь

<div class="emoji">
👨  👩
</div>

???

Знакомьтесь Саша и Люба, живут в соседних квартирах и очень любят друг друга. Поет пишет поэмы и посвящает ей. 

---

class: center, middle


<div class="emoji">
👨 => 🗒 => 📕
</div>
--
<div class="emoji">
👩 <=> 📕
</div>

???

Но он не передает им их напрямую, он идет к издателю, который берет его поэмы и печатает книги. Потом чтобы возлюбленной прочитать поэмы ей же посвященные ей необходимо прийти к издателю и попросить книгу. 

---

class: center, middle

<div class="emoji">
🤷🏽
</div>
### Ничего не напоминает?

---
class: center, middle
![](./images/server_client.png)

---
class: list-center

### Минусы

- отказ в публикации

--

- потеря контента

--

- владение контентом

--

- невозможность смены

---
class: center, middle

### Может есть способ получше?

--

#### Есть p2p, но как?

---
class: center, middle

### Торренты!

???
- Кто знает торренты? Кто знает как они работают? Кто качал когда нибудь пиратский контент с торрентов?

---
class: center, middle

<div class="emoji">
👨 -> 🗒️ -> 📕 => .torrent => 👩
</div>

---
class: list-center

### Минусы

- Перепубликация

--

- Нет диффов

--

- Возможно обнаружить

???

- Если передавать новый стих, либо надо его добавлять в новую книгу
- Чтобы обновить файлы нужно обновлять сам торрент.
- Нет диффов, надо грузить файлы заново, начинаются проблемы при больших объемах данных.
- Если "читателей много" - надо всем потом вручную обновлять
- Что если Саша хочет, чтобы поэмы прочитала только Люба?

---

class: center, middle

### Dat-protocol

![](./images/dat-hexagon.svg)
<br/>
Decentralized Archive Transport Protocol (Dat)

???

Open-source nodejs ecosystem solution

---

class: list-center, center, list-center-emoji

- <span class="emoji">👨</span> => <span class="emoji">🗒</span> => files

--

- files => dat share => priv key => dat://abc...d68/ (pub key)

--

- dat://abc...d68/ => <span class="emoji">👩</span>

???
- Саша пишет свои поэмы в файле, зашифровывая их приватным ключом
- Отдает поэмы Любе передавая их сразу с публичным ключом
- Только имея публичный ключ можно расшифровать данные, по этому же публичному ключу - невозможно подделать контент
- Если Саша хочет чтобы его читали многие - он просто формирует папочку с поэмами доступынми всем и раздает ее и отдельную папочку, которую видит только Люба

---
class: center, middle

![](./images/dat-showcase.gif)

???
pic: demo-time

Попробую сейчас выступить в роли и Саши и Любы. 
Вот несколько файлов. Я просто устанавливаю dat-cli и теперь я могу расшарить эту папку кому угодно.
Теперь я притворяюсь любой и могу читать те же файлы
Как только я добавлю новую поэму - у Любы она сразу же появится

Сценарий:

Благодаря протоколу Dat - мы фактически просто реплицируем файловую структуры из одного место в другое

Вот папка с записями - выглядит как простой набор файлов в формате md.
Чтобы поделится этой папкой с любой - я просто говорю команду `dat share`
И все процесс запущен (этот процесс также можно запустить с помощью не cli приложений, об этом позже)
Теперь представим, как это выглядит у Любы - Саша присылает ей ссылку, она используя терминал или приложение делает копию и все - теперь у нее - точная копия файлов Саши
До тех пор пока процессы синхронизации запущены - файлы будут дублироваться.

---

class: center, middle

# P2P Swarm

???

При добавлении новых точек доступа - нагрузка на данные сокращается
Картинка, показывающая растущую сеть
Показать гифку пропаганирующих данных

---
class: center, middle

![](./images/p2p-step1-2x.png)
---
class: center, middle

![](./images/p2p-step2-2x.png)
---
class: center, middle

![](./images/p2p-step3-2x.png)
---
class: center, middle

![](./images/p2p-step4-2x.png)
---
class: center, middle

![](./images/p2p-step5-2x.png)
---
class: center, middle

![](./images/p2p-step6-2x.png)
---

class: list-center

### Что происходит под капотом

- Структурирование данных

--

- Хеширование данных

--

- Прямое соединение

--

- Репликация

---

class: list-center, wide

### Append only log

--

- [0] Озарен таинственной улыбкой (add)

--

- [1] Проводил он дни земли. (add)

--

- [2] Шел на берег — и на глади кроткой (add)

--

- [3] ~кроткой~ (delete)
--

- [4] зыбкой (add)

--

- [5] Льдистый призрак виделся вдали. (add)

???

Каждый раз при любом изменении - добавляется запись с этим изменением
Скажем Саша пишет поэму и сохраняет ее в файле - это одна запись в логе с форматом добавить
Пишем вторую строчку - вторая строка, если Саша хочет изменить первую строчку - то это она не переписыватся - а пишется новая запись с изменениями первой строчки

---

class: center, middle

### Merkel Tree
![](./images/merkel-tree.jpg)

---
class: center, middle
![](./images/merkel-1.png)

???

- [0] Озарен таинственной улыбкой
- [1] Проводил он дни земли 
- [2] Шел на берег — и на глади зыбкой
- [3] Льдистый призрак виделся вдали
Бинарное дерево - где листья дерева - захешированные данные
Дат берет этот лог и представляет его в виде подписанного Меркель Дерева.
Так как у принимающей стороны уже есть публичный ключ - при любом изменении дерева - это изменение можно проверить.

---
class: center, middle
![](./images/merkel-2.png)

---
class: center, middle
![](./images/merkel-3.png)

---
class: center, middle
![](./images/merkel-4.png)

---

class: list-center

### За счет этого

--

- Легкое сравнение

--

- Целостность данных

--

- Версионность

---
class: center, middle

![](./images/history-dat.gif)

---
class: center, middle

### Набор поэм написан - как теперь его передать Любе?

---
class: center, emoji-smaller

- Файловая система => dat://a12...q11

--

- <span class="emoji">👨</span> => DHT

--

- DHT => <span class="emoji">👩</span>

--

- <span class="emoji">🕳️👊</span>

--

- <span class="emoji">👨</span> => <span class="emoji">👩</span>

???

- При создании наш ключ с адресом записывается в децентрализованую таблицу хешей, которую в свою очередь может прочитать человек, который придет по нашему адресу
- После получения точного адреса будет происходить магия, под названием Hole punching, набор хаков, который позволяет в обход роутеров и файерволов установить соединение напрямую, это достойно целого самостоятельного докалада, поэтому об этом в следующий раз
- WebRtc делает тоже самое только при этом он использует централизованные сервера

---
class: smaller, center, middle

<span class="emoji">🕳️👊</span>
- 👩 > 📦 > 🖨️ (хочу поговорить с 👨)
- 👩 🔥🛡️ теперь разрешает 📦 от 🖨
- 🖨 помнит ip:port 👩
- 👨 > 📦 > 🖨️ (хочу поговорить с 👩)
- 👨 🔥🛡️ теперь разрешает 📦 от 🖨
- 🖨 сообщает ip:port 👩 > 👨
- 👨 > 📦 > 👩
- 👨 🔥🛡️ разрешает 📦 от 👩
- 👩 🔥🛡️ запрещает 📦, так как он еще не общался с  👨
- 🖨 сообщает ip:port 👨 > 👩
- 👩 > 📦 > 👨
- 👩 🔥🛡️ разрешает 📦 от 👨
- 👩 > 📦 > 👨 > 📦 > 👩 без 🖨

---
class: list-center, wide

### Что если?

- Люба хочет написать пометку к поэме
- Саша хочет писать поэмы с другого устройства
--

- 😔

--
- Hack: экспорт ключей

???

На данный момент является Single Writer, однако Multiwriter в процессе работы
Но есть обходной момент - достаточно просто взять и передать ключи

---

class: middle, list-center

### Инструменты

- hyperdrive
- hyperdht
- discovery-swarm

???

- Hyperdrive is a secure, real time distributed file system, streams filesystem into different computer
- A DHT that supports peer discovery and distributed hole punching 
- A network swarm that uses discovery-channel to find and connect to peers.

Оставим ненадолго Сашу и Любу, рассмотрим технологии, на основании которых все это сделано.
Все перечисленные модули - open-source и доступны на github

---
class: center, middle

### Dat-node

<pre>
  <code>
    var Dat = require('dat-node');

    Dat('/sasha/poems', function (err, dat) {
      if (err) {
        throw new Error(err);
      };
      dat.importFiles();
      dat.joinNetwork();
      console.log('Моя ссылка: dat://', dat.key.toString('hex'));
    });

  </code>
</pre>

???

Все что я показывал до этого - это dat-cli, который является оберткой над dat-node
Так как dat полагается на файловую систему как на хранилище данных - его невозможно использовать в браузере, но это решается, если использовать кастомный адаптер для hyperdrive в виде random-access-storage

---

class: center, middle

### Не cli инструменты

---
class: center, middle

![](./images/datappscreenshot.png)

---

class: center, middle

![](./images/beaker-browser.png)

???
Dat first browser
Дает много полезных API

---

class: center, middle

![](./images/homebase.png)

???
Super Peer, преимущество серверной архитектуры в том, что сервер всегда онлайн - в отличии от вашего компа
---
class: center, middle

![](https://github.com/jimpick/subscribed-hypercored/raw/master/subscribed-hypercored.gif)
---

class: center, middle


![](./images/hashbase.png)

---
class: center, middle

![](./images/bunsen_browser_home.png)

---

class: center, middle

![](./images/dat-firefox-plugin.png)
- Поддержка в BraveBrowser

---
class: center, middle

- https://dat.bovid.space

![](./images/gateway.png)

---

class: center, middle

![](./images/cabal-chat.png)

---

class: center, middle

![](./images/fritter.png)
---

class: center, middle

![](./images/pushpin.png)

---

class: center, middle

### Пример приложения

???

Понятно, что пример использования протокола Саши и Любы - крайне прост, однако что если мы хотим сделать полноценное приложение?

Какой самый плохой интернет, который Вы когда либо ощущали? 
На конференциях - ну конечно не на этой, почему так - как правило - роутеры с трудом выдерживают наплывы участников. Но какую структуру мы знаем - которая только укрепляется при бОльшем объеме людей в сети.

---
class: center, middle

![](./images/krd.png)

---
class: center, middle

![](./images/krd1.png)
---

class: center, middle

![](./images/krd2.png)
---

class: center, middle

![](./images/krd3.png)
---

class: center, middle

![](./images/krd4.png)
---

class: center, middle

![](./images/krd5.png)
---

class: center, middle

![](./images/krd6.png)
---

class: center, middle

![](./images/krd7.png)
---

class: center, middle

![](./images/krd8.png)
---

class: center, middle

![](./images/krd9.png)
---

class: center, middle

![](./images/krd7.png)
---

class: center, middle

![](./images/krd10.png)
---

class: center, middle

![](./images/krd11.png)
---

class: center, middle

### Open Source Wizards that make magic happen

- [@mafintosh](https://github.com/mafintosh)
- [@maxogden](https://github.com/maxogden)
- [@karissa](https://github.com/karissa)
- [@taravancil](https://github.com/taravancil)
- [@pfrazee](https://github.com/pfrazee)
- [@joehand](https://github.com/joehand)
- [@daniellecrobinson](https://github.com/daniellecrobinson)
- [@louiscenter](https://github.com/louiscenter)

---

class: center, middle

### Викторина!

- Кто сможет назвать фамилию Саши и Любы?

---

class: center, middle, nopages

# Вопросы?

Дмитрий Кунин

- @DKunin
- dat://fritter.dkun.in

---

#### Ссылки

- [Dat project](https://datproject.org/)
- [Beaker browser](https://beakerbrowser.com/)
- [Cabal](https://github.com/cabal-club)
- [Dat Desktop](https://github.com/dat-land/dat-desktop)
- [Homebase](https://github.com/beakerbrowser/homebase)
- [Bunsen Browser](https://github.com/bunsenbrowser/bunsen)
- [Firefox Dat Protocol addon](https://addons.mozilla.org/en-US/firefox/addon/dat-p2p-protocol/)
- [Dat Gateway](https://github.com/pfrazee/dat-gateway)
- [Fritter](dat://fritter.hashbase.io)
- [Fritter](https://github.com/inkandswitch/pushpin)
- [Awesome Dat](https://github.com/dat-land/awesome-dat)
