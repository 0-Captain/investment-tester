// 题目：10 道单选题，每题 4 个选项，选项分值 0 / 3 / 7 / 10
// 题目方向覆盖：风险认知、投资理念、情绪管理、资产配置、决策纪律
const QUESTIONS = [
  {
    q: "当你看到一只股票一周内上涨 40%，并且朋友极力推荐时，你的第一反应是？",
    options: [
      { text: "立刻买入，怕错过后面的涨幅", score: 0 },
      { text: "先小仓位跟进试试水", score: 3 },
      { text: "查一下公司的基本面再决定", score: 7 },
      { text: "警惕高位风险，优先评估自己是否理解这家公司", score: 10 },
    ],
  },
  {
    q: "你对"投资回报"的合理年化预期是？",
    options: [
      { text: "每年至少翻倍，否则没意思", score: 0 },
      { text: "年化 30% 左右，长期稳定", score: 3 },
      { text: "年化 10%-15%，跑赢通胀即可", score: 10 },
      { text: "没有明确预期，赚到就算", score: 3 },
    ],
  },
  {
    q: "一只持仓亏损 20% 了，基本面没有明显变化，你会？",
    options: [
      { text: "加仓摊低成本，总会回本的", score: 3 },
      { text: "立即割肉止损，不想再看", score: 3 },
      { text: "按原计划继续持有或分批加仓", score: 10 },
      { text: "不管它，眼不见为净", score: 0 },
    ],
  },
  {
    q: "你主要的投资信息来源是？",
    options: [
      { text: "社交平台的荐股博主和群聊", score: 0 },
      { text: "券商/平台推送、财经新闻", score: 3 },
      { text: "公司财报、行业研究报告、权威数据", score: 10 },
      { text: "身边朋友和家人", score: 0 },
    ],
  },
  {
    q: "你的投资组合大致是什么结构？",
    options: [
      { text: "几乎全仓一只或两只资产", score: 0 },
      { text: "几只同行业股票，集中在我熟悉的领域", score: 3 },
      { text: "股票 + 债券 + 现金 / 指数基金，适度分散", score: 10 },
      { text: "没有组合概念，看到机会就买", score: 0 },
    ],
  },
  {
    q: "大盘突然连续大跌 15%，你的情绪和行动是？",
    options: [
      { text: "恐慌性清仓，等跌稳了再说", score: 0 },
      { text: "焦虑但不动，等它自己涨回去", score: 3 },
      { text: "重新评估资产，考虑在低位分批加仓优质标的", score: 10 },
      { text: "加杠杆抄底，搏一把大反弹", score: 0 },
    ],
  },
  {
    q: "在买入一个标的之前，你通常会？",
    options: [
      { text: "看一眼 K 线走势就下单", score: 0 },
      { text: "看看最近的新闻和他人评价", score: 3 },
      { text: "写下买入理由、目标价位、止损条件", score: 10 },
      { text: "全凭盘感和运气", score: 0 },
    ],
  },
  {
    q: "对于"杠杆 / 融资 / 合约"这类工具，你的态度是？",
    options: [
      { text: "经常用，能放大收益", score: 0 },
      { text: "偶尔用，但控制不好仓位", score: 3 },
      { text: "仅在极少数高确定性机会下小比例使用", score: 7 },
      { text: "不用，杠杆会让我失去主动权", score: 10 },
    ],
  },
  {
    q: "你如何看待"长期持有"这件事？",
    options: [
      { text: "太慢了，我更喜欢短线快进快出", score: 0 },
      { text: "理论上认同，但实际拿不住", score: 3 },
      { text: "只有确认公司基本面变坏，才会考虑卖出", score: 10 },
      { text: "只要一看到浮盈就想兑现", score: 0 },
    ],
  },
  {
    q: "一年下来，你是否会复盘自己的投资决策？",
    options: [
      { text: "从不复盘，赚了就好亏了就算", score: 0 },
      { text: "只记得大赚大亏的几次", score: 3 },
      { text: "会定期回顾每笔决策的买卖逻辑与偏差", score: 10 },
      { text: "偶尔复盘，但没有形成习惯", score: 7 },
    ],
  },
];

