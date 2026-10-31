/* ============================================================
   医学统计学 · 课程配置
   ------------------------------------------------------------
   这里是你唯一需要经常编辑的文件。
   加新章节 / 上传课件 / 加视频，都只改这里。

   字段说明：
   - id       章节唯一编号（用于网址 ?id=xxx），用英文/数字
   - tag      卡片左上角的小标签（如 "第 1 章" / "PHASE I"）
   - title    章节标题
   - subtitle 卡片上的一句话引言
   - slides   课件数组：
        { label: 显示名, src: 文件路径 }
        src 以 .pdf 结尾 → 在线预览；以 .pptx/.docx 结尾 → 提供下载
   - videos   视频数组：
        { label: 显示名, src: 视频地址 }
        src 以 .mp4/.webm 结尾 → 内嵌播放器；
        否则（如西柚云外链、B站链接）→ "观看视频" 按钮
   - summary  章节详情页顶部的简介（可选）

   上传课件：把 PDF/PPTX 文件放进 assets/slides/ 目录，
   然后把 src 写成 "assets/slides/你的文件名.pdf" 即可。
   ============================================================ */

window.COURSE = {
  title: "医学统计学",
  en: "Medical Statistics",
  instructor: "阮老师",
  intro: "从统计描述到统计推断，系统掌握医学研究中的数据分析方法。",

  chapters: [
    {
      id: "ch01",
      tag: "第 1 章",
      title: "绪论",
      subtitle: "认识医学统计学：数据、变量与误差",
      slides: [
        { label: "课件（PPTX）", src: "assets/slides/ch01.pptx" }
      ],
      videos: [
        { label: "课程视频", src: "https://example.com/videos/ch01.mp4" }
      ],
      summary: "本章介绍医学统计学的定义、研究对象与基本概念，为后续学习建立整体框架。"
    },
    {
      id: "ch02",
      tag: "第 2 章",
      title: "统计描述",
      subtitle: "用数字与图表刻画数据的基本面貌",
      slides: [
        { label: "课件（PPTX）", src: "assets/slides/ch02.pptx" }
      ],
      videos: [
        { label: "课程视频", src: "https://example.com/videos/ch02.mp4" }
      ],
      summary: "本章讲解集中趋势与离散趋势指标、频数分布表与统计图表。"
    },
    {
      id: "ch03",
      tag: "第 3 章",
      title: "参数估计与假设检验",
      subtitle: "从样本到总体：推断的桥梁",
      slides: [
        { label: "课件（PPTX）", src: "assets/slides/ch03.pptx" }
      ],
      videos: [
        { label: "课程视频", src: "https://example.com/videos/ch03.mp4" }
      ],
      summary: "本章介绍抽样误差、参数估计与假设检验的基本思想。"
    }
  ]
};
