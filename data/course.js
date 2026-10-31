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
        { label: 显示名, pdf: PDF预览路径, src: 下载文件路径 }
        pdf 以 .pdf 结尾 → 内嵌在线预览；
        src 以 .pptx/.docx 结尾 → 提供下载（一般放 PPTX 原文件）
   - videos   视频数组（方案A：B 站托管，视频做好后填这里）：
        内嵌 B 站播放器（推荐，免费、不占服务器、可设禁止下载）：
            { label: "第1讲", platform: "bilibili", id: "BV1xxxxxx", page: 1 }
        也可以直接给 B 站链接，自动识别 BV 号：
            { label: "第1讲", src: "https://www.bilibili.com/video/BV1xxxxxx" }
        或放自己的 mp4 文件：
            { label: "第1讲", src: "https://.../xxx.mp4" }  → 内嵌 <video>
        或任意外链：
            { label: "第1讲", src: "https://..." }          → “观看视频”按钮
        （videos 留空 [] 时，页面会显示“视频制作中，敬请期待”占位）
   - summary  章节详情页顶部的简介（可选）

   上传课件：把 PDF/PPTX 文件放进 assets/slides/ 目录，
   然后把 pdf 写成 "assets/slides/你的文件名.pdf"、
   把 src 写成 "assets/slides/你的文件名.pptx" 即可。
   ============================================================ */

/* ============================================================
   下载开关（教师控制）—— 你最常用的两个设置都在这里
   ------------------------------------------------------------
   allowDownload：是否开放下载
       true  → 学生可直接在线预览并下载课件
       false → 关闭下载：学生看不到下载按钮，只能点“✉️ 申请下载”发邮件给你
   allowPreviewWhenLocked：关闭下载时，是否仍允许在线预览
       true  → 可看不可下（学生能在线翻看 PDF，但不能下载原文件）
       false → 完全隐藏课件内容，只显示“申请下载”按钮
   requestEmail：学生点“申请下载”时发送到的邮箱（← 改成你的邮箱）
   requestNote：申请页面显示给学生的提示文字（可留空）
   ============================================================ */
