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

  /* ---------- 下载开关相关 ---------- */
  function getSettings() {
    return window.SETTINGS || {};
  }
  function isLocked() {
    return getSettings().allowDownload === false;
  }
  function mailtoRequest(label) {
    var S = getSettings();
    var email = S.requestEmail || "";
    if (!email) return "";
    var subject = "申请下载课件：《" + (label || "课件") + "》";
    var body =
      "老师您好，我想申请下载《" + (label || "课件") + "》的学习资料。\n\n姓名：\n学号：\n用途：";
    return "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }
  function requestButton(label) {
    var href = mailtoRequest(label);
    if (!href) {
      return '<span class="btn btn-primary" title="教师未设置邮箱">✉️ 申请下载</span>';
    }
    return '<a class="btn btn-primary" href="' + href + '">✉️ 申请下载</a>';
  }
  function lockedItem(icon, label) {
    var S = getSettings();
    var note = S.requestNote ? '<p class="request-note">' + esc(S.requestNote) + "</p>" : "";
    return (
      '<div class="locked">' +
      '<div class="locked-main">' +
      '<span class="icon">' + icon + "</span>" +
      '<span class="locked-name">' + esc(label) + "</span>" +
      '<span class="locked-badge">🔒 已限制下载</span>' +
      "</div>" +
      note +
      '<div class="locked-actions">' + requestButton(label) + "</div>" +
      "</div>"
    );
  }

  function renderSlides(slides) {
    if (!slides || !slides.length) {
      return '<div class="empty">课件待上传（把 PDF/PPTX 放进 assets/slides/ 并在 data/course.js 里登记）</div>';
    }
    var S = getSettings();
    var locked = isLocked();
    var allowPreview = S.allowPreviewWhenLocked === true;
    var html = "";
    slides.forEach(function (s) {
      // pdf：用于在线预览；src：下载文件（PPTX 或 PDF）
      var pdf = s.pdf || (isPdf(s.src) ? s.src : "");
      var dl = s.src || s.pdf || "";
      var label = s.label || "课件";

      if (locked) {
        if (pdf && allowPreview) {
          // 可看不可下：只内嵌预览，不提供下载按钮
          html +=
            '<div class="pdf-wrap">' +
            '<div class="pdf-label"><span class="icon">📄</span>' + esc(label) +
            '<span class="locked-badge">🔒 仅预览</span></div>' +
            '<iframe src="' + esc(pdf) + '" title="' + esc(label) + '"></iframe>' +
            '<div class="pdf-actions">' + requestButton(label) + "</div></div>";
        } else {
          html += lockedItem("📄", label);
        }
        return;
      }

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

  // 生成 B 站内嵌播放地址（支持 { id:"BV..." } 或 src 里含 BV 号 / bilibili 链接）
  function biliEmbedUrl(v) {
    var bvid = String(v.bvid || v.id || "").trim();
    if (!bvid && v.src) {
      var m = String(v.src).match(/BV[0-9A-Za-z]{8,}/i);
      if (m) bvid = m[0];
    }
    if (!bvid) return "";
    var page = v.page || 1;
    return (
      "https://player.bilibili.com/player.html?bvid=" + encodeURIComponent(bvid) +
      "&page=" + encodeURIComponent(page) + "&high_quality=1&danmaku=0&autoplay=0"
    );
  }

  function renderVideos(videos) {
    if (!videos || !videos.length) {
      return (
        '<div class="empty">🎬 视频制作中，敬请期待。</div>' +
        '<div class="empty hint">视频做好后：上传 B 站，把 BV 号填进 data/course.js 对应章节的 videos 里，即可在网页内嵌播放。</div>'
      );
    }
    var locked = isLocked();
    var html = "";
    videos.forEach(function (v) {
      var label = v.label || "视频";
      if (locked) {
        html += lockedItem("🎬", label);
        return;
      }
      var bili = biliEmbedUrl(v);
      if (bili) {
        html +=
          '<div class="bili-wrap">' +
          '<div class="bili-label"><span class="icon">🎬</span>' + esc(label) + "</div>" +
          '<div class="bili-frame"><iframe src="' + esc(bili) + '" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>' +
          "</div>";
      } else if (isVideo(v.src)) {
        html +=
          '<video class="video-player" controls preload="metadata" src="' + esc(v.src) + '"></video>';
      } else if (v.src) {
        html +=
          '<div class="item">' +
          '<span class="item-name"><span class="icon">🎬</span>' + esc(label) + "</span>" +
          '<a class="btn btn-primary" href="' + esc(v.src) + '" target="_blank">观看视频 ↗</a>' +
          "</div>";
      } else {
        html +=
          '<div class="item">' +
          '<span class="item-name"><span class="icon">🎬</span>' + esc(label) + "</span>" +
          '<span class="empty" style="padding:0">待上传</span>' +
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