// 结果等级（可枚举）：按总分区间映射
const LEVELS = [
  {
    id: "gambler",
    min: 0,
    max: 20,
    title: "投机赌徒",
    tagline: "更像在赌场，而不是在投资。",
    description: `
      <h3>你的画像</h3>
      <p>当前的决策更多依赖直觉、情绪和短期刺激，几乎没有建立属于自己的判断框架。盈利往往来自运气，而亏损会成为常态。</p>
      <h3>主要盲点</h3>
      <ul>
        <li>把"涨"当信号，把"跌"当噩耗，追涨杀跌</li>
        <li>没有止损与仓位管理，容易被一次大亏击穿心态</li>
        <li>信息来源单一，容易被荐股和情绪裹挟</li>
      </ul>
      <h3>下一步建议</h3>
      <ul>
        <li>先把仓位降到能够安然入睡的水平</li>
        <li>任何买入都写下一句话的理由，不会写就不买</li>
        <li>用几个月时间只做观察和记录，再谈盈利</li>
      </ul>`,
  },
  {
    id: "newbie",
    min: 21,
    max: 40,
    title: "投资小白",
    tagline: "知道要学习，但还没有形成自己的体系。",
    description: `
      <h3>你的画像</h3>
      <p>你已经意识到投资不是简单地"低买高卖"，但方法论仍然零散，容易在市场波动中动摇原计划。</p>
      <h3>主要盲点</h3>
      <ul>
        <li>对收益预期偏高，对风险预期偏低</li>
        <li>缺少资产配置观念，仓位过于集中</li>
        <li>容易受短期新闻与账户涨跌影响动作变形</li>
      </ul>
      <h3>下一步建议</h3>
      <ul>
        <li>读 1-2 本经典投资书建立框架（如《投资最重要的事》）</li>
        <li>用指数基金或 ETF 做长期定投，先学会"拿住"</li>
        <li>为每笔交易设好止损和最大回撤预算</li>
      </ul>`,
  },
  {
    id: "rational",
    min: 41,
    max: 60,
    title: "理性新手",
    tagline: "具备基本理性，开始形成自己的判断。",
    description: `
      <h3>你的画像</h3>
      <p>你能够抵御大部分市场噪音，也知道分散和止损的重要性。真正的挑战来自"知道"和"做到"之间的距离。</p>
      <h3>主要盲点</h3>
      <ul>
        <li>有计划，但执行不够严格，容易临时改变主意</li>
        <li>对自身能力圈边界的认知还不够清晰</li>
        <li>复盘意识有，但没有形成系统</li>
      </ul>
      <h3>下一步建议</h3>
      <ul>
        <li>显式写下自己的能力圈清单，圈外资产坚决不碰</li>
        <li>建立交易日志，记录买入假设、后续验证、偏差原因</li>
        <li>将大部分资金放在规则化策略上，小部分做主动决策</li>
      </ul>`,
  },
  {
    id: "steady",
    min: 61,
    max: 80,
    title: "稳健投资者",
    tagline: "在波动里也能睡得着觉。",
    description: `
      <h3>你的画像</h3>
      <p>你已经把投资作为长期事业在经营：有组合、有纪律、有复盘。收益可能不会非常惊艳，但复利效应正在显现。</p>
      <h3>主要优势</h3>
      <ul>
        <li>能区分"噪音"和"信号"</li>
        <li>重视仓位管理与回撤控制</li>
        <li>愿意为了正确的决策承受短期不舒服</li>
      </ul>
      <h3>下一步建议</h3>
      <ul>
        <li>警惕"经验带来的惯性"，在牛市保持谦卑</li>
        <li>定期审视资产配置是否与人生阶段匹配</li>
        <li>把时间花在少数确定性最高的决策上，而不是频繁交易</li>
      </ul>`,
  },
  {
    id: "master",
    min: 81,
    max: 100,
    title: "价值投资大师",
    tagline: "纪律、耐心、独立判断，缺一不可。",
    description: `
      <h3>你的画像</h3>
      <p>你已经把投资当作一场长期概率游戏来玩：关注风险多于关注回报，关注过程多于关注结果，关注能力圈多于关注热点。</p>
      <h3>主要优势</h3>
      <ul>
        <li>拥有清晰的决策框架与严格的自我约束</li>
        <li>在市场极端情绪中依然能保持冷静与独立判断</li>
        <li>对自己的认知边界有足够清晰的认识</li>
      </ul>
      <h3>提醒</h3>
      <ul>
        <li>警惕"幸存者偏差"带来的过度自信</li>
        <li>持续更新能力圈，市场结构在变化</li>
        <li>好的投资最终是好的人生决策，别把全部精力都放在收益上</li>
      </ul>`,
  },
];