window.SETTINGS = {
  allowDownload: true,                 // true=开放下载；false=关闭下载
  allowPreviewWhenLocked: false,       // 关闭下载时是否还允许在线预览
  requestEmail: "ruanhl@163.com",   // ← 你的邮箱
  requestNote: "如需下载课件，请发送邮件申请，注明姓名、学号和所需章节，审核后回复。"
};

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
      subtitle: "认识医学统计学：总体、样本与变量",
      slides: [
        { label: "绪论（药学）", pdf: "assets/slides/01-绪论-药学.pdf", src: "assets/slides/01-绪论-药学.pptx" },
        { label: "绪论（研究生）", pdf: "assets/slides/01-绪论-研究生.pdf", src: "assets/slides/01-绪论-研究生.pptx" }
      ],
      videos: [
        // 示例（视频做好后取消注释、替换 BV 号即可上线）：
        // { label: "绪论 · 第1讲", platform: "bilibili", id: "BV1xxxxxxxx" }
      ],
      summary: "介绍医学统计学的定义、作用、基本概念（总体与样本、同质与变异、变量类型、概率等）以及统计工作的基本步骤，为后续学习奠定概念基础。"
    },
    {
      id: "ch02",
      tag: "第 2 章",
      title: "定量数据的统计描述",
      subtitle: "用均数与标准差刻画数据",
      slides: [
        { label: "定量数据的统计描述", pdf: "assets/slides/02-定量数据的统计描述.pdf", src: "assets/slides/02-定量数据的统计描述.pptx" }
      ],
      videos: [],
      summary: "讲解频数分布表与直方图的编制，以及集中趋势（均数、中位数等）和离散趋势（标准差、四分位间距、变异系数等）指标的计算与适用场景。"
    },
    {
      id: "ch03",
      tag: "第 3 章",
      title: "正态分布与医学参考值范围",
      subtitle: "正态曲线与参考值范围",
      slides: [
        { label: "正态分布与医学参考值范围", pdf: "assets/slides/03-正态分布与医学参考值范围.pdf", src: "assets/slides/03-正态分布与医学参考值范围.pptx" }
      ],
      videos: [],
      summary: "阐述正态分布的特征与面积规律，并在此基础上介绍医学参考值范围的概念、制定原则和常用计算方法。"
    },
    {
      id: "ch04",
      tag: "第 4 章",
      title: "定性数据的统计描述",
      subtitle: "率、构成比与相对比",
      slides: [
        { label: "定性数据的统计描述", pdf: "assets/slides/04-定性数据的统计描述.pdf", src: "assets/slides/04-定性数据的统计描述.pptx" }
      ],
      videos: [],
      summary: "介绍率、构成比、相对比等常用相对数指标，以及医学中常用的死亡统计和疾病统计指标，并说明应用相对数时的注意事项。"
    },
    {
      id: "ch05",
      tag: "第 5 章",
      title: "统计表与统计图",
      subtitle: "规范制表与科学作图",
      slides: [
        { label: "统计表与统计图", pdf: "assets/slides/05-统计表与统计图.pdf", src: "assets/slides/05-统计表与统计图.pptx" }
      ],
      videos: [],
      summary: "讲解统计表的基本结构（标题、标目、线条、数字、备注）与编制原则，以及常用统计图（直方图、散点图、箱线图等）的选择与制作。"
    },
    {
      id: "ch06",
      tag: "第 6 章",
      title: "参数估计与假设检验",
      subtitle: "从样本到总体的推断",
      slides: [
        { label: "参数估计与假设检验", pdf: "assets/slides/06-参数估计与假设检验.pdf", src: "assets/slides/06-参数估计与假设检验.pptx" }
      ],
      videos: [],
      summary: "介绍抽样误差、标准误与t分布，讲解置信区间的含义与计算，以及假设检验的基本原理、步骤和两类错误（Ⅰ类错误与Ⅱ类错误）。"
    },
    {
      id: "ch07",
      tag: "第 7 章",
      title: "t检验",
      subtitle: "单样本、配对与两独立样本",
      slides: [
        { label: "t检验", pdf: "assets/slides/07-t检验.pdf", src: "assets/slides/07-t检验.pptx" }
      ],
      videos: [],
      summary: "涵盖单样本t检验、配对t检验和两独立样本t检验的应用条件与计算，并说明方差齐性检验及t检验的注意事项。"
    },
    {
      id: "ch08",
      tag: "第 8 章",
      title: "方差分析",
      subtitle: "比较多组均数的差异",
      slides: [
        { label: "方差分析", pdf: "assets/slides/08-方差分析.pdf", src: "assets/slides/08-方差分析.pptx" }
      ],
      videos: [],
      summary: "阐述方差分析的基本思想，介绍完全随机设计、随机区组设计的方差分析以及多个样本均数间的两两比较方法。"
    },
    {
      id: "ch09",
      tag: "第 9 章",
      title: "χ²检验",
      subtitle: "计数资料的推断方法",
      slides: [
        { label: "卡方（χ²）检验", pdf: "assets/slides/09-卡方检验.pdf", src: "assets/slides/09-卡方检验.pptx" }
      ],
      videos: [],
      summary: "讲解四格表χ²检验（含校正公式与Fisher确切概率法）、配对四格表χ²检验以及R×C列联表资料的χ²检验与应用注意事项。"
    },
    {
      id: "ch10",
      tag: "第 10 章",
      title: "非参数秩和检验",
      subtitle: "基于秩次的非参数方法",
      slides: [
        { label: "非参数秩和检验", pdf: "assets/slides/10-非参数秩和检验.pdf", src: "assets/slides/10-非参数秩和检验.pptx" }
      ],
      videos: [],
      summary: "介绍基于秩次的非参数方法，包括配对设计的符号秩和检验以及两独立样本、多独立样本比较的秩和检验，适用于不满足参数检验条件的数据。"
    },
    {
      id: "ch11",
      tag: "第 11 章",
      title: "线性回归与相关",
      subtitle: "变量间的关系分析",
      slides: [
        { label: "线性相关与回归", pdf: "assets/slides/11-线性相关与回归.pdf", src: "assets/slides/11-线性相关与回归.pptx" }
      ],
      videos: [],
      summary: "讲解简单线性相关与线性回归的分析方法，说明相关系数与回归系数的含义、区别与联系，以及秩相关的基本应用。"
    }
  ]
};
