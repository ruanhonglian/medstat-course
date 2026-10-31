/* 医学统计学 · 前端渲染逻辑 */

(function () {
  const C = window.COURSE || { chapters: [] };
  const chapters = C.chapters || [];

  // 简单转义，避免内容里的特殊字符破坏 HTML
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isVideo(src) {
    return /\.(mp4|webm|ogg|m4v|mov)(\?|$)/i.test(src || "");
  }
  function isPdf(src) {
    return /\.pdf(\?|$)/i.test(src || "");
  }

  function renderSlides(slides) {
    if (!slides || !slides.length) {
      return '<div class="empty">课件待上传（把 PDF/PPTX 放进 assets/slides/ 并在 data/course.js 里登记）</div>';
    }
    let html = "";
    slides.forEach(function (s) {
      // pdf：用于在线预览；src：下载文件（PPTX 或 PDF）
      var pdf = s.pdf || (isPdf(s.src) ? s.src : "");
      var dl = s.src || s.pdf || "";
      var label = s.label || "课件";
      if (pdf) {
        html +=
          '<div class="pdf-wrap">' +
          '<div class="pdf-label"><span class="icon">📄</span>' + esc(label) + "</div>" +
          '<iframe src="' + esc(pdf) + '" title="' + esc(label) + '"></iframe>' +
          '<div class="pdf-actions">' +
          '<a class="btn btn-primary" href="' + esc(pdf) + '" target="_blank">在新窗口打开</a>';
        if (dl && dl !== pdf) {
          html += '<a class="btn btn-ghost" href="' + esc(dl) + '" download>下载 PPTX</a>';
        } else if (dl) {
          html += '<a class="btn btn-ghost" href="' + esc(dl) + '" download>下载 PDF</a>';
        }
        html += "</div></div>";
      } else {
        html +=
          '<div class="item">' +
          '<span class="item-name"><span class="icon">📄</span>' + esc(label) + "</span>" +
          '<a class="btn btn-primary" href="' + esc(dl) + '" download>下载</a>' +
          "</div>";
      }
    });
    return html;
  }

  function renderVideos(videos) {
    if (!videos || !videos.length) {
      return '<div class="empty">视频待上传（放在西柚云服务器，链接填入 data/course.js）</div>';
    }
    let html = "";
    videos.forEach(function (v) {
      if (isVideo(v.src)) {
        html +=
          '<video class="video-player" controls preload="metadata" src="' + esc(v.src) + '"></video>';
      } else {
        html +=
          '<div class="item">' +
          '<span class="item-name"><span class="icon">🎬</span>' + esc(v.label || "视频") + "</span>" +
          '<a class="btn btn-primary" href="' + esc(v.src) + '" target="_blank">观看视频 ↗</a>' +
          "</div>";
      }
    });
    return html;
  }

  function findChapter(id) {
    for (var i = 0; i < chapters.length; i++) {
      if (chapters[i].id === id) return { chapter: chapters[i], index: i };
    }
    return null;
  }

  /* ---------------- 首页：仪表盘 ---------------- */
  function renderDashboard() {
    var hero = document.querySelector(".hero");
    var grid = document.getElementById("dashboard");
    if (!grid) return;

    // 顶部统计：课程标题、简介、章节数
    var stat = hero.querySelector(".hero-stat");
    if (stat) stat.textContent = chapters.length + " 个章节";
    var sub = hero.querySelector(".hero-sub");
    if (sub && C.intro) sub.textContent = C.intro;

    var html = '<div class="section-title">课程章节 · Chapters</div><div class="grid">';
    chapters.forEach(function (ch) {
      html +=
        '<a class="card" href="chapter.html?id=' + encodeURIComponent(ch.id) + '">' +
        '<span class="card-tag">' + esc(ch.tag || "章节") + "</span>" +
        "<h3>" + esc(ch.title) + "</h3>" +
        '<p class="card-sub">' + esc(ch.subtitle || "") + "</p>" +
        '<div class="card-foot">' +
        '<span class="card-meta">课件 ' + (ch.slides ? ch.slides.length : 0) +
        " · 视频 " + (ch.videos ? ch.videos.length : 0) + "</span>" +
        '<span class="btn btn-primary">开始学习 →</span>' +
        "</div>" +
        "</a>";
    });
    html += "</div>";
    grid.innerHTML = html;
  }

  /* ---------------- 章节详情页 ---------------- */
  function renderChapter() {
    var wrap = document.getElementById("chapter");
    if (!wrap) return;

    var id = new URLSearchParams(location.search).get("id");
    var found = findChapter(id);

    if (!found) {
      wrap.innerHTML =
        '<div class="block"><h2>未找到该章节</h2>' +
        '<p class="empty">请从首页选择章节。</p>' +
        '<a class="btn btn-primary" href="index.html">返回首页</a></div>';
      return;
    }

    var ch = found.chapter;
    var idx = found.index;
    var prev = chapters[idx - 1];
    var next = chapters[idx + 1];

    // 页面标题
    document.title = ch.title + " · " + (C.title || "医学统计学");

    var html =
      '<a class="back-link" href="index.html">← 返回章节列表</a>' +
      '<div class="chapter-head">' +
      '<span class="card-tag">' + esc(ch.tag || "章节") + "</span>" +
      "<h1>" + esc(ch.title) + "</h1>" +
      '<p class="summary">' + esc(ch.summary || ch.subtitle || "") + "</p>" +
      "</div>" +

      '<div class="block"><h2><span class="dot"></span>课件 · Slides</h2>' +
      renderSlides(ch.slides) +
      "</div>" +

      '<div class="block"><h2><span class="dot"></span>视频 · Videos</h2>' +
      renderVideos(ch.videos) +
      "</div>";

    // 上一章 / 下一章
    html += '<div class="pager">';
    html += prev
      ? '<a href="chapter.html?id=' + encodeURIComponent(prev.id) + '">← ' + esc(prev.title) + "</a>"
      : "<span></span>";
    html += next
      ? '<a href="chapter.html?id=' + encodeURIComponent(next.id) + '">' + esc(next.title) + " →</a>"
      : "<span></span>";
    html += "</div>";

    wrap.innerHTML = html;
  }

  if (document.getElementById("dashboard")) renderDashboard();
  else if (document.getElementById("chapter")) renderChapter();
})();
