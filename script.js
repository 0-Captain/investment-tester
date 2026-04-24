// 题目：10 道单选题，每题 4 个选项，选项分值 0 / 3 / 7 / 10
// 维度：风险认知、投资理念、情绪管理、资产配置、决策纪律
const QUESTIONS = [
  {
    q: "饭局上，同事眉飞色舞地告诉你：「上个月听小道消息梭哈了寒武纪，一套首付已经到手。」你的第一反应是？",
    options: [
      { text: "立刻打开券商 App 跟车，再晚就真错过了", score: 0 },
      { text: "别人亲口告诉你的「机会」，大概率已经被市场定价完了", score: 10 },
      { text: "先拿几千块试试水，反正亏也不肉疼", score: 3 },
      { text: "记下公司名字，回家自己先查一下财报和业务", score: 7 },
    ],
  },
  {
    q: "朋友跟你说「年化不翻倍都算浪费仓位」。作为参考：巴菲特长期年化约 20%，标普 500 近 30 年年化约 10%。你觉得自己的合理年化预期是？",
    options: [
      { text: "随缘，赚多少算多少", score: 3 },
      { text: "至少翻倍，不然我费劲折腾干嘛", score: 0 },
      { text: "年化 30% 左右，我运气一向不差", score: 3 },
      { text: "年化 10%-15%，能稳定跑赢通胀就赢一半人了", score: 10 },
    ],
  },
  {
    q: "你手里的宁德时代从买入点回撤了 20%，业绩和行业逻辑都没看到实质变化，你会？",
    options: [
      { text: "按原计划继续持有，或在计划范围内分批加仓", score: 10 },
      { text: "加仓摊低成本，均价是散户的最后信仰", score: 3 },
      { text: "锁屏，假装账户不存在", score: 0 },
      { text: "果断止损，眼不见心不烦", score: 3 },
    ],
  },
  {
    q: "你做投资决策时，最主要的信息来源是？",
    options: [
      { text: "亲戚群、办公室传闻和出租车司机", score: 0 },
      { text: "券商 App 推送 + 财经新闻头条", score: 3 },
      { text: "公司财报、电话会议纪要、行业研报", score: 10 },
      { text: "股吧、雪球热帖、抖音上拍桌子的财经博主", score: 0 },
    ],
  },
  {
    q: "翻一下你现在的账户，持仓结构大致长什么样？",
    options: [
      { text: "几乎全仓一只股票（比方说一把梭了 NVIDIA）", score: 0 },
      { text: "3-5 只同赛道的股票（AI、算力、新能源你挑了一个）", score: 3 },
      { text: "没有「组合」概念，看哪个热就买哪个", score: 0 },
      { text: "股票 + 债券 + 现金 / 宽基指数，适度分散", score: 10 },
    ],
  },
  {
    q: "假设明天开盘 A 股连续两天跌 10%，或者美股一夜蒸发 8%，你的操作是？",
    options: [
      { text: "重新审视持仓质量，有现金就在低位分批加仓优质标的", score: 10 },
      { text: "恐慌清仓，逃命要紧", score: 0 },
      { text: "浑身冒汗但不动，幻想它自己涨回来", score: 3 },
      { text: "加杠杆抄底，搏一把 V 型反转", score: 0 },
    ],
  },
  {
    q: "你打算买入一只热门股（比方说特斯拉，或者 A 股的比亚迪），动手前通常会？",
    options: [
      { text: "看一眼 K 线，看着顺眼就下单", score: 0 },
      { text: "写下买入理由、目标价位、止损条件", score: 10 },
      { text: "刷几个博主的观点，听听他们怎么说", score: 3 },
      { text: "全凭盘感，投资这件事不能太理性", score: 0 },
    ],
  },
  {
    q: "对于融资、两融、美股期权、永续合约这类杠杆工具，你的态度是？",
    options: [
      { text: "经常用，不放大一下怎么翻身", score: 0 },
      { text: "偶尔用，每次都告诉自己「这次可控」", score: 3 },
      { text: "不碰，杠杆的本质是让时间站在你的对面", score: 10 },
      { text: "仅在极少数高确定性机会下，小比例使用", score: 7 },
    ],
  },
  {
    q: "想象一下：2015 年你买了 100 万贵州茅台，十年后账户翻了五六倍。把你放回当年，你最有可能的操作是？",
    options: [
      { text: "涨 50% 就兑现，谁知道后面会发生什么", score: 0 },
      { text: "反复想卖又舍不得，最终在某个高点卖掉一半", score: 3 },
      { text: "一看浮盈就想兑现，一亏就想加仓", score: 0 },
      { text: "除非基本面变坏，否则一直拿着", score: 10 },
    ],
  },
  {
    q: "一年到头，你会怎么复盘自己的投资决策？",
    options: [
      { text: "定期回顾每笔决策的买卖逻辑与偏差", score: 10 },
      { text: "偶尔想起来复盘，但没形成习惯", score: 7 },
      { text: "只记得赚最多和亏最惨的那几笔", score: 3 },
      { text: "从不复盘，过去的都是沉没成本", score: 0 },
    ],
  },
];

