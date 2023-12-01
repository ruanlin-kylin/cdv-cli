# cdv-cli

脚手架工具，目前提供了 Vue3 的两种模板，单页开发模板和多页开发模板；

具体可以查看链接：

[vue3+vite 多页模板（pc）](https://github.com/dv-cli/vue3-vite-multiple-page)；

[vue3+vite 单页模板（pc）](https://github.com/dv-cli/vue3-ts-vite)；

[vue3+vite 单页模板（H5）](https://github.com/dv-cli/vue3-ts-vite-h5)；

[taro+vue3 移动跨端模板（mobile）](https://github.com/dv-cli/taro-vue3)；

### 安装脚手架

```javascript
// 全局安装脚手架

npm i cdv-cli -g

// or

yarn global add cdv-cli

```

### 使用脚手架

```javascript
cdv create <projectName> [-f|--force]

// 1) 通过该指令可在当前目录下载开发模板
// 2) 如果<projectName>存在，提供 Overwrite(覆盖) 和 Cancel(取消) 两种选择，选择Overwrite，则覆盖
// 3) [-f|--force] 会强制覆盖
// 4) 目前提供了两种模板选择下载  单页模板（vue3-ts-vite）  多页模板（vue3-vite-multiple-page）

cdv --help  // 查看脚手架指令
```

### 结尾

目前模板库链接的 github 源，github 偶尔会抽风，下载过程中可能会碰到连接超时的情况，重新尝试即可。
