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
  
  getBranch(repo_name, branch_name) {
    if (!this.user) throw new Error('Undefined property "user", make sure to "setUser" before');
    var self = this;
    var setBranch = function (branch) {
      return fetchApi('repos', self.user, repo_name, 'branches', branch.name)
        .then(branch => {
          return fetch(branch.commit.commit.tree.url).then(res => res.json());
        });
    };
    
    return fetchApi('repos', this.user, repo_name, 'branches').then(branches => {
      return setBranch(branches[0]);
    });
  }
  
  // getter for all repositories
  get repositories() {
    if (!this.user) throw new Error('Undefined property "user", make sure to "setUser" before');
   
    return fetchApi('users', this.user, 'repos');
  }
}