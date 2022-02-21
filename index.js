// Нужно вызывать любую функцию через delay ...
//! DONE

function foo() {
  console.log(1)
}

if (!Function.prototype.delay) {
  Function.prototype.delay = function(timeMs) {
  setTimeout(this, timeMs);
}
}

foo.delay(3000) // 1 in console after 3 sec

// NOTE: Любая новая функция должна иметь возможность быть вызванной через delay


// Посчитать сумму полей value до тех пор, пока они есть в объекте
//! DONE

const obj = {
  value: 100,
  obj: {
    value: 100,
    obj: {
      value: 100,
      obj: {
        value: 100,
        obj: {
          value: 100,
          obj: {
            value: null
          }
        }
      }
    }
  }
}

function calculate(obj) { 
  return (function helper(obj, acc) {
    if (!obj.value) {
      return acc;
    }

    return helper(obj.obj, acc + obj.value);
  })(obj, 0);
}
 

console.log(calculate(obj));

// NOTE: Считать нужно рекурсивно, глубину объекта считать как N, то есть бесконечность


// Написать простой вариант мемоизации(кеша)
//! DONE

function memoize() { 
  const argsStorage = {};

  function processParams(paramsArr) {
    return paramsArr.reduce((acc, item) => acc + item, 0);
  }

  return (...args) => {
    const passedArgs = JSON.stringify(args);

    if (!argsStorage[passedArgs]) {
      argsStorage[passedArgs] = processParams(args);
    }

    return argsStorage[passedArgs];
  }
}

const memo1 = memoize()

memo1(1, 2, 3) // Sum of new value is 6

memo1(1, 2, 3) // Got this value in cash -> 6

// NOTE: Количество аргументов может быть бесконечным. Memo может только складывать числа и больше ничего
// Доп. условие -> должна быть реализована возможность учитывать операнды, а не только результат, то есть memo1(1,2,3) и memo1(2,2,2) не считаются одной операцией. В обоих случаях в консоли будет Sum of the new value is 6


// Найти число Фибоначчи под определенным номером
//! DONE

function fibonacci(num) { 
  const startWith = 1;
  let count = 1;
  let prev = 0;

  return (function helper(cur) {
    ++count;
    
    if (count > num) {
      return prev;
    }

    const next = prev + cur;
    prev = cur;  

    return helper(next);
  })(startWith);
}

fibonacci(3) // 1
fibonacci(4) // 2
fibonacci(6) // 5

// NOTE: Решить рекурсией, постарайся не гуглить сразу, это очень популярное задание


// Написать полифилл оператора new

function _new() { ... }

function Person(name, age) {
  this.name = name
  this.age = age
  this.getPerson = function() {
    console.log('Hello! My name is ' + this.name + '. I am ' + this.age + ' years old')
  }
}

const max = _new(Person, 'Max', 20)

max.getPerson() // Hello! My name is Max. I am 20 years old'


// NOTE: Нельзя использовать ключевое слово new. Количество аргументов в _new после конструктора может быть бесконечным.
// Постараться найти наиболее оптимальное решение, то бишь в меньшее кол-во строк кода