// 5 档可枚举结果，每档有独立主题 class 与专属嘴替点评
const LEVELS = [
  {
    id: "gambler",
    min: 0,
    max: 20,
    theme: "theme-gambler",
    emoji: "🎰",
    title: "投机赌徒",
    tagline: "你不是在投资，你是在给券商和对手盘众筹。",
    description: `
      <p class="quote">恭喜，你用"一键下单"成功把投资 App 变成了老虎机。</p>
      <p>你买入的理由通常是"它涨了"，卖出的理由通常是"它跌了"。账户不是资产，是你情绪波动的实时心电图。你账户里少的那些钱没"消失"，只是换了个主人——对面是个有策略、有纪律、睡得好的家伙。</p>
      <ul>
        <li>听到消息就下单，研报打开从不翻到第二页</li>
        <li>K 线一红手抖，一绿上头，全天围着大盘喘气</li>
        <li>止损线写在朋友圈里，写在账户里反而下不去手</li>
      </ul>`,
  },
  {
    id: "newbie",
    min: 21,
    max: 40,
    theme: "theme-newbie",
    emoji: "🌱",
    title: "韭菜学徒",
    tagline: "学费交得很努力，但交的姿势还不太对。",
    description: `
      <p class="quote">恭喜你已经分清"股票"和"基金"了，这是一个不该骄傲但应该记录的里程碑。</p>
      <p>你已经开始看财经新闻，但还没分清哪些是新闻、哪些是软广、哪些是带货。你相信"长期持有"，只是目前它的实际含义是"亏了不舍得卖"。你现在挑股票的思路，和去菜市场只看"哪个摊位排队最长"是一样的。</p>
      <ul>
        <li>朋友圈有人说"翻了十倍"就焦虑，有人说"腰斩"就暗爽</li>
        <li>会买，不会卖；会加仓，不会减仓</li>
        <li>收益预期永远比风险预期高一档</li>
      </ul>`,
  },
  {
    id: "rational",
    min: 41,
    max: 60,
    theme: "theme-rational",
    emoji: "🧭",
    title: "清醒的韭菜",
    tagline: "你已经知道自己是韭菜了，这本身就是进步。",
    description: `
      <p class="quote">道理都懂，手还是抖。</p>
      <p>你已经走出了"听消息炒股"的阶段，也能大致识别出谁是骗子。但真正的考验不在于你懂不懂，而在于账户浮亏 15% 时你还能不能按原计划做事——你是那种教练夸"动作挺标准"、一上台比赛就紧张的选手。</p>
      <ul>
        <li>理论课听了一堆，真枪实战时还是会手滑</li>
        <li>明白分散的道理，但组合里永远偷偷藏着一个"特殊仓位"</li>
        <li>复盘本建立了三个，用得最多的那一页写着"下次不要这样"</li>
      </ul>`,
  },
  {
    id: "steady",
    min: 61,
    max: 80,
    theme: "theme-steady",
    emoji: "🌲",
    title: "老练玩家",
    tagline: "市场不会对你特别温柔，但会给你应得的那份。",
    description: `
      <p class="quote">你的账户曲线也许不刺激，但它在所有人哀嚎时还活着。</p>
      <p>你已经明白投资拼的不是聪明，是少犯蠢。你对回撤的敏感超过对收益的敏感，对仓位的纪律超过对机会的贪婪。这种"无聊"本身就是一种稀缺能力——唯一要警惕的是"老练"带来的过度自信，市场最爱惩罚这个。</p>
      <ul>
        <li>能区分"信号"和"噪音"，不被短期新闻牵着走</li>
        <li>愿意为了正确的决策，承受一段时间的难受</li>
        <li>知道能力圈的边界在哪，也知道跨出去的代价</li>
      </ul>`,
  },
  {
    id: "master",
    min: 81,
    max: 100,
    theme: "theme-master",
    emoji: "👑",
    title: "冷血复利机器",
    tagline: "聚会里最无聊，但账户最厚的那种人。",
    description: `
      <p class="quote">你已经把投资变成了一件不依赖情绪也能持续做下去的事。</p>
      <p>你关注风险多过收益，关注过程多过结果，关注能力圈多过热点。别人追涨杀跌你在喝茶，别人恐慌割肉你在加仓。不是你运气好，是你把概率摆平了——唯一要小心的是"我已经搞懂了"这个念头，它是每一轮牛市最贵的心理账户。</p>
      <ul>
        <li>决策框架清晰，执行稳定，大多数动作是"预先设计"的</li>
        <li>在极端情绪面前还能独立思考，甚至还挺享受</li>
        <li>对认知边界的警觉，超过对下一个机会的兴奋</li>
      </ul>`,
  },
];

