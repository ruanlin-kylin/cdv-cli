#! /usr/bin/env node

const program = require("commander");
const chalk = require("chalk");

program
  // 定义命令和参数
  .command("create <app-name>")
  .description("create a new project")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    // 在 create.js 中执行创建任务
    require("../lib/create.js")(name, options);
  });

program
  // 配置版本号信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

program
  // 监听 --help 执行
  .on("--help", () => {
    // 新增说明信息
    console.log(
      `\r\n运行 ${chalk.cyan(`rl <command> --help`)} 查看指定命令的详细用法\r\n`
    );
  });

// 解析用户执行命令传入参数
program.parse(process.argv);
