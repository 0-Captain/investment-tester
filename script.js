// 题目：10 道单选题，每题 4 个选项，选项分值 0 / 3 / 7 / 10
// 维度：风险认知、投资理念、情绪管理、资产配置、决策纪律
const QUESTIONS = [
  {
    q: "当你看到一只股票一周内上涨 40%，并且朋友极力推荐时，你的第一反应是？",
    options: [
      { text: "立刻买入，怕错过后面的涨幅", score: 0 },
      { text: "先小仓位跟进试试水", score: 3 },
      { text: "查一下公司的基本面再决定", score: 7 },
      { text: "警惕高位风险，先评估自己是否真正理解这家公司", score: 10 },
    ],
  },
  {
    q: "你对「投资回报」的合理年化预期是？",
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
    q: "对于「杠杆 / 融资 / 合约」这类工具，你的态度是？",
    options: [
      { text: "经常用，能放大收益", score: 0 },
      { text: "偶尔用，但控制不好仓位", score: 3 },
      { text: "仅在极少数高确定性机会下小比例使用", score: 7 },
      { text: "不用，杠杆会让我失去主动权", score: 10 },
    ],
  },
  {
    q: "你如何看待「长期持有」这件事？",
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
      <h3>画像</h3>
      <p>你买入的理由通常是"它涨了"，你卖出的理由通常是"它跌了"。账户不是资产，是你情绪波动的实时心电图。你最需要的不是一个新策略，是一个冷静期。</p>
      <h3>你大概率有这些毛病</h3>
      <ul>
        <li>听到消息就下单，研报打开从不翻到第二页</li>
        <li>K 线一红手抖，K 线一绿上头，全天围绕大盘喘气</li>
        <li>止损线写在朋友圈里，写在账户里反而下不去手</li>
        <li>看到别人赚比自己亏还难受</li>
      </ul>
      <h3>扎心翻译</h3>
      <p>你账户里少的那些钱没有"消失"，只是换了个主人。对面是个有策略、有纪律、睡得好的家伙。</p>
      <h3>抢救方案</h3>
      <ul>
        <li>把合约/杠杆 App 卸载，至少冷静一个月</li>
        <li>最近 5 笔交易，一笔一笔写"为什么买 / 为什么卖"，写不出来说明你不是在投资，是在按按钮</li>
        <li>把仓位砍到能安心睡觉的水平，先活下来，再谈盈利</li>
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
      <h3>画像</h3>
      <p>你已经开始看财经新闻，但还没完全分清哪些是新闻、哪些是软广、哪些是带货。你相信"长期持有"，只是目前它的实际含义是"亏了不舍得卖"。</p>
      <h3>你大概率有这些毛病</h3>
      <ul>
        <li>朋友圈有人说"翻了十倍"就焦虑，有人说"腰斩"就暗爽</li>
        <li>会买，不会卖；会加仓，不会减仓</li>
        <li>看图就能做决策，财报看三页眼睛开始发涩</li>
        <li>收益预期永远比风险预期高一档</li>
      </ul>
      <h3>扎心翻译</h3>
      <p>你现在挑股票的思路，和去菜市场挑水果时只看"哪个摊位排队最长"是一样的。</p>
      <h3>升级动作</h3>
      <ul>
        <li>先把 70% 的钱扔进宽基指数定投，剩下 30% 再折腾</li>
        <li>每笔交易前写一句话理由，写不出来就说明你不是想买，只是手痒</li>
        <li>别再问"这只能不能买"，改成问"它凭什么涨"，问题不一样，答案也不一样</li>
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
      <h3>画像</h3>
      <p>你已经走出了"听消息炒股"的阶段，有了基本的判断框架，也能大致识别出谁是骗子。真正的考验不在于你懂不懂，而在于——账户浮亏 15% 时你还能不能按原计划做事。</p>
      <h3>你大概率有这些毛病</h3>
      <ul>
        <li>理论课听了一堆，真枪实战时还是会手滑</li>
        <li>明白分散的道理，但组合里永远偷偷藏着一个"特殊仓位"</li>
        <li>计划写得头头是道，执行起来经常"这次不一样"</li>
        <li>复盘本建立了三个，用得最多的那一页写着"下次不要这样"</li>
      </ul>
      <h3>扎心翻译</h3>
      <p>你是那种教练夸"动作挺标准"、但一上台比赛就紧张的选手。</p>
      <h3>升级动作</h3>
      <ul>
        <li>显式写下自己的能力圈清单，圈外的资产坚决不碰，哪怕它在飞</li>
        <li>把"特殊仓位"强制压到总仓位 10% 以下，保护你的其实不是规则，是你自己</li>
        <li>认真做一次全年复盘，你会发现打败你的从来不是行情，是同一种错误</li>
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
      <h3>画像</h3>
      <p>你已经明白投资拼的不是聪明，是少犯蠢。你对回撤的敏感超过对收益的敏感，对仓位的纪律超过对机会的贪婪。这种"无聊"本身就是一种稀缺能力。</p>
      <h3>你在这些地方已经做对了</h3>
      <ul>
        <li>能区分"信号"和"噪音"，不被短期新闻牵着走</li>
        <li>愿意为了正确的决策，承受一段时间的难受</li>
        <li>知道自己能力圈的边界在哪，也知道跨出去的代价</li>
      </ul>
      <h3>提醒你一下</h3>
      <ul>
        <li>警惕"老练"带来的过度自信，市场最爱惩罚这一点</li>
        <li>你已经打败了 80% 的散户，下一个对手不是别人，是你自己想证明自己还在进化的那个冲动</li>
        <li>别把"我很懂"和"这次我能看准"当成同一件事</li>
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
      <p class="quote">你已经把投资这件事，变成了一件不依赖情绪也能持续做下去的事。</p>
      <h3>画像</h3>
      <p>你关注风险多过收益，关注过程多过结果，关注能力圈多过热点。别人追涨杀跌你在喝茶，别人恐慌割肉你在加仓。不是你运气好，是你把概率摆平了。</p>
      <h3>你的核心优势</h3>
      <ul>
        <li>决策框架清晰，执行纪律稳定，大多数决策是"预先设计"的</li>
        <li>在极端情绪面前还能独立思考，甚至还挺享受</li>
        <li>对自己认知边界的警觉，超过对下一个机会的兴奋</li>
      </ul>
      <h3>最后一句忠告</h3>
      <ul>
        <li>"我已经搞懂了"是每一轮牛市最贵的心理账户，小心</li>
        <li>复利最大的敌人，是你某一天觉得"我可以再聪明一点"</li>
        <li>好的投资终究是好的人生决策，账户厚不是终点，别为它让渡太多别的东西</li>
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
  shareBtn: document.getElementById("share-btn"),
  questionsList: document.getElementById("questions-list"),
  progressFill: document.getElementById("progress-fill"),
  answeredCount: document.getElementById("answered-count"),
  totalCount: document.getElementById("total-count"),
  unansweredHint: document.getElementById("unanswered-hint"),
  resultTitle: document.getElementById("result-title"),
  resultTagline: document.getElementById("result-tagline"),
  resultDesc: document.getElementById("result-description"),
  resultEmoji: document.getElementById("result-emoji"),
  scoreNumber: document.getElementById("score-number"),
  scoreRing: document.querySelector(".score-ring"),
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

el.shareBtn.addEventListener("click", async () => {
  const score = calcScore();
  const level = pickLevel(score);
  const text = `我在"投资决策水平测试"里拿了 ${score} 分，等级：${level.title} —— ${level.tagline}`;
  try {
    await navigator.clipboard.writeText(text);
    flashBtn(el.shareBtn, "已复制 ✓");
  } catch {
    flashBtn(el.shareBtn, "复制失败");
  }
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
  const score = calcScore();
  const level = pickLevel(score);
  el.scoreNumber.textContent = score;
  el.resultTitle.textContent = level.title;
  el.resultTagline.textContent = level.tagline;
  el.resultEmoji.textContent = level.emoji;
  el.resultDesc.innerHTML = level.description;
  const deg = Math.round((score / 100) * 360);
  el.scoreRing.style.setProperty("--score-deg", `${deg}deg`);
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

function flashBtn(btn, text) {
  const old = btn.textContent;
  btn.textContent = text;
  setTimeout(() => (btn.textContent = old), 1500);
}

// ---------- 启动 ----------
buildQuestions();