// ---------- 状态与 DOM ----------

const state = {
  answers: new Array(QUESTIONS.length).fill(null),
};

const el = {
  body: document.body,
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result"),
  submitBtn: document.getElementById("submit-btn"),
  retryBtn: document.getElementById("retry-btn"),
  questionsList: document.getElementById("questions-list"),
  progressFill: document.getElementById("progress-fill"),
  answeredCount: document.getElementById("answered-count"),
  totalCount: document.getElementById("total-count"),
  unansweredHint: document.getElementById("unanswered-hint"),
  resultTitle: document.getElementById("result-title"),
  resultTagline: document.getElementById("result-tagline"),
  resultDesc: document.getElementById("result-description"),
  resultEmoji: document.getElementById("result-emoji"),
};

el.totalCount.textContent = QUESTIONS.length;

// ---------- 事件 ----------

el.submitBtn.addEventListener("click", () => {
  if (countAnswered() < QUESTIONS.length) return;
  finish();
});

el.retryBtn.addEventListener("click", () => {
  state.answers = new Array(QUESTIONS.length).fill(null);
  setTheme(null);
  buildQuestions();
  show("quiz");
});

// ---------- 渲染 ----------

function show(name) {
  el.quiz.classList.toggle("hidden", name !== "quiz");
  el.result.classList.toggle("hidden", name !== "result");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildQuestions() {
  el.questionsList.innerHTML = "";
  QUESTIONS.forEach((q, qIdx) => {
    const item = document.createElement("div");
    item.className = "question-item";
    item.dataset.qIndex = String(qIdx);

    const idx = document.createElement("span");
    idx.className = "q-index";
    idx.textContent = `第 ${qIdx + 1} / ${QUESTIONS.length} 题`;
    item.appendChild(idx);

    const title = document.createElement("h3");
    title.textContent = q.q;
    item.appendChild(title);

    const opts = document.createElement("div");
    opts.className = "options";
    q.options.forEach((opt, oIdx) => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.setAttribute("role", "button");
      btn.setAttribute("tabindex", "0");
      btn.innerHTML = `<span class="option-index">${"ABCD"[oIdx]}</span><span class="option-text"></span>`;
      btn.querySelector(".option-text").textContent = opt.text;
      const select = () => {
        state.answers[qIdx] = oIdx;
        updateQuestionItem(qIdx);
        updateProgress();
      };
      btn.addEventListener("click", select);
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select();
        }
      });
      opts.appendChild(btn);
    });
    item.appendChild(opts);
    el.questionsList.appendChild(item);
  });
  updateProgress();
}

function updateQuestionItem(qIdx) {
  const item = el.questionsList.querySelector(`[data-q-index="${qIdx}"]`);
  if (!item) return;
  item.classList.toggle("answered", state.answers[qIdx] !== null);
  const chosen = state.answers[qIdx];
  item.querySelectorAll(".option").forEach((opt, i) => {
    opt.classList.toggle("selected", i === chosen);
  });
}

function updateProgress() {
  const answered = countAnswered();
  const total = QUESTIONS.length;
  el.answeredCount.textContent = answered;
  el.progressFill.style.width = `${(answered / total) * 100}%`;
  const remain = total - answered;
  if (remain === 0) {
    el.submitBtn.disabled = false;
    el.unansweredHint.textContent = "全部答完啦，点下方按钮接受审判。";
  } else {
    el.submitBtn.disabled = true;
    el.unansweredHint.textContent = `还剩 ${remain} 题未作答`;
  }
}

function countAnswered() {
  return state.answers.filter((a) => a !== null).length;
}

function finish() {
  const level = pickLevel(calcScore());
  el.resultTitle.textContent = level.title;
  el.resultTagline.textContent = level.tagline;
  el.resultEmoji.textContent = level.emoji;
  el.resultDesc.innerHTML = level.description;
  setTheme(level.theme);
  show("result");
}

function calcScore() {
  return state.answers.reduce((sum, ansIdx, qIdx) => {
    if (ansIdx === null) return sum;
    return sum + QUESTIONS[qIdx].options[ansIdx].score;
  }, 0);
}

function pickLevel(score) {
  return LEVELS.find((l) => score >= l.min && score <= l.max) || LEVELS[0];
}

function setTheme(themeClass) {
  const all = LEVELS.map((l) => l.theme);
  all.forEach((t) => el.body.classList.remove(t));
  el.body.classList.remove("theme-default");
  el.body.classList.add(themeClass || "theme-default");
}

// ---------- 启动 ----------
buildQuestions();
