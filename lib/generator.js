// lib/Generator.js 生成器
const { getRepoList } = require("./http");
const inquirer = require("inquirer");
const util = require("util");
const downloadGitRepo = require("download-git-repo");
const path = require("path");
const chalk = require("chalk");

// 加载动画
async function wrapLoading(fn, message, name, ...args) {
  // 使用 ora 初始化，传入提示信息
  const { default: ora } = await import("ora");
  const spinner = ora(message);
  // 开启加载动画
  spinner.start();

  try {
    // 执行传入的fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    if (name) {
      // 模板使用提示
      console.log(`\r\nSuccessfully created project ${chalk.cyan(name)}`);
      console.log(`\r\n  cd ${chalk.cyan(name)}`);
      console.log("  npm run dev\r\n");
    }

    return result;
  } catch (error) {
    spinner.fail(error.message);
    console.log(error.response.data);
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    // 对 downloadGitrepo 进行promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取用户选择的模板
  // 1) 从远程拉去模板数据
  // 2) 用户选择自己新下载的模板名称
  // 3) return 用户选择的名称

  async getRepo() {
    // 1) 从远程拉取模板名称
    const { data: repoList } = await wrapLoading(
      getRepoList,
      "waiting fetch template..."
    );

    if (!repoList) return;
    // console.log(repoList);
    // 过滤我们需要的模板名称
    const repos = repoList.map((item) => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "Please choose a template to create project",
    });

    // 返回用户选择的名称
    return repo;
  }

  async download(repo, name) {
    // 1) 拼接下载地址 https://github.com/ruanlin-kylin/vue3-vite-multiple-page.git
    //  direct:https://gitlab.com/flippidippi/download-git-repo-fixture.git
    // https://github.com/dv-cli/vue3-ts-vite.git
    const requestUrl = `dv-cli/${repo}`;

    // 2) 调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      "waiting download template...", // 加载提示信息
      name,
      requestUrl, // 参数1：下载地址
      path.resolve(process.cwd(), this.targetDir) // 参数2：创建位置
    );
  }
  // 核心创建逻辑
  // 1）获取模板名称
  // 2）下载模板到模板目录
  async create() {
    // 1）获取模板名称
    const repo = await this.getRepo();

    // 2) 下载模板到模板目录
    await this.download(repo, this.name);
  }
}

module.exports = Generator;
