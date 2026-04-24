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
      <p class="quote">你不是在亏钱，你是在给对面大哥的游艇众筹。</p>
      <p>买入理由是"它涨了"，卖出理由是"它跌了"，全套动作下来你管它叫"跟随趋势"——说白了就是赶潮流，离投机都差点意思。一天不盯盘你浑身痒，亏了是"大环境差"，赚了是"我盘感在线"。账户里少的那点钱没"消失"，只是换了个新主人——那人此刻正端着第三杯咖啡呢。</p>
      <ul>
        <li>财报翻不过三页，股吧小作文追到凌晨两点眼睛还在发光</li>
        <li>止损线写朋友圈的时候很专业，写进账户就秒怂</li>
        <li>下单前最纠结的是"梭哈还是半仓"，没想过"这玩意到底值不值"</li>
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
      <p class="quote">你现在信"价值投资"，真相是"套了就躺"。</p>
      <p>看财经新闻的时间 > 看财报，看小作文的时间 > 看新闻。嘴上"我长线布局"，打开 App 的真实目的是"今天涨了没"。你挑股票这事，跟菜市场只看"哪家排队最长"的人一个路数——你根本不知道人家在排啥，只知道"不能不排"。</p>
      <ul>
        <li>别人赚钱你焦虑，别人腰斩你偷着乐，这情绪刻度比你看财报精准一百倍</li>
        <li>对"加仓"研究得跟写论文似的，对"减仓"的理解是"再等等看"</li>
        <li>收益预期永远多一档，风险警报永远慢一拍</li>
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
      <p class="quote">懂是真懂，做是真不做。</p>
      <p>你能在饭桌上头头是道点评别人追涨杀跌，转头打开自己账户看到浮亏 15%，手又不听使唤下了一单。"分散"、"长持"、"止损"这三板斧你拿去评价别人的次数远超管住自己——教练夸你"动作挺标准"，一到正式比赛就开始原地抖腿。</p>
      <ul>
        <li>课听了一堆，账户里永远藏着一只"这只是个特例"的股</li>
        <li>复盘本建了三本，翻得最勤的那页写着"下次别这样"</li>
        <li>最擅长的事：用"反人性"解释别人失败，用"这次不一样"给自己冲动开脱</li>
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
      <p class="quote">你最大的优势是"很无聊"，这事一说出来就没人信。</p>
      <p>你比 80% 的散户强，不是因为聪明，是因为你肯认怂：看不懂的不碰，看懂了不重仓，重仓了不加杠杆。每一条单拎都有点"怂"，合起来正好解释了你账户为啥还活着。你真正的敌人只有一个——哪天你自己突然觉得"这次我可以破例"。</p>
      <ul>
        <li>别人高喊"这次不一样"你在喝茶，别人哀嚎"完蛋了"你在慢慢加仓</li>
        <li>错过十次大机会你没反应，踩进一个能力圈外的小坑能琢磨一个月</li>
        <li>你最看不起的不是亏钱的人，是那种明明懂还要装不懂、主打一个自我欺骗的人</li>
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
      <p class="quote">恭喜，你已经是聚会里没人再跟你聊股票的那种人——因为根本聊不动。</p>
      <p>你关注风险多过收益，过程多过结果，能力圈多过热点——说人话就是：你已经无聊到大多数散户觉得你"缺点激情"。别人问你"最近啥机会"，你说"没有"，对方以为你藏着掖着，其实你真就是在陈述事实。能干掉你的只剩一件事——哪个周末你一拍脑袋："我好像可以再聪明一点。"</p>
      <ul>
        <li>大部分操作几个月前就"预埋"好了，临场你只负责点确认</li>
        <li>极端行情里你比身边所有人都稳，偶尔还觉得有点上头</li>
        <li>你对"下一个风口"的兴奋，早被"我是不是又过界了"压住了</li>
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
