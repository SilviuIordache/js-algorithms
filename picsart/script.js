// return the value of the object key chain or null/undefined if not found
// example
const person1 = {
  name: {
    firstName: 'john',
    surName: 'smith',
  },
  age: 32,
  preferences: {
    sports: {
      football: 'yes',
    },
    arts: {
      plastic: {
        painting: true,
        sculpture: false,
      },
      literature: {
        poetry: 'Shakespear',
      },
    },
  },
};

// getObjChainKeyValue('preferences.arts.literature.poetry', person1) // yes
// getObjChainKeyValue('preferences.arts.literature.epic', person1) // undefined

function getObjChainKeyValue(path, obj) {
  const pathArr = path.split('.');
  console.log(pathArr);

  if (typeof obj[pathArr[0]] === 'object') {
    const newArr = pathArr.slice(1);
    const newPath = newArr.join('.');

    return getObjChainKeyValue(newPath, obj[pathArr[0]]);
  } else {
    return obj[pathArr[0]];
  }
}

const result1 = getObjChainKeyValue(
  'preferences.arts.literature.poetry',
  person1
);

const result2 = getObjChainKeyValue(
  'preferences.arts.literature.jokes',
  person1
);

console.log(result1);
console.log(result2);
