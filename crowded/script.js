// transform this type of array
// ['aba', 'bbb', 'aaa', 'aba', 'bbb', 'bbb', 'aaa']
// into
// ['bbb', 'aaa', 'aba']
// rules: names only appear once, and are ordered so that the ones with most occurences appear first
// if they have same occurence number, then they are sorted alphabetically

const arr = ['aba', 'bbb', 'aaa', 'aba', 'bbb', 'bbb', 'aaa'];


// save to dictionary: O(n)
const dict = {}
arr.forEach((elem) => {
  if (dict[elem]) {
    dict[elem] ++;
  } else {
    dict[elem] = 1
  }
})
// console.log(dict);


// transform back to array: O(n)
const newArr = [];
for (const [key, value] of Object.entries(dict)) {
  newArr.push({key, value})
}
// console.log(newArr);


// sort array: O(n * log(n))
const sortedArr = newArr.toSorted((a, b) => {

  if (a.value != b.value) {
    return b.value - a.value
  } else {
    return a.key.localeCompare(b.key)
  }
})
console.log(sortedArr);

