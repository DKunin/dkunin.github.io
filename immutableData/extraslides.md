---

### Ленивые последовательности

    var oddSquares = Immutable.Seq.of(1,2,3,4,5,6,7,8)
      .filter(x => x % 2).map(x => x * x);

    console.log(oddSquares.get(1)); // 9
