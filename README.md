# 📊 医学统计学 · Medical Statistics

一门课程学习资料网站：按章节展示课件（PDF/PPTX）与视频。托管于 GitHub Pages。

## 在线地址

`https://<你的GitHub用户名>.github.io/<仓库名>/`

## 下载开关（教师控制）

打开 `data/course.js`，文件**顶部**有一个 `window.SETTINGS = { ... }`，改几个值即可：

| 设置 | 作用 |
|---|---|
| `allowDownload: true` | 开放下载：学生可在线预览 + 下载 PPTX/PDF |
| `allowDownload: false` | 关闭下载：学生看不到下载按钮，只能点「✉️ 申请下载」发邮件给你 |
| `allowPreviewWhenLocked: false` | 关闭下载时**完全隐藏**课件内容（默认，最安全） |
| `allowPreviewWhenLocked: true` | 关闭下载时仍允许**在线预览**（可看不可下） |
| `requestEmail: "..."` | 学生「申请下载」邮件发往的邮箱（← 改成你的邮箱） |
| `requestNote: "..."` | 申请页面显示的提示语 |

改完 `git push`（或在 GitHub 网页上直接编辑保存），几十秒后生效。

> ⚠️ 说明：以上是「前端隐藏」——普通学生看不到下载入口。但网站免费托管在公开仓库，懂技术的人仍可能从网页源码找到文件原始地址。若要**彻底禁止下载**，需把文件放到你自己的服务器（如对象存储 OSS/COS）并加访问控制，随时可让我来做。

## 目录结构

```
medstat-course/
├── index.html          # 首页（章节卡片面板）
├── chapter.html        # 章节详情页
├── data/course.js      # ★ 课程配置（你主要编辑这一个文件）
├── assets/
│   ├── css/style.css   # 样式
│   ├── js/app.js       # 渲染逻辑
│   └── slides/         # ★ 课件文件放这里（PDF/PPTX）
└── README.md
```

## 怎么上传资料（三步）

### 1. 放课件文件

把该章节的 PDF 或 PPTX 拖进 `assets/slides/` 文件夹，例如：

- `assets/slides/ch01.pdf`  → PDF 会在网页里**在线预览**
- `assets/slides/ch01.pptx` → PPTX 会提供**下载按钮**

> 建议每个章节同时放一份 PDF（供在线预览）+ 一份 PPTX（供下载）。

### 2. 在 `data/course.js` 里登记

打开 `data/course.js`，在 `chapters` 数组里加一条：

```js
{
  id: "ch04",                              // 唯一编号，网址用
  tag: "第 4 章",                          // 卡片左上角标签
  title: "卡方检验",                       // 章节标题
  subtitle: "分类资料的统计推断",           // 卡片上的一句话引言
  summary: "本章介绍四格表与卡方检验……",   // 详情页简介
  slides: [
    { label: "课件（PPTX，可下载）", pdf: "assets/slides/ch04.pdf", src: "assets/slides/ch04.pptx" }
  ],
  videos: [
    { label: "第1讲", platform: "bilibili", id: "BV1xxxxxxxx" }
  ]
}
```

> `pdf` 用于网页内嵌预览，`src` 用于下载（一般放 PPTX 原文件）。

### 附：PPTX 转 PDF（Mac 上用 Keynote）

如果只有 PPTX 没有 PDF，可在 Mac 上用 Keynote 批量转：

```bash
cd ~/medstat-course/assets/slides
for f in *.pptx; do
  osascript -e "tell application \"Keynote\"" \
    -e "set d to open POSIX file \"$(pwd)/$f\"" \
    -e "delay 2" \
    -e "export d to POSIX file \"$(pwd)/${f%.pptx}.pdf\" as PDF" \
    -e "close d saving no" \
    -e "end tell"
done
```

### 3. 提交并推送

```bash
git add -A
git commit -m "新增第4章"
git push
```

几十秒后网站自动更新。

## 教师自助上传（GitHub 网页版，零命令行）

### 情况 A：替换已有课件的「修改版」

1. 打开仓库网页 → 进入 `assets/slides/` 文件夹。
2. 点右上角 **Add file → Upload files**，把新 PPTX/PDF **拖进去**。
3. **文件名保持和原来完全一样**（例如 `01-绪论-药学.pptx`），这样会直接覆盖旧文件。
4. 点 **Commit changes**，几十秒后网站自动更新，**无需改任何代码**。

> 只上传 PPTX 但没更新 PDF 的话，网页里预览的 PDF 还是旧版。建议 PPTX 和 PDF 一起更新（PDF 可发我帮你转，或按下方 Keynote 命令批量转）。

### 情况 B：新增一个章节 / 新增一份课件

1. 照情况 A 上传文件到 `assets/slides/`，文件名建议用 `NN-章节名`（如 `12-生存分析.pptx`）。
2. 打开 `data/course.js`，在 `chapters: [ ... ]` 里按文件顶部注释的模板复制一条，填好 `id / title / slides`。
3. 点 **Commit changes**。

> 不会改 `course.js` 也没关系——把新文件发我，我 1 分钟帮你登记好。

## 视频托管（方案A：B 站，推荐）

视频暂时没上传，网站已留好入口（章节页视频栏显示「视频制作中，敬请期待」）。视频做好后：

1. 把视频上传到 B 站（每个视频可在 B 站设置「禁止下载」）。
2. 打开 `data/course.js`，在该章节的 `videos` 里加：

```js
videos: [
  { label: "绪论 · 第1讲", platform: "bilibili", id: "BV1xxxxxxxx" }
]
```

- `id` 填 B 站视频的 **BV 号**（网址里的 `BV1xxxxxxx`），会在网页里**内嵌播放**；
- 也可以直接给 B 站链接，自动识别 BV 号：`{ label: "第1讲", src: "https://www.bilibili.com/video/BV1xxxxxxx" }`；
- 多集视频就加多条，每一条是一个播放器。

> 备选：如果以后想完全私有 + 下载可控，可换用对象存储（阿里云 OSS / 腾讯云 COS），把 mp4 公开地址填进 `src`，网页同样用内嵌播放器。需要时我可以帮你配。

## 本地预览

直接双击打开 `index.html`，或在终端运行：

```bash
cd ~/medstat-course && python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署到 GitHub Pages

1. 在 GitHub 上新建仓库（建议名：`medstat-course`），**设为公开**。
2. 把本目录推上去。
3. 仓库 → Settings → Pages → Source 选 `main` 分支 / root 目录 → Save。
4. 等 1 分钟左右，访问 `https://<用户名>.github.io/medstat-course/`。

---

> 需要调整颜色、布局、加搜索、加中英双语切换等，都可以继续在这个项目上改。
