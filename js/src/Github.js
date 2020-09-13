const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_API_TOKEN = '';

async function fetchApi(...path) {
  let url = new URL(GITHUB_API_URL);
  url.pathname = path.join('/');
  url.search = new URLSearchParams;
  
  GITHUB_API_TOKEN && url.search.append('key', GITHUB_API_TOKEN);
  
  let response = await fetch(url.toString());
  response = await response.json();
  
  if (await response.message == "Not Found") {
    response.requested_url = url.toString();
    
    return Promise.reject(response);
  }

  return Promise.resolve(response);
}

export default class Github {
  constructor({ user, repo }) {
    this.user = user;
    this.repo = repo;
  }
  
  setUser(user) {
    this.user = user;
  }

  setRepo(repo) {
    this.repo = repo;
  }
  
  // getter for all repositories
  get repositories() {
    if (!this.user) throw new Error('Undefined property "user", make sure to "setUser" before');
   
    return fetchApi('users', this.user, 'repos');
  }
  
  
}