const axios = require("axios");

const access_token = ""; // 使用个人访问令牌，获取更高的api访问速率(5000)

const apiUrl = "https://api.github.com";

// 创建一个 axios 实例并设置身份验证头部
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${access_token}`, // 使用个人访问令牌进行身份验证
  },
});

/**
 * 获取模板列表
 * @returns Promise
 */

async function getRepoList() {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/orgs/dv-cli/repos")
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = { getRepoList };
