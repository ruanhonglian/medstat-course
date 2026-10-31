# 📊 医学统计学 · Medical Statistics

一门课程学习资料网站：按章节展示课件（PDF/PPTX）与视频。托管于 GitHub Pages。

## 在线地址

`https://<你的GitHub用户名>.github.io/<仓库名>/`

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
    { label: "课程视频", src: "https://你的西柚云地址/ch04.mp4" }
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

## 视频托管（西柚云）

GitHub 仓库放不下大视频，所以视频放在西柚云服务器上，网站里放链接：

- `src` 以 `.mp4` / `.webm` 结尾 → 网页内嵌播放器
- 其它链接（B 站、网盘、服务器外链）→ 「观看视频」按钮，新窗口打开

把视频放到西柚云上并得到公网可访问的地址后，填入 `src` 即可。

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