// ---------- 状态与 DOM ----------
const state = {
  index: 0,
  answers: new Array(QUESTIONS.length).fill(null),
};

const el = {
  intro: document.getElementById("intro"),
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result"),
  startBtn: document.getElementById("start-btn"),
  prevBtn: document.getElementById("prev-btn"),
  nextBtn: document.getElementById("next-btn"),
  retryBtn: document.getElementById("retry-btn"),
  shareBtn: document.getElementById("share-btn"),
  questionText: document.getElementById("question-text"),
  options: document.getElementById("options"),
  progressFill: document.getElementById("progress-fill"),
  progressCurrent: document.getElementById("progress-current"),
  progressTotal: document.getElementById("progress-total"),
  resultTitle: document.getElementById("result-title"),
  resultTagline: document.getElementById("result-tagline"),
  resultDesc: document.getElementById("result-description"),
  scoreNumber: document.getElementById("score-number"),
  scoreRing: document.querySelector(".score-ring"),
};

el.progressTotal.textContent = QUESTIONS.length;

// ---------- 事件 ----------
el.startBtn.addEventListener("click", () => {
  show("quiz");
  renderQuestion();
});

el.nextBtn.addEventListener("click", () => {
  if (state.index < QUESTIONS.length - 1) {
    state.index++;
    renderQuestion();
  } else {
    finish();
  }
});

el.prevBtn.addEventListener("click", () => {
  if (state.index > 0) {
    state.index--;
    renderQuestion();
  }
});

el.retryBtn.addEventListener("click", () => {
  state.index = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  show("intro");
});

el.shareBtn.addEventListener("click", async () => {
  const score = calcScore();
  const level = pickLevel(score);
  const text = `我在"投资决策水平测试"中得了 ${score} 分，等级：${level.title}（${level.tagline}）`;
  try {
    await navigator.clipboard.writeText(text);
    el.shareBtn.textContent = "已复制";
    setTimeout(() => (el.shareBtn.textContent = "复制结果"), 1500);
  } catch {
    el.shareBtn.textContent = "复制失败";
    setTimeout(() => (el.shareBtn.textContent = "复制结果"), 1500);
  }
});

// ---------- 渲染 ----------
function show(name) {
  el.intro.classList.toggle("hidden", name !== "intro");
  el.quiz.classList.toggle("hidden", name !== "quiz");
  el.result.classList.toggle("hidden", name !== "result");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const q = QUESTIONS[state.index];
  el.questionText.textContent = `${state.index + 1}. ${q.q}`;
  el.options.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    if (state.answers[state.index] === i) div.classList.add("selected");
    div.innerHTML = `
      <span class="option-index">${"ABCD"[i]}</span>
      <span class="option-text"></span>
    `;
    div.querySelector(".option-text").textContent = opt.text;
    div.addEventListener("click", () => {
      state.answers[state.index] = i;
      renderQuestion();
    });
    el.options.appendChild(div);
  });

  el.progressCurrent.textContent = state.index + 1;
  const pct = ((state.index + 1) / QUESTIONS.length) * 100;
  el.progressFill.style.width = `${pct}%`;

  el.prevBtn.disabled = state.index === 0;
  el.nextBtn.disabled = state.answers[state.index] === null;
  el.nextBtn.textContent = state.index === QUESTIONS.length - 1 ? "查看结果" : "下一题";
}

function finish() {
  const score = calcScore();
  const level = pickLevel(score);
  el.scoreNumber.textContent = score;
  el.resultTitle.textContent = level.title;
  el.resultTagline.textContent = level.tagline;
  el.resultDesc.innerHTML = level.description;
  const deg = Math.round((score / 100) * 360);
  el.scoreRing.style.setProperty("--score-deg", `${deg}deg`);
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
