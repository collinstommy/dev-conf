import getJson from './db';

const repoContentsUrl = 'https://api.github.com/repos';
const rawContentUrl = 'https://raw.githubusercontent.com';

export default class GithubAPI {
  constructor(owner, repo) {
    this.repoPath = `${owner}/${repo}`;
    this.dataSource =  getJson;
  }

  async getFilesNameFromDirectory(directoryPath) {
    const url = `${repoContentsUrl}/${this.repoPath}/contents/${directoryPath}`;
    return getJson(url);
  }

  async getJsonFromFile(filePath, branch = 'master') {
    const url = `${rawContentUrl}/${this.repoPath}/${branch}/${filePath}`;
    return getJson(url);
  }
}
