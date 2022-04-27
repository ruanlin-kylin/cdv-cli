const axios = require("axios");

/**
 * 获取模板列表
 * @returns Promise
 */

async function getRepoList() {
  return axios.get("https://api.github.com/orgs/dv-cli/repos");
}

module.exports = { getRepoList };
