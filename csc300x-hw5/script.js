//my github repos as default:
const defaultRepos = 'AMBONOLA';

//as soon as page loads show my repos
window.addEventListener('load', () => {
  fetchRepositories(defaultRepos);
})

async function fetchRepositories() {
  const username = document.getElementById('username').value;
  const response = await fetch(`https://api.github.com/users/${username}/repos`)
  const data = await response.json();

  //in case we misspell a user or they just odn't exist
  if (response.status === 404) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '<p>User not found</p>';
    return;
  }

  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  console.log(data)
  //we can use Promise to wait for all promises to resolve. Since we need to make
  //another api call to grab the # of commits, it will wait until we get that number back before returning
  //everything toteher
  await Promise.all(data.map(async (repo) => {
    const getCommits = await fetch(repo.commits_url.replace('{/sha}', ''));
    const commitsData = await getCommits.json();

    const repoCard = document.createElement('div');
    repoCard.classList.add('card', 'm-3');
    repoCard.innerHTML = `
      <div class="card-body">
        <i class="fa-brands fa-github fa-2xl"></i><a href="${repo.html_url}" class="github-link"><h5 class="card-title">${repo.name}</h5></a>
        <p class="card-text">${repo.description || 'No description'}</p>
        <p class="card-text">Created: ${new Date(repo.created_at).toLocaleDateString()}</p>
        <p class="card-text">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
        <p class="card-text">Commits: ${commitsData.length}</p>
        <p class="card-text">Languages: ${repo.language || 'No Languages'}</p>
        <p class="card-text">Watchers: ${repo.watchers}</p>
      </div>
    `;
    gallery.appendChild(repoCard);
  }));
}



