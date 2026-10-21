# 信使之国｜跨时空传播议事厅

十分钟国际传播翻转课堂：三份寓言卷宗、六位学者、理论地图、学术圆桌、生成式把关研究与学习测验。

全部交互使用预设教学内容，无真实 AI API、账号或数据库。学者回应明确标为教学模拟；投票与测验仅保留在当前页面会话，不汇总访客数据。

## 本地运行

需要 Node.js 24。

```sh
npm ci
npm run build
npm run preview
```

打开 http://127.0.0.1:3000 。开发时可运行 `npm run dev`。

## GitHub Pages

网页地址：https://yejingyi2005-art.github.io/International-communication-demo/

`main` 分支保存源码；`gh-pages` 分支保存静态网页。Pages 发布来源为 `gh-pages` 分支根目录。

```sh
node scripts/build-pages.mjs
```

此命令为项目路径构建网页，并写入 `.nojekyll`。更新网页时需把 `out/` 内容发布到 `gh-pages` 分支。本地预览与其他根路径托管仍使用 `npm run build`。

## 检查

```sh
npm run check
npm test
node scripts/check-scholar-data.mjs
```

理论与预设内容位于 `data/`，肖像署名及使用说明见 `data/avatar-manifest.json`，补充证据见 `docs/scholar-evidence/`。材料中的待核查标记、教学类比与解释边界均应保留。

公开上传源代码不代表为全部内容授予开源许可。各肖像的来源和权利状态按素材记录单独说明。
