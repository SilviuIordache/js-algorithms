const getNextJsCommits = require('./getNextJsCommits');

// 1. Problem 1: write a function that gets the commits from a single call and transforms them into an array of authors and their commit counts, sort that array by the author with the most commits first

// 2. Problem 2 use get method from problem 1 to continously read commits until you reach the first author with 100 commits. When you do, return that author and his commits

// Problem 1 solution
async function getAuthorsByCommits(url = null, accumulator) {
  // console.log('got this acccumulator: ', accumulator)
  // console.log('called getAuthorsByCommits')
  const dict = { ...accumulator };

  const { commits, nextPageUrl } = await getNextJsCommits(url);

  // convert commits to dictionary { author: 'name', commits: ['commit1', 'commit2', 'commit3', ...etc]}
  commits.forEach((entry) => {
    if (dict[entry.author]) {
      dict[entry.author].push(entry.message);
    } else {
      dict[entry.author] = [entry.message];
    }
  });
  // console.log(dict);

  const arr = [];

  // convert dictionary back to array
  for (const [key, value] of Object.entries(dict)) {
    arr.push({ author: key, commits: value });
  }
  // console.log(arr);

  // sort the array
  const sortedArr = arr.toSorted((a, b) => b.commits.length - a.commits.length);

  const mappedArr = sortedArr.map((entry) => {
    return {
      author: entry.author,
      commits: entry.commits.length,
    };
  });

  console.log(mappedArr);

  // return arr;

  return { arr: sortedArr, nextPageUrl };
}

// Problem 2 solution
async function getFirstAuthorWithCommitsNumber(threshold = 100) {
  let dictAccumulator = {};
  let newUrl = '';

  while (true) {
    const { arr, nextPageUrl } = await getAuthorsByCommits(
      newUrl,
      dictAccumulator
    );
    newUrl = nextPageUrl;

    // transform array back into dict obj
    const mappedArr = arr.map(({ author, commits }) => [author, commits]);

    for (const [author, commits] of mappedArr) {
      if (commits.length >= threshold) {
        return { author, commits}
      }
    }

    dictAccumulator = Object.fromEntries(mappedArr);
  }
}

async function main() {
  // await getAuthorsByCommits();
  const targetAuthor = await getFirstAuthorWithCommitsNumber();
  console.log(targetAuthor);
}

main();
