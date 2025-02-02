const dotenv = require('dotenv');
dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function getNextJsCommits(pageUrl = null) {
  const repo = 'vercel/next.js';
  const perPage = 10;
  const url = pageUrl || `https://api.github.com/repos/${repo}/commits?per_page=${perPage}&page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Mozilla/5.0',
        Authorization: `token ${GITHUB_TOKEN}`, 
      },
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    // Parse the JSON response
    const commits = await response.json();

    // Extract commit details and clean up messages
    const formattedCommits = commits.map((commit) => ({
      author: commit.commit.author?.name || 'Unknown',
      message: commit.commit.message.replace(/\n/g, ' '), // Remove newlines and join into one line
    }));

    // Extract pagination info from the response headers
    const linkHeader = response.headers.get('Link');
    let nextPageUrl = null;

    if (linkHeader) {
      const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
      if (match) {
        nextPageUrl = match[1]; // URL for the next page
      }
    }

    return {
      commits: formattedCommits,
      nextPageUrl,
    };
  } catch (error) {
    console.error('Error fetching commits:', error);
    return { commits: [], nextPageUrl: null };
  }
}


// Example usage: Fetch up to 5 pages of commits
// getAllNextJsCommits().then(data => console.log(data));


// Example usage:
// getNextJsCommits().then(data => console.log(data));

// 1. Problem 1: write a function that gets the commits from a single call and transforms them into an array of authors and their commit counts, sort that array by the author with the most commits first

async function getAuthorsByCommits() {
  const dict = {};

  const response = await getNextJsCommits();

  const results = response.commits;

  results.forEach((result) => {
    if (dict[result.author]) {
      dict[result.author]++;
    } else {
      dict[result.author] = 1;
    }
  });
  // console.log(dict);

  const arr = [];

  for (const [key, value] of Object.entries(dict)) {
    arr.push({ author: key, commits: value });
  }
  // console.log(arr);

  const sortedArr = arr.toSorted((a, b) => b.commits - a.commits);
  console.log(sortedArr);
}

async function main() {
  await getAuthorsByCommits();
}

main();
