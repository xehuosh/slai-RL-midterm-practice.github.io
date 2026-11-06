/*
 * RL Midterm Practice Lab — question bank
 * ------------------------------------------------------------------
 * All question stems and options are in ENGLISH. After answering, the site shows
 * the Chinese translation of the question (中文版题目) plus a detailed Chinese
 * explanation (详细中文解析).
 *
 * Compact authoring format (edit this file directly, no build step needed):
 *   CH(n, 'source tag')      start chapter n
 *   S(enStem, enOptions, correctIndex, zhStem, zhOptions, zhExplanation, keyPoint, source)
 *   M(enStem, enOptions, correctIndexArray, zhStem, zhOptions, zhExplanation, keyPoint, source)
 *   N(enStem, numericAnswer, zhStem, zhExplanation, keyPoint, source, tolerance)
 *
 * Math is written as LaTeX between $...$ (inline) and $$...$$ (display).
 * Backslashes are doubled here because these are JS template literals.
 * It is typeset by the locally bundled KaTeX in vendor/katex/ (no CDN).
 * Sources: HKUST RL lecture slides (Bing-Yi Jing, L1–L12), the four assigned
 * papers (Nature DQN 2015, Prioritized Experience Replay, Dueling Networks,
 * Rainbow) and a few adapted classic exercises from EasyRL / 蘑菇书.
 * No course PDFs are redistributed here.
 */
window.BANK_META = {
  chapters: [
    {n:1,  zh:'引言与经典案例',       en:'Introduction & Examples',        src:'L1 Examples · L2 Introduction'},
    {n:2,  zh:'形式化：状态与 MDP',   en:'Formulation: States & MDPs',     src:'L3 Formulation'},
    {n:3,  zh:'MP / MRP / MDP 与贝尔曼方程', en:'MP, MRP, MDP & Bellman',  src:'L4 MDP(3)'},
    {n:4,  zh:'动态规划',             en:'Dynamic Programming',            src:'L5 DP(3)'},
    {n:5,  zh:'无模型预测 MC / TD',   en:'Model-free Prediction',          src:'L6 Model-free Prediction'},
    {n:6,  zh:'无模型控制',           en:'Model-free Control',             src:'L7 Model-free Control'},
    {n:7,  zh:'价值函数近似',         en:'Value Function Approximation',   src:'L8 Value Function Approximation'},
    {n:8,  zh:'Nature DQN 2015',      en:'Nature DQN 2015',                src:'L9 Nature DQN 2015'},
    {n:9,  zh:'DQN 改进：DDQN / PER / Dueling', en:'DQN Improvements',     src:'L10a DQN+ · L10b PER · L10c Dueling'},
    {n:10, zh:'Rainbow',              en:'Rainbow',                        src:'L10d Rainbow'},
    {n:11, zh:'策略梯度',             en:'Policy Gradient',                src:'L11 Policy Gradient'},
    {n:12, zh:'学习与规划一体化',     en:'Integrated Learning & Planning', src:'L12 Integrated Learning & Planning'}
  ],
  notes: {
    zh:'题库共覆盖课程 15 份课件与 4 篇指定论文的核心考点，按 12 章编排，题型包括单选、多选与计算题。英文题干与选项保持考试语言；提交答案后显示中文版题目、参考答案、详细中文解析与考点速记。部分概念题改编自 EasyRL（蘑菇书）课后经典习题，已在题目「来源」中标注。<br><br>课件中的示例（Student MRP、Small Gridworld、AB example、Cliff Walking、Jack’s Car Rental、Mountain Car）与论文中的原始数值（84×84×4 输入、49 款 Atari、γ=0.99、1M 回放、 Rainbow 6 项改进等）均按原文核对。原始课件 PDF 与论文全文不随网页发布。<br><br>正确率按每道题「最近一次提交」计算；多选题须完全选对，计算题按给定容差判定。答错的题自动汇总进「错题本」，可批量复习、导出 Markdown 清单，或标记「已掌握」。进度保存在本机 localStorage，重新开始不会删除历史；导出/导入可跨设备合并记录。',
    en:'This bank covers the 15 lecture decks and the 4 assigned papers in 12 chapters, with single-choice, multiple-choice and calculation questions. Stems and options are in English; after submitting, a Chinese translation of the item, the answer, a detailed Chinese explanation and a key-point note are shown. Some conceptual items are adapted from classic EasyRL exercises (credited in the source line).<br><br>Numeric examples (Student MRP, Small Gridworld, AB example, Cliff Walking, Jack’s Car Rental, Mountain Car) and paper values (84×84×4 input, 49 Atari games, γ=0.99, 1M replay memory, the six Rainbow components) were checked against the source material. No course PDFs are redistributed.<br><br>Accuracy uses the most recent submission for each question. Multiple-choice questions require the exact set; calculation questions are graded with a tolerance. Wrong answers feed the Mistake Book, which supports batch review, Markdown export and a “mastered” flag. Progress is stored in localStorage; export/import merges records across devices.'
  }
};

(function(){
'use strict';
const B = {};
let cur = 0, curSrc = '';
const CH = (n, src) => { cur = n; curSrc = src; B[n] = []; };
const S = (q,o,a,zq,zo,e,k,s) => B[cur].push({t:'single',q,o,a:[a],zq,zo,e,k:k||'',s:s||curSrc});
const M = (q,o,a,zq,zo,e,k,s) => B[cur].push({t:'multi',q,o,a,zq,zo,e,k:k||'',s:s||curSrc});
const N = (q,v,zq,e,k,s,tol) => B[cur].push({t:'numeric',q,v,tol:(tol===undefined?0.005:tol),zq,e,k:k||'',s:s||curSrc});

/* ==================================================================== */
/* CHAPTER 1 — Introduction & Examples (L1, L2)                          */
/* ==================================================================== */
CH(1, 'L1 Examples · L2 Introduction');

S(`Which statement best captures the objective of reinforcement learning as stated in the lectures?`,
  [`Minimise prediction error on a fixed labelled dataset`,`Learn a good sequence of decisions under uncertainty in order to achieve a long-term goal`,`Discover clusters in unlabelled data without interacting with the environment`,`Compute a shortest path when the transition model is fully known and no learning occurs`], 1,
  `按课件，强化学习的目标是什么？`,
  [`在固定的带标签数据集上最小化预测误差`,`在不确定性下学习「一连串好的决策」，以实现长期目标`,`在不与环境交互的前提下发现无标签数据中的簇`,`在转移模型完全已知、无需学习时计算最短路径`],
  `课件 L2 p6 明确写道：RL 的目标是 <b>learning to make a “good” sequence of decisions under uncertainty to achieve long-term goal</b>。关键词有三个：<b>序列决策</b>（不是单步分类）、<b>不确定性</b>（环境转移未知或随机）、<b>长期目标</b>（最大化累积奖励，而不是即时奖励）。<br>A 是监督学习的经验风险最小化；C 是无监督学习；D 是「规划 / planning」而非学习——课件 L3 p42 特别区分：规划假设模型已知、只做内部计算，RL 则是环境未知、通过交互试错改进策略。`,
  `RL = 序列决策 + 不确定性 + 长期累积奖励；与 SL/UL 的根本区别是「没有正确动作标签，只有评价性奖励」。`);

S(`The "reward hypothesis" discussed in the lectures asserts which of the following?`,
  [`Every time step must provide a non-zero reward`,`All goals can be described as the maximisation of expected cumulative reward`,`Rewards must always lie in the interval [-1, 1]`,`Only the reward matters: states and actions can be omitted from the formulation`], 1,
  `课件中讨论的「奖励假说（reward hypothesis）」主张什么？`,
  [`每一个时间步都必须给出非零奖励`,`所有目标都可以描述为期望累积奖励的最大化`,`奖励必须始终落在 [-1, 1] 区间内`,`只有奖励重要，状态与动作可以从建模中省略`],
  `奖励假说（L2 p15，以及 Silver 等《Reward is Enough》）的表述是：All goals can be described by the maximisation of expected cumulative reward。注意三个限定：<b>期望</b>（对随机性的平均）、<b>累积</b>（跨越时间的回报 G<sub>t</sub>，不是单步 R<sub>t+1</sub>）、<b>最大化</b>（优化目标）。<br>A 错：稀疏奖励（如围棋只在终局给 ±1）完全允许。C 错：DQN 为了稳定才把奖励裁剪到 {−1,0,+1}，这是工程技巧而非假说。D 错：奖励函数本身定义在 (s,a) 上，状态与动作是 MDP 五元组不可省略的部分。课件 p17 还列出奖励的实际困难：如何设计、多目标冲突、完全无奖励时只能转向模仿学习。`,
  `奖励假说 = 期望累积奖励最大化；「稀疏」「裁剪」都不是它的内容。`);

S(`Which of the following is NOT a characteristic of reinforcement learning listed in the lectures?`,
  [`A scalar reward signal`,`Delayed feedback`,`The exploration / exploitation trade-off`,`Training examples that are independent and identically distributed (i.i.d.)`], 3,
  `下列哪一项不是课件列出的强化学习特征？`,
  [`标量奖励信号`,`延迟反馈`,`探索 / 利用权衡`,`训练样本独立同分布（i.i.d.）`],
  `课件 L2 p11–p12 列出的特征是：reward、optimization、delayed feedback、exploration/exploitation、generalisation、policy、online/offline learning、<b>sequential data (non i.i.d.)</b>、sequential decision making。也就是说 RL 的数据恰恰是<b>非 i.i.d.</b> 的：当前状态由上一动作决定，样本之间强相关，而且数据分布还会随策略改变而漂移。<br>这一点直接解释了 DQN 为什么需要经验回放（打散相关性）与目标网络（避免自举反馈回路）。因此 D 是「不是特征」的选项。`,
  `RL 数据 = 序列化、非 i.i.d.、分布随策略漂移；经验回放正是为打破相关性。`);

S(`A move in the game of Go may only be judged good or bad at the very end of the game. What difficulty does this illustrate?`,
  [`The reward function must be dense at every step`,`Delayed feedback makes credit assignment to earlier decisions difficult`,`The task cannot be formulated as an MDP`,`Exploration is unnecessary once the value function is known`], 1,
  `围棋中某一步棋的好坏往往要到终局才知道。这说明了什么困难？`,
  [`奖励函数必须在每一步都是稠密的`,`延迟反馈使得把功劳 / 责任分配给早期决策变得困难（credit assignment）`,`该任务无法建模成 MDP`,`一旦知道价值函数就不需要探索`],
  `课件 L2 p19–p21 把这一现象称为 <b>delayed feedback / delayed consequences</b>：决策的影响可能很久之后才显现（直升机加油防止之后坠毁、挡住对手很多步之后的取胜机会、选研究课题、职业规划）。由此产生两个难题：<b>planning</b> 要在短期与长期奖励之间权衡；<b>learning</b> 中 credit assignment 很难——很难量化「现在这一步」到底有多好，有时牺牲即时奖励反而得到更大的长期回报。<br>A 错：稀疏奖励是允许的，「必须稠密」不是结论；课件反而用这个例子说明信息稀疏。C 错：围棋仍可建模为 MDP（AlphaGo 用 MCTS + 价值网络）。D 错：探索与是否知道价值函数是两件事。`,
  `延迟反馈 → 信用分配难 → 需要折扣回报 G<sub>t</sub> 与价值函数把未来奖励归因到当前状态。`);

S(`A newly enrolled PhD student tries several different research problems before settling on one. In the lectures this is used as an example of`,
  [`Exploration`,`Exploitation`,`Planning with a known model`,`Offline learning from another agent's experience`], 0,
  `课件用「刚入学博士生尝试多个不同研究课题」来说明什么？`,
  [`探索（exploration）`,`利用（exploitation）`,`在已知模型下规划`,`从他人经验中离线学习`],
  `课件 L2 p22–p24：探索 = 通过试错收集关于世界的信息（gather experience by exploring the world），利用 = 用已有经验指导后续决策以拿到奖励。博士生「广撒网试不同题目」、学骑车不断摔倒、找餐厅多试几家，都是探索的典型例子。<br><b>Exploration/exploitation 是 RL 的核心（heart of RL）</b>：只利用会永远不知道被放弃的动作其实更好（L7 p15 的「I will never be explored」），只探索则拿不到高回报，所以需要 ε-greedy、GLIE 等机制。`,
  `探索=收集信息，利用=用信息换奖励；二者权衡贯穿 MC control、SARSA、Q-learning、Noisy Nets。`);

M(`Which statements correctly contrast RL with supervised learning, unsupervised learning, imitation learning and AI planning, as in the lecture table?`,
  [`Supervised learning is given the correct label/action, whereas RL receives only evaluative feedback (a reward)`,`Imitation learning reduces an RL problem to supervised learning by using expert demonstrations`,`AI planning assumes the dynamics of the environment are known, while RL learns from interaction with an initially unknown environment`,`In RL the training examples are i.i.d. samples from a fixed distribution, exactly as in supervised learning`], [0,1,2],
  `按课件的对比表，哪些说法正确地刻画了 RL 与监督 / 无监督 / 模仿学习 / AI 规划的区别？`,
  [`监督学习给出正确标签 / 动作，而 RL 只收到评价性反馈（奖励）`,`模仿学习借助专家示范，把 RL 问题化归为监督学习`,`AI 规划假设环境动态已知；RL 则在初始未知的环境中通过交互学习`,`RL 的训练样本与监督学习一样，是从固定分布中 i.i.d. 采样的`],
  `课件 L2 p32–p38 用一张表逐列比较 SL / UL / RL / IL / AI Planning：<br>• <b>SL</b>：correct labels provided；RL 得到的是 <b>censored labels</b>——只告诉你「这个动作带来多少奖励」，不告诉你「正确答案是什么」。<br>• <b>UL</b>：no labels（自监督）。<br>• <b>IL / Inverse RL</b>：reduces RL to SL（p38），用专家轨迹做监督。<br>• <b>AI Planning</b>：assume to know how decisions impact the environment（p34），例如动态规划；RL 则 trial & error。<br>D 错误：RL 数据是序列化且 non i.i.d.（p12），这正是经验回放要解决的问题。<br>补充：表中 RL 在「optimisation / learns from experience / generalisation / delayed consequences / exploration」多项上都是「有」，而 SL 不优化长期奖励、不做探索，UL 不给标签。`,
  `SL 有正确标签 → RL 只有奖励（censored labels）→ IL 把 RL 变回 SL → Planning 已知模型。`);

S(`Why is generalisation essential when an RL agent learns to play Atari directly from screen pixels?`,
  [`The number of possible images is astronomically large, so a lookup table over states is infeasible`,`Atari rewards are continuous rather than discrete`,`An Atari game is an MDP with exactly one state`,`Q-learning is a supervised learning algorithm and therefore needs a large dataset`], 0,
  `为什么 RL 智能体直接从 Atari 像素学习时必须具备泛化能力？`,
  [`可能的图像数量是天文数字，无法用查表法逐个状态存储`,`Atari 的奖励是连续值而不是离散值`,`Atari 游戏是只有一个状态的 MDP`,`Q-learning 是监督学习算法，因此需要大数据集`],
  `课件 L2 p30 给出的估算是：一幅图像可能有 $[256^{(100\\times200)}]^{3}$ 种（高 × 宽 × RGB 三通道）。状态数少时可用枚举 / Q-table；状态空间巨大或连续时，存储与「逐个状态慢慢学」都不可行，必须<b>从见过的状态泛化到没见过的状态</b>——这正是 <b>DRL = Deep Learning + RL</b> 的动机（p31），也是 L8 价值函数近似与 L9 DQN 的出发点。<br>B 错：DQN 反而把奖励裁剪成 {−1,0,+1}。C 错：单状态 MDP 是 bandit。D 错：Q-learning 是异策略 TD 控制，不是监督学习（虽然用神经网络拟合 Q 时形式上像回归）。`,
  `状态空间爆炸 → 查表法失效 → 需要 v̂(s,w) / q̂(s,a,w) 的函数近似与泛化。`, 'L2 Introduction · EasyRL Ch.1 Q1-4 (adapted)');

S(`In the lectures, a policy is described as`,
  [`A mapping from past experience (history / state) to an action`,`The state-transition probability of the environment`,`The total discounted return of an episode`,`A model that predicts the next immediate reward`], 0,
  `课件中，策略（policy）被描述为`,
  [`从历史经验（history / state）到动作的映射`,`环境的状态转移概率`,`一幕的总折扣回报`,`预测下一步即时奖励的模型`],
  `L2 p29 的定义是「mapping from past experience to action」；L3 p34 给出严格形式：<b>确定性策略</b> $a = π(s)$，<b>随机策略</b> $π(a|s) = P[A_{t} = a | S_{t} = s]$。策略完全定义了智能体的行为，是 RL agent 三大组件之一。<br>其他选项分别对应：B = 模型中的 P；C = 回报 G<sub>t</sub>；D = 模型中的 R。注意「价值函数」是另一个组件，用于评估状态 / 动作好坏，策略则直接输出动作。`,
  `三大组件：policy（行为）、value function（评估）、model（预测环境）。`);

S(`Learning from one's own experience while interacting with the environment (suitable for AI games) is called, in the lectures,`,
  [`Online learning`,`Offline learning`,`Imitation learning`,`Planning`], 0,
  `课件把「在交互中从自身经验中学习（适合 AI 游戏）」称为什么？`,
  [`在线学习（online learning）`,`离线学习（offline learning）`,`模仿学习`,`规划`],
  `L2 p28：Online = learn from own experience（自己的试错轨迹），Offline = learn from other's experience（别人的经验，但每个人情况不同、需要调整）。<br><b>术语提醒</b>：课件这里的 online/offline 是「经验来自谁」，与现代文献中 offline RL（固定数据集、不再与环境交互）含义不同；现代语境下本课程的 online 更接近 on-policy 交互学习。考试按课件定义作答。`,
  `课件：online=自己的经验；offline=他人的经验。`);

S(`The lectures note that in real life an agent "experiences life only once" (one trajectory only). What is the main consequence?`,
  [`Rewards are always delayed by exactly one time step`,`The agent never observes the counterfactual outcome of the actions it did not take`,`The environment automatically becomes fully observable`,`The return is always infinite`], 1,
  `课件指出现实中智能体「只经历一条轨迹」（人生只有一次）。主要后果是什么？`,
  [`奖励总是恰好延迟一步`,`智能体永远观察不到「没有选的动作」会导致什么结果（反事实）`,`环境会自动变成完全可观测`,`回报总是无穷大`],
  `L2 p26 用 censored data / counterfactual regret 说明：选定 HKUST 之后，就永远不知道「如果去了腾讯会怎样」。未被选择的动作分支不会出现在数据里，因此<b>反事实结果不可观测</b>。这正是探索必须主动设计的根本原因，也与 L7 中 MC control 需要 exploring starts 或 ε-greedy 相呼应（否则某个动作永远不被尝试，贪心策略可能永远不是最优）。<br>A 错：延迟长度没有「恰好一步」的限制。C、D 与题意无关。`,
  `一条轨迹 + 反事实不可观测 → 必须显式探索（ε-greedy / GLIE / Noisy Nets）。`);

/* ==================================================================== */
/* CHAPTER 2 — Formulation (L3)                                           */
/* ==================================================================== */
CH(2, 'L3 Formulation');

S(`Which expression correctly defines the history H_t in the lectures?`,
  [`$H_t = O_1, A_1, R_1, \\cdots , O_t, A_t, R_t$`,`$H_t = O_1, R_1, A_1, \\cdots , A_{t-1}, O_t, R_t$`,`H_t = S_t and nothing else`,`H_t = R_1, R_2, …, R_t only`], 1,
  `课件中历史 H<sub>t</sub> 的正确定义是？`,
  [`$H_{t} = O_{1}, A_{1}, R_{1}, \\cdots , O_{t}, A_{t}, R_{t}$`,`$H_{t} = O_{1}, R_{1}, A_{1}, \\cdots , A_{t-1}, O_{t}, R_{t}$`,`H<sub>t</sub> = S<sub>t</sub>，仅此而已`,`$H_{t} = R_{1}, R_{2}, \\cdots , R_{t}$`],
  `L3 p8：历史是<b>观测、动作、奖励</b>的序列，即直到 t 时刻为止发生的全部事情：$$H_{t} = O_{1}, R_{1}, A_{1}, \\cdots, A_{t-1}, O_{t}, R_{t}$$。注意 t 时刻的<b>动作 A<sub>t</sub> 还没选</b>，因此不含 A<sub>t</sub>；A 选项把 A<sub>t</sub> 写进去了，是常见陷阱。<br>课件强调「what happens next depends much on the history」，但完整历史太大且不便于计算，所以才定义状态 S<sub>t</sub> = f(H<sub>t</sub>) 作为压缩后的充分统计量。`,
  `历史含 O/A/R，止于 O<sub>t</sub>, R<sub>t</sub>；状态 S<sub>t</sub>=f(H<sub>t</sub>) 是它的压缩。`);

S(`Formally, how is a state defined in the lectures?`,
  [`The private random seed of the environment`,`A function of the history: S_t = f(H_t)`,`Always identical to the raw observation O_t`,`The cumulative reward obtained so far`], 1,
  `课件中，状态（state）在形式上如何定义？`,
  [`环境的私有随机种子`,`历史的函数：S<sub>t</sub> = f(H<sub>t</sub>)`,`永远等于原始观测 O<sub>t</sub>`,`到目前为止累积的奖励总和`],
  `L3 p9：state 是「用来决定下一步发生什么的信息」，形式上 $S_{t} = f(H_{t})$。它把整个历史压缩成做决策所需的表示。<br>课件进一步区分：<b>环境状态 S<sup>e</sup><sub>t</sub></b>（环境私有的表示，用于产生下一观测 / 奖励，通常不可见）、<b>智能体状态 S<sup>a</sup><sub>t</sub></b>（算法内部用来选动作的表示，可以是历史的任意函数）、<b>信息状态 / 马尔可夫状态</b>。C 只在完全可观测的 MDP 下成立；D 不是状态，只是回报的一部分。`,
  `状态 ≠ 观测；S<sub>t</sub>=f(H<sub>t</sub>)，选什么 f 是建模决定。`);

S(`Which equation defines a Markov (information) state?`,
  [`$P(S_{t+1} | S_t) = P(S_{t+1} | S_1, \\cdots , S_t)$`,`$P(S_{t+1} | S_t) = P(S_t | S_{t+1})$`,`$P(S_{t+1} | S_t) = γ P(S_t)$`,`$P(S_{t+1} | S_1, \\cdots , S_t) = 0$`], 0,
  `哪个等式定义了马尔可夫（信息）状态？`,
  [`$P(S_{t+1} | S_{t}) = P(S_{t+1} | S_{1}, \\cdots , S_{t})$`,`$P(S_{t+1} | S_{t}) = P(S_{t} | S_{t+1})$`,`$P(S_{t+1} | S_{t}) = γ P(S_{t})$`,`$P(S_{t+1} | S_{1}, \\cdots , S_{t}) = 0$`],
  `L3 p12–p13 / L4 p9：状态是马尔可夫的，当且仅当<b>给定现在，未来与过去独立</b>：$$P(S_{t+1} | S_{t}) = P(S_{t+1} | S_{1}, \\cdots, S_{t})$$。此时历史对预测未来是冗余的，状态是<b>未来的充分统计量</b>（H<sub>1:t</sub> → S<sub>t</sub> → H<sub>t+1:∞</sub>）。<br>关键认识：马尔可夫性是<b>状态表示的性质</b>，不是世界本身的性质。单帧 Atari 画面看不出球的运动方向，因而不满足；堆叠 4 帧才近似马尔可夫——这就是 DQN 输入 84×84×4 的原因。`,
  `「未来独立于过去，给定现在」；马尔可夫性属于状态表示。`);

S(`In a fully observable MDP, which equality holds according to the lectures?`,
  [`S^a_t is a strict subset of S^e_t but never equal`,`$O_t = S^a_t = S^e_t$`,`Only the complete history is a Markov state`,`No state in the process is Markov`], 1,
  `按课件，在完全可观测的 MDP 中下列哪个等式成立？`,
  [`S<sup>a</sup><sub>t</sub> 是 S<sup>e</sup><sub>t</sub> 的真子集，永不相等`,`$O_{t} = S^{a}_{t} = S^{e}_{t}$`,`只有完整历史才是马尔可夫状态`,`过程中不存在马尔可夫状态`],
  `L3 p15：MDP = <b>fully observable environment (no hidden info)</b>，智能体直接观测到环境状态，因此 $O_{t} = S^{a}_{t} = S^{e}_{t}$，三者同时是信息状态。<br>对比 p21 的 POMDP：$S^{a}_{t} \\ne S^{e}_{t}$（甚至 S<sup>a</sup><sub>t</sub> ⊂ S<sup>e</sup><sub>t</sub>）。p16 还给出两个有趣的极端：环境状态 S<sup>e</sup><sub>t</sub> 是马尔可夫的但<b>看不见</b>所以没用；完整历史 H<sub>t</sub> 是马尔可夫的但<b>太大</b>难以处理——因此实践中要仔细选状态表示（AlphaGo 用最近 8 手）。`,
  `MDP 三者相等；POMDP 中智能体状态只是环境状态的部分信息。`);

S(`Which of the following is used in the lectures as an example of a partially observable environment (POMDP)?`,
  [`A maze in which the agent always sees its exact coordinates`,`Blackjack, where the dealer's face-down card is hidden`,`A gridworld with fully known deterministic transitions`,`A bandit problem with a single state`], 1,
  `课件用下列哪个例子说明部分可观测环境（POMDP）？`,
  [`智能体始终能看到自己精确坐标的迷宫`,`21 点：庄家有一张暗牌不展示`,`转移完全已知且确定性的网格世界`,`只有一个状态的老虎机问题`],
  `L3 p21–p26 的 POMDP 例子：<b>Blackjack</b>（庄家暗牌不可见）、<b>麻将</b>（只看得到公开牌）、<b>没有 GPS 且街道长得一样的城市</b>、<b>看起来都一样的树林</b>、<b>股票预测</b>（内部管理、政治等不可见信息）。共同点是观测只包含环境状态的一部分。其余三个例子都是完全可观测：迷宫位置已知、网格转移已知、bandit 单状态。<br>注意：即使环境状态 S<sup>e</sup><sub>t</sub> 本身是马尔可夫的，智能体<b>看不到</b>它，所以必须自己构造状态表示（p27）。`,
  `POMDP 判据：观测无法唯一确定环境状态。`);

M(`According to the lectures, which are legitimate ways to construct the agent state in a POMDP?`,
  [`Use the complete history: S^a_t = H_t`,`Use a belief state: a probability vector over possible environment states`,`Use a recurrent network: S^a_t = σ(S^a_{t-1} W_s + O_t W_o)`,`Assume the observation is always exactly equal to the environment state`], [0,1,2],
  `按课件，在 POMDP 中构造智能体状态的正当方式有哪些？`,
  [`使用完整历史：S<sup>a</sup><sub>t</sub> = H<sub>t</sub>`,`使用信念状态：对环境状态的概率分布向量`,`使用循环网络：S<sup>a</sup><sub>t</sub> = σ(S<sup>a</sup><sub>t−1</sub>W<sub>s</sub> + O<sub>t</sub>W<sub>o</sub>)`,`直接假设观测永远恰好等于环境状态`],
  `L3 p27 明确列出三种构造：<br>① <b>Complete history</b> S<sup>a</sup><sub>t</sub> = H<sub>t</sub>（严格 Markov，但维度随时间增长）；<br>② <b>Beliefs of environment state</b> S<sup>a</sup><sub>t</sub> = (P[S<sup>e</sup><sub>t</sub>=s<sub>1</sub>], …, P[S<sup>e</sup><sub>t</sub>=s<sub>n</sub>])，把不确定性显式表示为后验分布；<br>③ <b>RNN</b> S<sup>a</sup><sub>t</sub> = σ(S<sup>a</sup><sub>t−1</sub>W<sub>s</sub> + O<sub>t</sub>W<sub>o</sub>)，用隐状态递归地压缩历史。<br>D 恰恰否定了 POMDP 的前提（部分可观测），若观测等于环境状态就是 MDP 了。`,
  `POMDP 三种状态构造：完整历史 / 信念状态 / RNN 隐状态。`);

S(`The dynamics function p(s', r | s, a) is defined in the lectures as`,
  [`P[S_t = s, A_t = a | S_{t+1} = s', R_{t+1} = r]`,`P[S_{t+1} = s', R_{t+1} = r | S_t = s, A_t = a]`,`$E[R_t | S_t = s]$`,`$P[S_{t+1} = s' | S_t = s]$`], 1,
  `课件中动态函数 p(s′, r | s, a) 的定义是？`,
  [`P[S<sub>t</sub> = s, A<sub>t</sub> = a | S<sub>t+1</sub> = s′, R<sub>t+1</sub> = r]`,`P[S<sub>t+1</sub> = s′, R<sub>t+1</sub> = r | S<sub>t</sub> = s, A<sub>t</sub> = a]`,`$E[R_{t} | S_{t} = s]$`,`$P[S_{t+1} = s' | S_{t} = s]$`],
  `L3 p30：$$p(s', r | s, a) := P[S_{t+1} = s', R_{t+1} = r | S_{t} = s, A_{t} = a]$$。它是 MDP 的完整动态，同时给出<b>下一状态</b>与<b>下一奖励</b>的联合分布，且条件是当前的 (s,a)。<br>常见错误：把下标写成 t 或 t−1（奖励是 R<sub>t+1</sub>，因为动作在 t 时刻执行后环境在 t+1 回应）；把条件与结论颠倒（A）；D 只是边缘分布 p(s′|s,a)，丢掉了奖励信息。p31 还给出四个常用派生量：p(s′|s,a)、p(r|s,a)、r(s,a)、r(s,a,s′)。`,
  `记住下标：动作 A<sub>t</sub> → 环境回应 O<sub>t+1</sub>/S<sub>t+1</sub> 与 R<sub>t+1</sub>。`);

S(`The quantity r(s, a) is defined as`,
  [`$E[R_{t+1} | S_t = s, A_t = a]$`,`$\\sum _{s'} p(s' | s, a) \\cdot v(s')$`,`The realised return G_t of the episode`,`The policy probability π(a|s)`], 0,
  `量 r(s, a) 的定义是？`,
  [`$E[R_{t+1} | S_{t} = s, A_{t} = a]$`,`$\\sum _{s'} p(s' | s, a) \\cdot v(s')$`,`该幕实际实现的回报 G<sub>t</sub>`,`策略概率 π(a|s)`],
  `L3 p31：$r(s,a) := E[R_{t+1} | S_{t}=s, A_{t}=a]$，是<b>即时奖励的条件期望</b>；另有 $r(s,a,s') := E[R_{t+1} | S_{t}=s, A_{t}=a, S_{t+1}=s']$。<br>区分：B 是「折扣后继价值」的加权和（贝尔曼方程的后半部分，少乘了 γ、也少了即时奖励）；C 是随机变量 G<sub>t</sub> 的一次实现（MC 的目标）；D 是策略。奖励函数定义在 (s,a) 上，价值函数定义在状态 / 状态动作上，二者不要混淆。`,
  `r(s,a) 是即时奖励期望；G<sub>t</sub> 是累积折扣回报的实现值。`);

S(`Which triple lists the three major components of an RL agent in the lectures?`,
  [`Policy, value function, model`,`State, action, reward`,`Actor, critic, replay buffer`,`Loss, gradient, learning rate`], 0,
  `哪一组是课件列出的 RL 智能体三大组成？`,
  [`策略、价值函数、模型`,`状态、动作、奖励`,`演员、评论员、经验回放池`,`损失、梯度、学习率`],
  `L3 p33：<b>Policy</b>（agent's behaviour function）、<b>Value function</b>（how good is each state and/or action，对未来的预测）、<b>Model</b>（agent's representation of the environment，即 P 与 R）。<br>B「状态、动作、奖励」是 p29 定义的<b>数据</b> S<sub>0</sub>, A<sub>0</sub>, R<sub>1</sub>, S<sub>1</sub>, …，不是智能体的组成部分——这是最典型的干扰项。C 中的 actor-critic 是 p41 的<b>智能体分类</b>，replay buffer 是 DQN 的工程组件。D 是优化算法的要素。<br>还要记住 p41 的另一组分类：value-based / policy-based / actor-critic，以及 model-free / model-based。`,
  `三大组件 = policy / value / model；数据三元组 = (S, A, R)。`);

S(`An agent is called model-free when`,
  [`It knows p(s', r|s, a) and can plan ahead`,`The dynamics are unknown and it learns values or a policy directly from interaction`,`It never uses any value function`,`It has no policy at all`], 1,
  `什么情况下称一个智能体是 model-free（免模型）？`,
  [`已知 p(s′, r|s, a)，可以提前规划`,`动态未知，直接从交互中学习价值函数或策略`,`从不使用任何价值函数`,`完全没有策略`],
  `L3 p32：<b>Model-based</b> — dynamics p(s′,r|s,a) is known，可以 plan ahead；<b>Model-free</b> — dynamics is not known，learn directly（从经验中学价值 / 策略，如 MC、TD、SARSA、Q-learning）。<br>注意 C 错得很典型：Q-learning 是 model-free，但它显式学习 Q 表 / Q 网络。D 也错：model-free 只是不学环境模型，策略仍然必须存在（哪怕是从 Q 贪心导出的隐式策略）。L12 会补充：model-based RL 是「先从经验学模型，再用模型规划」，属于两者的结合。`,
  `model-free ≠ 没有价值函数；是「不学 / 不用环境动态 P, R」。`);

S(`Evaluating the expected return of a fixed policy is a ___ problem, whereas finding the best policy is a ___ problem.`,
  [`control; prediction`,`prediction; control`,`planning; prediction`,`approximation; generalisation`], 1,
  `评估一个给定策略的期望回报是 ___ 问题；寻找最优策略是 ___ 问题。`,
  [`控制；预测`,`预测；控制`,`规划；预测`,`近似；泛化`],
  `L3 p45：<b>Prediction</b> = evaluate / estimate / predict the future（expected reward）from following a <b>given</b> policy；<b>Control</b> = find the <b>best</b> policy by optimising the future。p46–p47 用 Gridworld 分别画了两者的结果：预测给出每个状态的价值数字，控制给出最优策略箭头。<br>课程结构与之一一对应：L4 的贝尔曼期望方程 / L5 的策略评估 / L6 的 MC & TD 都是 prediction；L5 的策略迭代、值迭代 / L7 的 SARSA & Q-learning / L11 的策略梯度都是 control。`,
  `prediction = 评估给定 π；control = 找 π*。`);

S(`According to the lectures, planning differs from learning in that`,
  [`It always requires a non-linear function approximator`,`The model of the environment is known and the agent improves its policy by computation without external interaction`,`It never needs a value function`,`It only applies to continuing (non-episodic) tasks`], 1,
  `按课件，规划（planning）与学习（learning）的区别在于`,
  [`它总是需要非线性函数近似器`,`环境模型已知；智能体只用模型做内部计算来改进策略，不与外部环境交互`,`它完全不需要价值函数`,`它只适用于持续性（非幕式）任务`],
  `L3 p42：<b>Reinforcement Learning</b> — environment initially unknown，agent interacts（trial & error），improves policy；<b>Planning</b> — model of environment is known，agent performs computations with its model <b>without any external interaction</b>（也叫 deliberation / reasoning / search）。p43–p44 的 Atari 对照：RL 不知道游戏规则，只能摇杆看像素和分数；Planning 已知规则，可以查询模拟器「若执行 a，下一状态与得分是什么」并向前搜索。<br>动态规划（L5）就是典型的 planning；Dyna（L12）把真实交互与模型规划结合起来。`,
  `learning = 交互试错；planning = 用已知模型内部推演。`);

S(`Which of the following is NOT among the agent categories listed in the lectures?`,
  [`Value-based`,`Policy-based`,`Actor-Critic`,`Reward-based`], 3,
  `下列哪一项不是课件列出的智能体类别？`,
  [`基于价值（value-based）`,`基于策略（policy-based）`,`演员-评论员（actor-critic）`,`基于奖励（reward-based）`],
  `L3 p41 列出两组分类：<b>value-based / policy-based / actor-critic</b>（按学什么、策略是否显式）以及 <b>model-free / model-based</b>（按是否掌握环境动态）。没有「reward-based」这一类——奖励是环境给出的信号，不是智能体学习的对象或分类标准。<br>补充：value-based 显式学价值函数、隐式得到策略（argmax）；policy-based 直接学 π(a|s)；actor-critic 同时学两者。L11 p9–p10 还比较了三者在「随机策略、全局/局部最优、高维动作空间」上的优劣。`,
  `分类维度：学什么（V/π/两者）、是否要模型（model-free / model-based）。`);

/* ==================================================================== */
/* CHAPTER 3 — MP / MRP / MDP & Bellman equations (L4)                   */
/* ==================================================================== */
CH(3, 'L4 MDP(3)');

S(`Which tuple correctly describes a Markov Reward Process (MRP)?`,
  [`⟨S, P⟩`,`⟨S, P, R, γ⟩`,`⟨S, A, P, R, γ⟩`,`⟨S, A, P⟩`], 1,
  `哪个元组正确描述了马尔可夫奖励过程（MRP）？`,
  [`⟨S, P⟩`,`⟨S, P, R, γ⟩`,`⟨S, A, P, R, γ⟩`,`⟨S, A, P⟩`],
  `L4 p2 的三个层次：<br>• <b>Markov Process (MP / Markov Chain)</b>：⟨S, P⟩ —— 有状态、无奖励、无动作（「let nature take its own course」）。<br>• <b>MRP</b>：⟨S, P, <b>R</b>, <b>γ</b>⟩ —— 加上奖励函数与折扣因子，仍无动作。<br>• <b>MDP</b>：⟨S, <b>A</b>, P, R, γ⟩ —— 再加入动作，才是 RL 的标准环境模型。<br>课件用「种西瓜」串起来：MP 只有绿叶/黄叶状态自然演化；MRP 给叶子状态配奖励 [r(green)=1, r(yellow)=−1]；MDP 允许「黄叶时浇水」这一动作。`,
  `MP⟨S,P⟩ → MRP⟨S,P,R,γ⟩ → MDP⟨S,A,P,R,γ⟩。`);

S(`For a finite Markov chain with state transition matrix P, which property must hold?`,
  [`Every column of P sums to 1`,`Every row of P sums to 1`,`Entries of P may be negative as long as they sum to 1`,`P must be symmetric`], 1,
  `对有限马尔可夫链的状态转移矩阵 P，下列哪条性质必须成立？`,
  [`P 的每一列之和为 1`,`P 的每一行之和为 1`,`只要总和为 1，P 的元素可以为负`,`P 必须是对称矩阵`],
  `L4 p10 的矩阵定义：$P_{ss'} = p(s'|s) = P[S_{t+1}=s' | S_{t}=s]$。<b>第 s 行</b>是「从状态 s 出发」到所有后继状态的概率分布，因此每行元素非负且和为 1（随机矩阵 / stochastic matrix）。<br>列和没有这个约束（除非是双随机矩阵），因为不同前驱状态转移到同一个 s′ 的概率之和没有归一化要求；P 也一般不对称：例如「上课 → 睡觉」可能概率很高，「睡觉 → 上课」却为 0。C 违反概率非负性。`,
  `行随机：Σ<sub>s′</sub> P<sub>ss′</sub> = 1；列和不必为 1。`);

N(`A trajectory terminates at time T = t+3. The observed rewards are R_{t+1} = 2, R_{t+2} = 4, R_{t+3} = 6, and the discount factor is γ = 0.5. Compute the discounted return G_t. (Enter a number.)`,
  5.5,
  `一幕在 T = t+3 时刻终止。观测到的奖励为 R<sub>t+1</sub> = 2、R<sub>t+2</sub> = 4、R<sub>t+3</sub> = 6，折扣因子 γ = 0.5。计算折扣回报 G<sub>t</sub>。（输入数值）`,
  `回报的定义（L4 p18）：$$G_{t} = R_{t+1} + γR_{t+2} + γ^2R_{t+3} + \\cdots = \\sum_{k=0}^{\\infty} γ^{k} R_{t+k+1}$$。本题只到终止：G<sub>t</sub> = 2 + 0.5×4 + 0.5²×6 = 2 + 2 + 1.5 = <b>5.5</b>。<br><b>易错点</b>：① 第一项权重是 γ⁰ = 1，不是 γ；② 第 k+1 个奖励权重是 γ<sup>k</sup>；③ 幕终止后不再有奖励，V(S<sub>T</sub>) = 0。若不折扣（γ=1）则 G<sub>t</sub> = 12，可见折扣显著压低了远期奖励。`,
  `G<sub>t</sub> = Σ γ<sup>k</sup>R<sub>t+k+1</sub>；第 1 项不打折。`, undefined, 0.005);

N(`In the Student MRP with γ = 1, state C3 has immediate reward R(C3) = -2. From C3 the process moves to Pass with probability 0.6 (v(Pass) = 10) and to Pub with probability 0.4 (v(Pub) = 0.8). Use the Bellman equation for MRPs to compute v(C3). (Enter a number; 4.3 is also accepted.)`,
  4.32,
  `在 γ = 1 的 Student MRP 中，状态 C3 的即时奖励 R(C3) = −2；从 C3 以 0.6 的概率到 Pass（v(Pass) = 10），以 0.4 的概率到 Pub（v(Pub) = 0.8）。用 MRP 的贝尔曼方程计算 v(C3)。（输入数值；填 4.3 也算对）`,
  `MRP 的贝尔曼方程（L4 p28–p29）：$$v(s) = R_{s} + γ \\sum_{s'\\in S} P_{ss'} v(s')$$，即「即时奖励 + 折扣的后继状态价值期望」。<br>代入：v(C3) = −2 + 1 × [0.6×10 + 0.4×0.8] = −2 + (6 + 0.32) = <b>4.32</b>。<br>课件 p32 写成 $4.3 = -2 + 0.6\\times10 + 0.4\\times0.8$，是把 v(Pub) ≈ 0.8 及结果做了四舍五入，因此 4.3 同样接受。<br><b>理解要点</b>：虽然 C3 的即时奖励是 −2（上课很苦），但因为高概率通向 v=10 的 Pass，长期价值仍是正的——这正是价值函数与即时奖励的区别。`,
  `v(s) = R<sub>s</sub> + γΣP<sub>ss′</sub>v(s′)；即时奖励 ≠ 长期价值。`, undefined, 0.02);

N(`For an MRP with γ = 0.9, the expected immediate reward at state s is R_s = 1. From s the process moves to s1 with probability 0.5 (v(s1) = 2) and to s2 with probability 0.5 (v(s2) = 4). Compute v(s) from the Bellman equation. (Enter a number.)`,
  3.7,
  `某 MRP 的 γ = 0.9，状态 s 的期望即时奖励 R<sub>s</sub> = 1；从 s 以 0.5 概率到 s1（v(s1) = 2），以 0.5 概率到 s2（v(s2) = 4）。由贝尔曼方程计算 v(s)。（输入数值）`,
  `先算后继价值的期望：Σ<sub>s′</sub> P<sub>ss′</sub> v(s′) = 0.5×2 + 0.5×4 = 1 + 2 = 3。<br>再乘折扣并加即时奖励：v(s) = 1 + 0.9×3 = 1 + 2.7 = <b>3.7</b>。<br><b>易错点</b>：γ 只作用在<b>后继价值</b>上，不要连即时奖励一起打折（写成 0.9×(1+3) = 3.6 是错的）；也不要忘记按转移概率加权（写成 1+0.9×6 = 6.4 也是错的）。`,
  `折扣只作用于未来项：v = R + γ E[v(S′)]。`, undefined, 0.005);

S(`Which of the following is NOT a reason given in the lectures for discounting future rewards?`,
  [`It avoids infinite returns in cyclic Markov processes`,`It reflects uncertainty about the distant future`,`It makes the sequence of rewards independent and identically distributed`,`Financial rewards in the future should be discounted`], 2,
  `下列哪一项不是课件给出的「为何要折扣」的理由？`,
  [`避免循环马尔可夫过程中出现无穷回报`,`反映对遥远未来的不确定性`,`使奖励序列变成独立同分布（i.i.d.）`,`未来的金钱收益理应折现`],
  `L4 p20 列出五条理由：① 数学上方便；② 避免循环 MP 中的无穷回报；③ 未来不确定性未必被完整建模；④ 金融收益应折现；⑤ 动物 / 人类行为显示偏好即时奖励。并补充：若所有序列都终止（episodic），可以取 γ = 1。<br>C 不是理由：折扣只是给远期奖励乘 γ<sup>k</sup> 的确定性权重，<b>不改变样本之间的相关性或分布</b>；RL 数据依旧是序列化、非 i.i.d. 的。γ→0 是「myopic（短视）」，γ→1 是「far-sighted（远视）」（p19）。`,
  `折扣理由中不含「让数据 i.i.d.」；γ=1 只在全序列终止时可用。`);

S(`A discount factor γ close to 0 gives a ___ evaluation, while γ close to 1 gives a ___ evaluation.`,
  [`far-sighted; myopic`,`myopic; far-sighted`,`unbiased; biased`,`optimal; greedy`], 1,
  `折扣因子 γ 接近 0 时是 ___ 评估，接近 1 时是 ___ 评估。`,
  [`远视；短视`,`短视；远视`,`无偏；有偏`,`最优；贪心`],
  `L4 p19：收到 k+1 步之后的奖励 R，其现值是 γ<sup>k</sup>R。<b>γ→0</b>：远期奖励几乎被全部抹掉，只关心眼前，称 <b>myopic（短视）</b>；<b>γ→1</b>：远期奖励几乎不衰减，称 <b>far-sighted（远视）</b>。<br>课件 p26–p27 的 Student MRP 图直观展示了差别：远视时「前期多努力、很快变好」。C 把折扣与 MC/TD 的偏差-方差权衡混为一谈，D 与折扣无关。`,
  `γ 小 = myopic；γ 大 = far-sighted。`);

S(`Which statement about MDPs is correct according to the lectures?`,
  [`A POMDP can never be converted into an MDP`,`A bandit is an MDP with a single state, and a partially observable problem can be cast as an MDP whose state is the history`,`Optimal control deals only with finite discrete MDPs`,`Almost no RL problem can be formalised as an MDP`], 1,
  `按课件，关于 MDP 的哪个说法是正确的？`,
  [`POMDP 永远无法转化为 MDP`,`老虎机是只有一个状态的 MDP；部分可观测问题可以把「历史」当作状态从而转成 MDP`,`最优控制只处理有限离散 MDP`,`几乎没有 RL 问题能被形式化为 MDP`],
  `L4 p7 标题即「Almost all RL problems can be formalised as MDP's」，并给出三条：① <b>Optimal control primarily deals with continuous MDPs</b>（所以 C 反了）；② <b>Partially observable problems can be converted into MDPs (= MDP where state is history)</b>；③ <b>Bandits are MDPs with one state</b>。<br>把状态取为完整历史 H<sub>t</sub> 时，马尔可夫性自动成立（L3 p16 也提过），代价是状态空间爆炸——这就是 POMDP 要用 belief state / RNN 近似的原因。课件 p5 同时强调 MDP 描述的是<b>完全可观测</b>环境：当前状态完全刻画过程。`,
  `「几乎所有 RL 问题都是 MDP」；POMDP → 状态=历史的 MDP；bandit = 单状态 MDP。`);

S(`Which equation correctly relates the state-value and action-value functions for a given policy π?`,
  [`$v_π(s) = \\max _a q_π(s,a)$`,`$v_π(s) = \\sum _a π(a|s) q_π(s,a)$`,`$q_π(s,a) = \\sum _a π(a|s) v_π(s)$`,`$v_π(s) = γ \\sum _a q_π(s,a)$`], 1,
  `对给定策略 π，哪个等式正确联系状态价值与动作价值？`,
  [`$v_{π}(s) = \\max _{a} q_{π}(s,a)$`,`$v_{π}(s) = \\sum _{a} π(a|s) q_{π}(s,a)$`,`$q_{π}(s,a) = \\sum _{a} π(a|s) v_{π}(s)$`,`$v_{π}(s) = γ \\sum _{a} q_{π}(s,a)$`],
  `L4 p48–p49 的推导：$$v_{π}(s) = \\sum_{a\\in A} π(a|s) q_{π}(s,a)$$，因为 v<sub>π</sub>(s) = E<sub>π</sub>[G<sub>t</sub>|S<sub>t</sub>=s] = Σ<sub>a</sub> π(a|s) E<sub>π</sub>[G<sub>t</sub>|S<sub>t</sub>=s, A<sub>t</sub>=a]。状态价值是动作价值在策略分布下的<b>期望</b>。<br>A 是<b>最优</b>价值函数的关系 $v*(s) = \\max_{a} q*(s,a)$，对一般的 π 不成立（除非 π 恰好是贪心策略）。反向关系是 $q_{π}(s,a) = r(s,a) + γ\\sum_{s'}p(s'|s,a)v_{π}(s')$（p50–p52）。`,
  `v 是 q 的策略加权平均；只有最优情形才取 max。`);

N(`At state s, a policy chooses action a1 with probability 0.5 (q_π(s,a1) = 2) and action a2 with probability 0.5 (q_π(s,a2) = 6). Compute v_π(s). (Enter a number.)`,
  4,
  `在状态 s，策略以 0.5 概率选 a1（q<sub>π</sub>(s,a1) = 2），以 0.5 概率选 a2（q<sub>π</sub>(s,a2) = 6）。计算 v<sub>π</sub>(s)。（输入数值）`,
  `用 v<sub>π</sub>(s) = Σ<sub>a</sub> π(a|s) q<sub>π</sub>(s,a)：<br>v<sub>π</sub>(s) = 0.5×2 + 0.5×6 = 1 + 3 = <b>4</b>。<br><b>注意</b>：这里求的是「遵循当前策略」的价值，所以是<b>加权平均</b> 4，而不是 max = 6。如果策略改成确定性贪心（只选 a2），v<sub>π′</sub>(s) = 6 ≥ 4，这正是策略改进定理的一个实例：贪心化不会让价值变差（L5 p21）。`,
  `v=Σπq（平均）；贪心化后才取 max，且价值不降。`, undefined, 0.005);

N(`For an MDP with γ = 0.9, the expected immediate reward after taking action a in state s is r(s,a) = 1. The transition leads to s1 with probability 0.5 (v_π(s1) = 10) and to s2 with probability 0.5 (v_π(s2) = 0). Compute q_π(s,a). (Enter a number.)`,
  5.5,
  `某 MDP 的 γ = 0.9，在状态 s 执行动作 a 后的期望即时奖励 r(s,a) = 1；以 0.5 概率转移到 s1（v<sub>π</sub>(s1) = 10），以 0.5 概率转移到 s2（v<sub>π</sub>(s2) = 0）。计算 q<sub>π</sub>(s,a)。（输入数值）`,
  `贝尔曼期望方程（L4 p50–p52）：$$q_{π}(s,a) = r(s,a) + γ \\sum_{s'} p(s'|s,a) v_{π}(s')$$。<br>后继价值期望 = 0.5×10 + 0.5×0 = 5。<br>q<sub>π</sub>(s,a) = 1 + 0.9×5 = 1 + 4.5 = <b>5.5</b>。<br><b>要点</b>：q 是「先执行指定的 a，之后按 π 行动」的期望回报，因此第一项用 r(s,a)（不含策略加权），第二项才是 π 下的状态价值 v<sub>π</sub>。若再求 v<sub>π</sub>(s)，还要对所有 a 按 π(a|s) 加权。`,
  `q = r(s,a) + γ Σ p(s′|s,a) v<sub>π</sub>(s′)。`, undefined, 0.005);

S(`Why is the Bellman optimality equation harder to solve directly than the Bellman expectation equation?`,
  [`It has more states than the original MDP`,`The max operator makes the system non-linear, so it cannot be solved as a plain linear system`,`It always requires γ = 1`,`It does not have a unique solution even for γ &lt; 1`], 1,
  `为什么贝尔曼最优方程比贝尔曼期望方程更难直接求解？`,
  [`它的状态数比原 MDP 更多`,`max 算子使方程组非线性，无法当作普通线性方程组直接求解`,`它总是要求 γ = 1`,`即使 γ &lt; 1 它也没有唯一解`],
  `固定策略时贝尔曼期望方程是<b>线性</b>方程组：$v_{π} = R^{π} + γP^{π}v_{π}$，可直接解 $v_{π} = (I - γP^{π})^{-1}R^{π}$。而最优方程 $v*(s) = \\max_{a} [r(s,a) + γ\\sum_{s'}p(s'|s,a)v*(s')]$ 在未知量外面套了 <b>max</b>，成为<b>非线性</b>方程，没有闭式解，只能用值迭代 / 策略迭代等迭代法（L4 p69、L5）。<br>D 错：γ&lt;1 时贝尔曼最优备份是 γ-压缩映射，压缩映射定理保证唯一不动点 v*（L5 p66–p69）。C 错：收敛证明恰恰需要 γ&lt;1。`,
  `max → 非线性 → 迭代求解；γ&lt;1 压缩 → 唯一解。`);

N(`Two actions are available at state s with γ = 0.9. Action a1 gives immediate reward 1 and moves to a state with value 5; action a2 gives immediate reward 2 and moves to a state with value 3. Compute one Bellman optimality backup for v*(s). (Enter a number.)`,
  5.5,
  `状态 s 有两个动作，γ = 0.9。a1 的即时奖励为 1、后继状态价值为 5；a2 的即时奖励为 2、后继状态价值为 3。计算一次贝尔曼最优备份得到的 v*(s)。（输入数值）`,
  `逐动作计算备份值：<br>• a1：1 + 0.9×5 = 1 + 4.5 = 5.5<br>• a2：2 + 0.9×3 = 2 + 2.7 = 4.7<br>取最大：v*(s) = max(5.5, 4.7) = <b>5.5</b>，对应最优动作 a1。<br><b>概念点</b>：a2 的即时奖励更高（2 &gt; 1），但长期价值更低，说明<b>贪心地看即时奖励会选错动作</b>；贝尔曼最优备份同时考虑即时奖励与折扣后的未来价值。这正是值迭代的每一步（L5 p48–p52）。`,
  `v*(s)=max<sub>a</sub>[r + γv(s′)]；别被更大的即时奖励骗了。`, undefined, 0.005);

M(`Which statements about Markov reward processes and their Bellman equation are correct?`,
  [`v(s) = E[G_t | S_t = s] is the expected discounted return starting from s`,`The Bellman equation for an MRP is v(s) = R_s + γ Σ_{s'} P_{ss'} v(s')`,`The return satisfies the recursion G_t = R_{t+1} + γ G_{t+1}`,`Directly solving the Bellman equation costs O(N), so it scales easily to millions of states`], [0,1,2],
  `关于马尔可夫奖励过程及其贝尔曼方程，哪些说法正确？`,
  [`v(s) = E[G<sub>t</sub> | S<sub>t</sub> = s] 是从 s 出发的期望折扣回报`,`MRP 的贝尔曼方程为 v(s) = R<sub>s</sub> + γ Σ<sub>s′</sub> P<sub>ss′</sub> v(s′)`,`回报满足递归 G<sub>t</sub> = R<sub>t+1</sub> + γ G<sub>t+1</sub>`,`直接求解贝尔曼方程的复杂度是 O(N)，因此可轻松扩展到百万状态`],
  `前三条分别对应 L4 p21、p29、p28：<br>① 价值函数定义 v(s) := E[G<sub>t</sub>|S<sub>t</sub>=s]，是「长期价值」；<br>② 对 G<sub>t</sub> = R<sub>t+1</sub> + γG<sub>t+1</sub> 取条件期望，用全期望公式与马尔可夫性得到 v(s) = R<sub>s</sub> + γΣ<sub>s′</sub>P<sub>ss′</sub>v(s′)；<br>③ 回报的递归展开是推导的起点。<br>④ 错：p35 明确写 <b>O(N³)</b>，N=1000 时约 10⁹ 次运算，只对小 MRP 可行，所以 p36 才转向 DP、MC 评估、TD 学习等迭代方法。`,
  `MRP 三件套：v=E[G]、G=R+γG′、v=R+γPv；直接解 O(N³) 不可扩展。`);

S(`The lectures note that directly solving the Bellman equation for an MRP with N states costs O(N^3). For N = 1000 this is about how many operations?`,
  [`$10^3$`,`$10^6$`,`$10^9$`,`$10^12$`], 2,
  `课件指出，直接求解 N 个状态的 MRP 贝尔曼方程复杂度为 O(N³)。N = 1000 时约为多少次运算？`,
  [`10³`,`10⁶`,`10⁹`,`10¹²`],
  `N³ = 1000³ = (10³)³ = <b>10⁹</b>（十亿次量级）。课件 L4 p35 正是用这个数字说明「Only possible for small MRPs」，紧接着 p36 给出替代方案：动态规划、蒙特卡洛评估、时序差分学习——它们用<b>迭代</b>逼近 v(s)，避免矩阵求逆的立方代价。<br>后续课程结构由此展开：L5 = DP（已知模型）、L6 = MC & TD（免模型预测）、L8 = 函数近似（解决状态空间大的问题）。`,
  `直接解 O(N³) → 小问题才行；大 MDP 用 DP/MC/TD 迭代 + 函数近似。`);

/* ==================================================================== */
/* CHAPTER 4 — Dynamic Programming (L5)                                   */
/* ==================================================================== */
CH(4, 'L5 DP(3)');

S(`What is the essential prerequisite for applying dynamic programming to an RL problem?`,
  [`A neural-network value approximator`,`A complete model of the MDP: ⟨S, A, P, R, γ⟩ is known`,`Episodes must be finite and rewards binary`,`The policy must be stochastic`], 1,
  `把动态规划用于 RL 问题的必要前提是什么？`,
  [`必须有神经网络价值近似器`,`MDP 的完整模型 ⟨S, A, P, R, γ⟩ 已知`,`幕必须有限且奖励是二值的`,`策略必须是随机的`],
  `L5 p4：DP 的定义就是「<b>use value function v<sub>π</sub>(s) to search for a good policy</b>」并且「<b>Full knowledge of the MDP, used for planning</b>」。因为迭代策略评估与策略改进都要计算 $\\sum_{a}π(a|s)\\sum_{s',r}p(s',r|s,a)[r+γv(s')]$，必须知道 p(s′,r|s,a) 才能求期望。<br>因此 DP 属于 <b>planning</b> 而非 learning：环境未知时只能用 MC / TD（L6、L7）。B 选项的函数近似是 L8 处理大状态空间的工具，不是 DP 的前提；C、D 都不是要求（DP 也用于持续性任务，常用 γ&lt;1）。`,
  `DP = 已知模型的 planning；模型未知 → MC / TD。`);

S(`Which update rule defines iterative policy evaluation in the lectures?`,
  [`$v_{k+1}(s) = \\max _a [r(s,a) + γ \\sum _{s'} p(s'|s,a) v_k(s')]$`,`$v_{k+1} = R^π + γ P^π v_k$`,`$v_{k+1} = v_k + α (G_t - v_k)$`,`$v_{k+1} = R^π - γ P^π v_k$`], 1,
  `课件中迭代策略评估（iterative policy evaluation）的更新式是？`,
  [`$v_{k+1}(s) = \\max _{a}[r(s,a) + γ \\sum _{s'} p(s'|s,a) v_{k}(s')]$`,`$v_{k+1} = R^{π} + γ P^{π} v_{k}$`,`$v_{k+1} = v_{k} + α(G_{t} - v_{k})$`,`$v_{k+1} = R^{π} - γ P^{π} v_{k}$`],
  `L5 p12：把贝尔曼期望方程改成<b>迭代</b>形式 $$v_{k+1}(s) = \\sum_{a}π(a|s)\\sum_{s',r}p(s',r|s,a)[r + γv_{k}(s')]$$，即 $v_{k+1} = R^{π} + γP^{π}v_{k}$。它是<b>同步</b>备份：用完整的旧向量 v<sub>k</sub> 计算新向量 v<sub>k+1</sub>。<br>A 是<b>值迭代</b>（含 max，做贪心改进）；C 是<b>蒙特卡洛 / TD 的增量更新</b>（用采样目标，不需要模型）；D 符号错误，会发散。<br>γ&lt;1 时该备份是 γ-压缩映射，从任意 v<sub>0</sub> 出发都收敛到唯一 v<sub>π</sub>。`,
  `策略评估 = 固定 π 的贝尔曼期望备份；值迭代才带 max。`);

N(`In the small Gridworld example (γ = 1, uniform random policy over 4 actions, reward -1 per step), v_1(s) = -1 for every non-terminal state. From state 1, one action leads to a terminal state (v = 0) and the other three lead to states with v = -1. Compute v_2(1). (Enter a number.)`,
  -1.75,
  `小 Gridworld 例子（γ = 1，4 个动作的均匀随机策略，每步奖励 −1），所有非终止状态都有 v<sub>1</sub>(s) = −1。从状态 1 出发，一个动作到达终止状态（v = 0），另外三个动作到达 v = −1 的状态。计算 v<sub>2</sub>(1)。（输入数值）`,
  `课件 L5 p16–p18 的原始算式：$$v_{2}(1) = -1 + (1/4)(0 - 1 - 1 - 1) = -7/4 = -1.75$$。<br>逐步看：① 均匀随机策略给每个动作权重 1/4；② 四个后继价值是 0, −1, −1, −1，加权和 = −3/4；③ γ=1 不打折；④ 加上每步的即时奖励 −1，得 −1 − 0.75 = <b>−1.75</b>。<br><b>为什么比 −1 更负</b>：第二轮换手时，算法已经「看到」继续走下去还要继续扣分，价值沿时间反向传播，越靠近起点越负；到收敛时 v<sub>π</sub>(s) 近似等于「到终点的期望步数的负值」。`,
  `Gridworld：v<sub>k+1</sub>(s) = −1 + (1/4)Σ v<sub>k</sub>(s′)。`, undefined, 0.005);

N(`In the same Gridworld iteration, from state 2 all four successor states have v_1 = -1. Compute v_2(2). (Enter a number.)`,
  -2,
  `同一 Gridworld 迭代中，从状态 2 出发的四个后继状态都有 v<sub>1</sub> = −1。计算 v<sub>2</sub>(2)。（输入数值）`,
  `v<sub>2</sub>(2) = −1 + (1/4)(−1 −1 −1 −1) = −1 − 1 = <b>−2</b>（课件 L5 p18 直接给出）。<br>与状态 1 的 −1.75 对比：状态 1 紧邻终点，有一个动作可以一步脱离，因此价值更高（更不负）；状态 2 四个方向都还在格子内，还要继续扣分。<br><b>推广</b>：课件 p18 还给出 v<sub>2</sub>(14) = −1 + (1/4)(−1−1−1+0) = −1.75，与状态 1 对称。这类「给定 v<sub>k</sub> 求 v<sub>k+1</sub>」是动态规划部分最典型的计算题。`,
  `所有后继都为 −1 → 加权和 −1 → v = −1 + (−1) = −2。`, undefined, 0.005);

S(`The policy improvement theorem states that if q_π(s, π'(s)) ≥ v_π(s) for all states s, then`,
  [`v_{π'}(s) ≥ v_π(s) for all s`,`π' must be a stochastic policy`,`γ must equal 0`,`v_π was already the optimal value function`], 0,
  `策略改进定理说：若对所有状态 s 都有 q<sub>π</sub>(s, π′(s)) ≥ v<sub>π</sub>(s)，则`,
  [`对所有 s 都有 v<sub>π′</sub>(s) ≥ v<sub>π</sub>(s)`,`π′ 必须是随机策略`,`γ 必须等于 0`,`v<sub>π</sub> 已经是最优价值函数`],
  `L5 p2 与 p21：策略改进定理保证「<b>在 s 处改选一个 q 值不低于 v<sub>π</sub>(s) 的动作、之后继续遵循 π</b>」得到的新策略不比原策略差，即 v<sub>π′</sub> ≥ v<sub>π</sub>。推导用 q<sub>π</sub>(s,π′(s)) ≥ v<sub>π</sub>(s) 反复展开自举不等式，把 v<sub>π</sub>(s) 一路推到 v<sub>π′</sub>(s)（L5 p19–p20）。<br>特别地，取 <b>贪心策略</b> π′(s) = argmax<sub>a</sub> q<sub>π</sub>(s,a) 时必然满足前提。若所有状态都取到等号，则贝尔曼最优方程成立，π 与 π′ 都已最优——这是策略迭代停止的判据（p36）。`,
  `贪心化一定不降价值；等号处处成立 ⇔ 已到最优。`, undefined);

S(`The greedy policy with respect to q_π is defined as`,
  [`$π'(s) = \\operatorname{argmax} _a q_π(s,a)$`,`π'(a|s) = 1/|A(s)| for all a`,`$π'(s) = argmin_a q_π(s,a)$`,`$π'(s) = E_π[G_t | S_t = s]$`], 0,
  `关于 q<sub>π</sub> 的贪心策略定义为`,
  [`$π'(s) = \\operatorname{argmax} _{a} q_{π}(s,a)$`,`π′(a|s) = 1/|A(s)|（对所有 a）`,`$π'(s) = argmin_{a} q_{π}(s,a)$`,`$π'(s) = E_{π}[G_{t} | S_{t} = s]$`],
  `L5 p28–p30：策略改进的做法是对每个状态取 $π'(s) = \\operatorname{argmax}_{a} q_{π}(s,a)$，即在 s 处选当前动作价值最高的动作，之后仍遵循 π。由策略改进定理，这一步一定不会让价值变差。<br>B 是均匀随机策略（Gridworld 的初始 π）；D 是状态价值的定义。注意贪心策略在<b>模型已知</b>时可直接算：q<sub>π</sub>(s,a) = r(s,a) + γΣp(s′|s,a)v<sub>π</sub>(s′)；<b>免模型</b>时没有 p，才必须估计 Q 并配合 ε-greedy 保证探索（L7 p9–p17）。`,
  `贪心改进 = 对 q<sub>π</sub> 取 argmax；免模型时要先估计 Q 并保留探索。`);

S(`Value iteration can be interpreted as`,
  [`Full policy evaluation until convergence, followed by exactly one improvement`,`One sweep of (truncated) policy evaluation followed by a greedy policy improvement`,`Monte Carlo evaluation with a state-dependent baseline`,`Off-policy TD control with importance sampling`], 1,
  `值迭代（value iteration）可以理解为`,
  [`策略评估完全收敛后，只做一次策略改进`,`一轮（截断的）策略评估 + 一次贪心策略改进`,`带状态相关基线的蒙特卡洛评估`,`带重要性采样的异策略 TD 控制`],
  `L5 p49–p52：策略迭代的痛点是策略评估要迭代很多轮才收敛，「Can we stop policy evaluation after k iterations (even k=1)? — Yes」。把 k 取到 1，并把改进合并进同一条更新，就得到<b>值迭代</b>：$$v_{k+1}(s) = \\max_{a} [r(s,a) + γ \\sum_{s'} p(s'|s,a) v_{k}(s')]$$。<br>A 描述的是<b>策略迭代</b>（评估收敛 → 一次改进）。C、D 是免模型方法（L6、L7、L11），不是已知模型下的值迭代。<br>两者同属 L5 p47 的 <b>Generalised Policy Iteration (GPI)</b>：评估与改进两个过程交替、互相追逐，最终收敛到 π*。`,
  `值迭代 = 截断评估(k=1) + 贪心改进；策略迭代 = 评估到收敛 + 改进。`);

N(`Value iteration starts with v_0(s) = 0 for all states and γ = 0.9. At state s, action a1 gives immediate reward 1 and moves to a terminal state (v_0 = 0); action a2 gives immediate reward 0 and moves to a state with v_0 = 2. Compute v_1(s). (Enter a number.)`,
  1.8,
  `值迭代初始 v<sub>0</sub>(s) = 0（所有状态），γ = 0.9。在状态 s，动作 a1 的即时奖励为 1 且转移到终止状态（v<sub>0</sub> = 0）；动作 a2 的即时奖励为 0 且转移到 v<sub>0</sub> = 2 的状态。计算 v<sub>1</sub>(s)。（输入数值）`,
  `分别算两个动作的备份值：<br>• a1：1 + 0.9×0 = 1<br>• a2：0 + 0.9×2 = 1.8<br>取 max：v<sub>1</sub>(s) = <b>1.8</b>，当前最优动作为 a2。<br><b>注意</b>：a2 的即时奖励是 0（低于 a1 的 1），但因为后继状态已有价值 2，折扣后的未来收益 1.8 更大。这再次说明值迭代不是「贪即时奖励」。<br>下一轮会用 v<sub>1</sub> 再备份一次；γ&lt;1 时这个 max 备份是 γ-压缩，序列收敛到 v*，最后一步再输出贪心策略 π*。`,
  `值迭代每步：对每个 a 算 r+γv(s′)，再取 max。`, undefined, 0.005);

S(`In the small Gridworld the lectures observe that, during policy iteration,`,
  [`the value function always converges before the policy does`,`the policy often converges before the value function does`,`policy iteration never converges to π*`,`value iteration requires model-free sample backups`], 1,
  `课件在小 Gridworld 的策略迭代实验中观察到`,
  [`价值函数总是先于策略收敛`,`策略常常先于价值函数收敛`,`策略迭代永不收敛到 π*`,`值迭代需要免模型采样备份`],
  `L5 p34：<b>「Policy converges before the value function does」</b>；并在小 Gridworld 中改进后的策略已经是最优的。原因是策略只依赖各动作 q 值的<b>相对大小</b>，价值数值还在细调时 argmax 就已稳定。<br>同时课件提醒：一般情况下仍需要多轮 evaluation / improvement，不能保证一轮就最优；策略迭代整体保证收敛到 π*（p34），因为有限 MDP 中每次严格改进都会换一个更好的确定性策略，而这样的策略数量有限。D 错：值迭代是 full-width 的模型备份（L5 p60–p61），采样备份属于 TD/MC。`,
  `策略（argmax 的序）常比价值（数值）先稳定。`);

M(`Which of the following are listed in the lectures as "three simple ideas" of asynchronous dynamic programming?`,
  [`In-place dynamic programming`,`Prioritised sweeping`,`Real-time dynamic programming`,`Experience replay with a separate target network`], [0,1,2],
  `课件把哪些列为异步动态规划（asynchronous DP）的「三个简单想法」？`,
  [`原地动态规划（in-place DP）`,`优先扫描（prioritised sweeping）`,`实时动态规划（real-time DP）`,`带独立目标网络的经验回放`],
  `L5 p55–p59：同步 DP 每轮要扫全部状态（full-width sweep），代价高；<b>异步 DP</b> 任意顺序、就地更新状态，三个具体想法是：<br>① <b>In-place DP</b>：只维护一份价值数组，立刻用新值覆盖旧值，通常收敛更快；<br>② <b>Prioritised sweeping</b>：按贝尔曼误差大小给状态排优先级，优先更新误差大的状态（可用优先队列）；<br>③ <b>Real-time DP</b>：只更新智能体实际访问到的状态。<br>D 是 L9 Nature DQN 的稳定化技巧，属于免模型深度 RL，不是 DP。注意 <b>prioritised sweeping（基于模型的 DP）</b> 与 <b>prioritized experience replay（L10b，基于回放池）</b> 名称相似但对象不同，是高频混淆点。`,
  `异步 DP：in-place / prioritised sweeping / real-time DP；别和 PER 混。`);

S(`Why do iterative policy evaluation and value iteration converge for γ &lt; 1?`,
  [`Because the MDP has finitely many states`,`Because the Bellman expectation and optimality backups are γ-contractions in the ∞-norm`,`Because rewards are clipped to [-1, 1]`,`Because the policy is stochastic`], 1,
  `为什么 γ &lt; 1 时迭代策略评估与值迭代会收敛？`,
  [`因为 MDP 的状态数有限`,`因为贝尔曼期望备份与最优备份在 ∞-范数下都是 γ-压缩映射`,`因为奖励被裁剪到 [−1, 1]`,`因为策略是随机的`],
  `L5 p65–p70 的技术证明：对任意两个价值向量 u, v，$$\\|T^{π}v - T^{π}u\\|_{\\infty} \\le γ \\|v - u\\|_{\\infty},\\|T*v - T*u\\|_{\\infty} \\le γ \\|v - u\\|_{\\infty}$$。因为 γ&lt;1，T 是<b>压缩映射</b>；由 Banach 压缩映射定理，存在<b>唯一不动点</b>，且从任意初值迭代都收敛到它。<br>这同时解释了：① γ&lt;1 时 v<sub>π</sub> 存在且唯一（L4 p10）；② 值迭代与策略迭代的收敛性；③ 误差可按 γ/(1−γ) 与相邻两次迭代差给出上界。<br>「状态有限」（A）本身不保证收敛，奖励裁剪（C）是 DQN 的工程手段，随机策略（D）也不是原因。`,
  `γ-压缩 + 压缩映射定理 = 唯一不动点 + 迭代收敛。`);

N(`In iterative policy evaluation with γ = 0.5, the largest change on the last sweep is ||v_{k+1} - v_k||_∞ = 0.02. Using the standard bound ||v_k - v_π||_∞ ≤ (γ/(1-γ)) · ||v_{k+1} - v_k||_∞, compute the error bound. (Enter a number.)`,
  0.02,
  `迭代策略评估中 γ = 0.5，最后一轮的最大变化量 ‖v<sub>k+1</sub> − v<sub>k</sub>‖<sub>∞</sub> = 0.02。用标准误差界 ‖v<sub>k</sub> − v<sub>π</sub>‖<sub>∞</sub> ≤ (γ/(1−γ)) · ‖v<sub>k+1</sub> − v<sub>k</sub>‖<sub>∞</sub> 计算误差上界。（输入数值）`,
  `γ/(1−γ) = 0.5/0.5 = 1，因此误差界 = 1 × 0.02 = <b>0.02</b>。<br><b>公式来源</b>：由 γ-压缩性，‖v<sub>π</sub> − v<sub>k+1</sub>‖<sub>∞</sub> ≤ γ‖v<sub>π</sub> − v<sub>k</sub>‖<sub>∞</sub>，再用三角不等式消去 ‖v<sub>π</sub> − v<sub>k</sub>‖，得到 ‖v<sub>π</sub> − v<sub>k</sub>‖<sub>∞</sub> ≤ γ/(1−γ) · ‖v<sub>k+1</sub> − v<sub>k</sub>‖<sub>∞</sub>。<br><b>直觉</b>：γ 越接近 1，同样的相邻迭代差对应的真实误差越大（因为剩余尾项收敛得慢）。例如 γ=0.9 时系数变成 9，同样的 0.02 只保证误差 ≤ 0.18。所以实践中「看起来收敛了」在 γ 很大时并不可靠。`,
  `误差界系数 γ/(1−γ)；γ 越大，同样的残差越不可信。`, undefined, 0.0001);

S(`In Jack's Car Rental, requests at the two locations follow Poisson(3) and Poisson(4), and returns Poisson(3) and Poisson(2). Which statement is consistent with the lectures?`,
  [`The first location has far more requests than returns, so cars should never be moved`,`At the second location expected requests (4) exceed expected returns (2), so transferring cars there can be part of the optimal policy`,`The problem must be solved by model-free Q-learning because the dynamics are unknown`,`The discount factor must be set to 0`], 1,
  `Jack 租车问题中，两地的租车请求服从 Poisson(3) 与 Poisson(4)，归还服从 Poisson(3) 与 Poisson(2)。哪个说法与课件一致？`,
  [`第一地点请求远多于归还，因此永远不该调车`,`第二地点期望请求数（4）超过期望归还数（2），因此把车调往该处可能属于最优策略`,`由于动态未知，必须用免模型 Q-learning 求解`,`折扣因子必须设为 0`],
  `L5 p39–p44 的 Jack's Car Rental 是<b>策略迭代</b>的经典例题：第一地点请求 ~ Poisson(3)、归还 ~ Poisson(3)（大致平衡）；第二地点请求 ~ Poisson(4)、归还 ~ Poisson(2)（净流出约 2 辆/天，课件标注 “More pickups than returned”）。因此把车从第一地点调往第二地点常常是有价值的，最优策略呈现随两地库存变化的分段结构。<br>关键点：正因为<b>知道 Poisson 分布</b>，才能用 DP 枚举所有 (请求, 归还) 组合算期望（p43 的曲线是策略迭代得到的策略序列）；这是 model-based planning，不是免模型（C 错）。课件 p46–p47 还展示 modified policy iteration 与 GPI。`,
  `Jack's Car Rental = 已知分布 + 策略迭代；第二地点净流出 → 调车有价值。`);

S(`Dynamic programming backups are described in the lectures as`,
  [`Full-width backups that use the model and consider all possible successor states`,`Sample backups based on a single sampled successor`,`Monte Carlo returns computed at the end of an episode`,`Eligibility traces accumulated over a trajectory`], 0,
  `课件把动态规划的备份描述为`,
  [`使用模型、考虑所有可能后继状态的 full-width 备份`,`基于单个采样后继状态的 sample 备份`,`在幕末计算的蒙特卡洛回报`,`沿轨迹累积的资格迹`],
  `L5 p60–p62：<b>Full-width backup</b> 用已知模型对<b>所有</b>后继状态求期望，正是 DP 的做法；<b>Sample backup</b> 只用一次采样的转移（TD / MC），不需要模型，代价与状态数无关，因此能避开维数灾难，是 L6–L7 以及近似 DP（p62）的核心。<br>C 是 MC 的目标 G<sub>t</sub>；D 是 TD(λ) 的后向视图机制（L6 p57）。<br>这条对比也是理解「DP vs TD」的钥匙：DP = 有模型 + full-width + 自举；TD = 免模型 + sample + 自举；MC = 免模型 + sample + 不自举（L6 p43 的统一视图）。`,
  `DP: full-width（全后继）；TD/MC: sample（单采样）。`);

/* ==================================================================== */
/* CHAPTER 5 — Model-free Prediction: MC / TD / TD(λ) (L6)                */
/* ==================================================================== */
CH(5, 'L6 Model-free Prediction');

S(`Which statement about Monte Carlo (MC) prediction is correct?`,
  [`It bootstraps from the estimated value of the next state`,`It learns directly from complete episodes without knowing the MDP dynamics, and its basic form only applies to episodic tasks`,`It requires the full transition model p(s', r|s, a)`,`It updates V after every single step of an episode`], 1,
  `关于蒙特卡洛（MC）预测，哪个说法正确？`,
  [`它从下一状态的估计价值中自举（bootstrap）`,`直接从完整幕中学习、无需知道 MDP 动态；基本形式只适用于幕式任务`,`需要完整的转移模型 p(s′, r|s, a)`,`在一幕中的每一步之后都更新 V`],
  `L6 p11 的四条结论：MC <b>learns directly from episodes of experience</b>、<b>model-free</b>（不需要 MDP）、<b>learns from complete episodes</b>（必须等到幕结束才知道 G<sub>t</sub>）、<b>caveat: only apply to episodic MDP</b>。<br>A 与 D 描述的是 TD（自举、每步更新），C 描述的是 DP（已知模型）。<br>正因为必须等完整回报，MC 无法用于持续性（continuing）任务，也无法在幕中间学习；这是 L6 p26 列出的 MC vs TD 优劣的核心。`,
  `MC = 完整幕 + 不靠模型 + 不自举；只适用于 episodic。`);

S(`What is the difference between first-visit and every-visit MC prediction?`,
  [`First-visit averages returns from the first occurrence of s in each episode; every-visit averages returns from all occurrences`,`First-visit uses only the first episode; every-visit uses all episodes`,`First-visit bootstraps; every-visit does not`,`They differ only in the choice of discount factor`], 0,
  `首次访问型（first-visit）与每次访问型（every-visit）MC 预测的区别是？`,
  [`首次访问只取每幕中状态 s <b>第一次</b>出现时的回报求平均；每次访问取<b>所有</b>出现处的回报求平均`,`首次访问只用第一幕；每次访问用所有幕`,`首次访问会自举；每次访问不会`,`二者只在折扣因子的选择上不同`],
  `L6 p6–p10：对要评估的状态 s，<b>First-visit MC</b> 只在该幕中<b>第一次</b>访问 s 的时间步 t 累加 G<sub>t</sub>、计数器 N(s) 加一；<b>Every-visit MC</b> 则对<b>每次</b>访问都累加。最后都用样本均值 V(s) = S(s)/N(s)，由大数定律（SLLN）收敛到 v<sub>π</sub>(s)。<br>first-visit 是无偏且被广泛分析的版本（各幕的回报相互独立）；every-visit 在同一幕内用了相关样本，方差/偏差性质略不同，但通常收敛更快。两者都是 model-free、都需完整幕。`,
  `「首次」对的是每幕内的第一个 t，不是第一幕；估计量都是样本均值。`, undefined);

N(`Two episodes are observed with γ = 1: (i) A, r = 1, B, r = 2, terminal; (ii) A, r = 0, B, r = 4, terminal. State A occurs exactly once in each episode. Compute the first-visit MC estimate V(A). (Enter a number.)`,
  3.5,
  `观测到两幕（γ = 1）：(i) A, r = 1, B, r = 2, 终止；(ii) A, r = 0, B, r = 4, 终止。状态 A 在每幕中恰好出现一次。计算首次访问 MC 估计 V(A)。（输入数值）`,
  `先算每幕从 A 出发的回报：<br>• 幕 (i)：G = 1 + 2 = 3<br>• 幕 (ii)：G = 0 + 4 = 4<br>首次访问 MC 对两次回报取平均：V(A) = (3 + 4)/2 = <b>3.5</b>。<br><b>顺带</b>：V(B) = (2 + 4)/2 = 3（B 在每幕中也只出现一次）。<br><b>要点</b>：MC 的目标是从<b>该次访问时刻起</b>的剩余回报，不包含访问之前的奖励；这里 A 都是起始状态所以没有前缀。若某幕中 A 出现两次，first-visit 只取第一个 t，every-visit 则两个都取。`,
  `V(s) = 各幕「从 s 起」回报的样本均值。`, undefined, 0.005);

S(`Which is the incremental implementation of first-visit MC policy evaluation?`,
  [`$V(s) \\leftarrow V(s) + α [R_{t+1} + γV(S_{t+1}) - V(s)]$`,`$V(s) \\leftarrow V(s) + (1/N(s)) [G_t - V(s)]$`,`$V(s) \\leftarrow γV(s) + r$`,`$V(s) \\leftarrow V(s) + [G_t - V(s)]$`], 1,
  `首次访问 MC 策略评估的增量式实现是？`,
  [`$V(s) \\leftarrow V(s) + α[R_{t+1} + γV(S_{t+1}) - V(s)]$`,`$V(s) \\leftarrow V(s) + (1/N(s))[G_{t} - V(s)]$`,`$V(s) \\leftarrow γV(s) + r$`,`$V(s) \\leftarrow V(s) + [G_{t} - V(s)]$`],
  `L6 p15–p17：把样本均值 V(s) = (1/N)ΣG 写成增量形式 $$N(s) \\leftarrow N(s)+1;V(s) \\leftarrow V(s) + (1/N(s))[G_{t} - V(s)]$$。由大数定律，N→∞ 时 V(s) → v<sub>π</sub>(s)。<br>A 是 TD(0) 的更新（用自举目标）；D 少了 1/N，会来回震荡不收敛；C 不是任何标准更新。<br>课件 p19–p20 进一步把 1/N 换成常数 α 或一般步长 α<sub>k</sub>：Robbins–Monro 要求 Σα<sub>k</sub>=∞ 且 Σα<sub>k</sub>²&lt;∞，1/k 满足、常数 α 不满足但能跟踪非平稳问题。`,
  `增量均值：步长 = 1/N(s)；TD 的步长是 α、目标是 R+γV(S′)。`);

S(`Replacing the step size 1/N(s) by a constant α has which effect?`,
  [`It makes V(s) an unbiased estimate after finitely many episodes`,`It places exponentially decaying weights on older returns, which is useful in non-stationary problems`,`It forces the algorithm to wait until the end of every episode`,`It is exactly the Robbins-Monro schedule α_k = 1/k`], 1,
  `把步长 1/N(s) 换成常数 α 会有什么效果？`,
  [`使 V(s) 在有限幕之后成为无偏估计`,`给较早的回报赋予指数衰减的权重，适合非平稳问题`,`强制算法必须等到每幕结束才能更新`,`这正是 Robbins–Monro 步长 α<sub>k</sub> = 1/k`],
  `L6 p19：展开 V<sub>n+1</sub> = (1−α)V<sub>n</sub> + αG<sub>n</sub> 可得 $V_{n+1} = (1-α)^{n}V_{1} + \\sum_{i} α(1-α)^{n-i} G_{i}$，即旧回报的权重按 (1−α) 指数衰减，所以近期经验更「重要」——适合 <b>non-stationary</b> 环境（策略或环境在变）。<br>代价：由于 Σα² 发散，估计不会收敛到一个固定点，而是持续围绕真值波动（有方差）。D 恰好说反了：1/k 才是满足 Robbins–Monro 条件的衰减步长，可保证收敛到 v<sub>π</sub>；常数 α 不是。`,
  `常数 α = 指数加权移动平均；跟踪非平稳，但不收敛到点估计。`);

S(`Which is the TD(0) prediction update used in the lectures?`,
  [`$V(S_t) \\leftarrow V(S_t) + α [G_t - V(S_t)]$`,`$V(S_t) \\leftarrow V(S_t) + α [R_{t+1} + γV(S_{t+1}) - V(S_t)]$`,`$V(S_t) \\leftarrow V(S_t) + α [R_{t+1} + γG_{t+1} - V(S_t)]$`,`$V(S_t) \\leftarrow E_π[R_{t+1} + γV(S_{t+1})]$`], 1,
  `课件中 TD(0) 预测的更新式是？`,
  [`$V(S_{t}) \\leftarrow V(S_{t}) + α[G_{t} - V(S_{t})]$`,`$V(S_{t}) \\leftarrow V(S_{t}) + α[R_{t+1} + γV(S_{t+1}) - V(S_{t})]$`,`$V(S_{t}) \\leftarrow V(S_{t}) + α[R_{t+1} + γG_{t+1} - V(S_{t})]$`,`$V(S_{t}) \\leftarrow E_{π}[R_{t+1} + γV(S_{t+1})]$`],
  `L6 p24：TD 把 V(S<sub>t</sub>) 朝着<b>估计回报</b> $R_{t+1} + γV(S_{t+1})$ 更新，其中 $δ_{t} = R_{t+1} + γV(S_{t+1}) - V(S_{t})$ 称为 <b>TD error</b>。<br>A 是 MC 更新（目标用完整回报 G<sub>t</sub>）；D 是 DP 的期望备份（需要模型，且没有 α 的增量形式）。<br>关键：TD 只需一步转移 (S<sub>t</sub>, A<sub>t</sub>, R<sub>t+1</sub>, S<sub>t+1</sub>)，可在线、从不完整序列学习，适用于持续性任务；它「update a guess from a guess」，即<b>自举</b>。`,
  `TD 目标 = R + γV(S′)；δ = 目标 − 当前估计。`, undefined);

N(`A TD(0) update is performed with V(S_t) = 0.5, R_{t+1} = 1, γ = 0.9, V(S_{t+1}) = 2 and α = 0.1. Compute the new value V(S_t). (Enter a number.)`,
  0.73,
  `一次 TD(0) 更新：V(S<sub>t</sub>) = 0.5，R<sub>t+1</sub> = 1，γ = 0.9，V(S<sub>t+1</sub>) = 2，α = 0.1。计算更新后的 V(S<sub>t</sub>)。（输入数值）`,
  `① TD 目标 = R<sub>t+1</sub> + γV(S<sub>t+1</sub>) = 1 + 0.9×2 = 2.8。<br>② TD 误差 δ = 2.8 − 0.5 = 2.3。<br>③ 新值 V(S<sub>t</sub>) ← 0.5 + 0.1×2.3 = 0.5 + 0.23 = <b>0.73</b>。<br><b>易错点</b>：α 乘的是<b>误差</b>（目标 − 旧值），不是目标本身；写成 0.5 + 0.1×2.8 = 0.78 是错的。另外 γ 只乘 V(S<sub>t+1</sub>)，不乘即时奖励。`,
  `V ← V + αδ，δ = R + γV(S′) − V。`, undefined, 0.005);

N(`Given V(S_t) = 3, R_{t+1} = 2, γ = 0.5 and V(S_{t+1}) = 4, compute the TD error δ_t. (Enter a number.)`,
  1,
  `已知 V(S<sub>t</sub>) = 3、R<sub>t+1</sub> = 2、γ = 0.5、V(S<sub>t+1</sub>) = 4，计算 TD 误差 δ<sub>t</sub>。（输入数值）`,
  `δ<sub>t</sub> = R<sub>t+1</sub> + γV(S<sub>t+1</sub>) − V(S<sub>t</sub>) = 2 + 0.5×4 − 3 = 2 + 2 − 3 = <b>1</b>。<br>TD 误差是「当前步实际看到的结果」与「原本预期」之间的差：正的 δ 说明这一步比预期好，价值应该上调。<br><b>延伸</b>：在 L6 p58 的后向视图 TD(λ) 中，所有状态按 $V(s) \\leftarrow V(s) + αδ_{t}E_{t}(s)$ 更新；在 L11 的 actor-critic 中，同一个 δ 又是优势函数 A(s,a) 的无偏估计，用来降低策略梯度方差。`,
  `δ = 一步目标 − 旧估计；也是 TD(λ) 与 actor-critic 的核心量。`, undefined, 0.005);

S(`Which statement about the bias / variance trade-off of MC and TD is correct?`,
  [`MC has low variance and some bias`,`The return G_t is unbiased for v_π(S_t), while the practical TD target R_{t+1} + γV(S_{t+1}) is biased but has much lower variance`,`The practical TD target is always unbiased`,`Both MC and TD require the full MDP dynamics`], 1,
  `关于 MC 与 TD 的偏差 / 方差权衡，哪个说法正确？`,
  [`MC 方差低、有一定偏差`,`回报 G<sub>t</sub> 是 v<sub>π</sub>(S<sub>t</sub>) 的无偏估计；实用的 TD 目标 R<sub>t+1</sub> + γV(S<sub>t+1</sub>) 有偏但方差低得多`,`实用的 TD 目标总是无偏的`,`MC 与 TD 都需要完整的 MDP 动态`],
  `L6 p27–p28：<br>• <b>G<sub>t</sub> = R<sub>t+1</sub> + γR<sub>t+2</sub> + …</b> 是 v<sub>π</sub>(S<sub>t</sub>) 的<b>无偏</b>估计，但依赖很多随机动作、转移与奖励 → <b>高方差</b>。<br>• 用真值 v<sub>π</sub> 构成的 TD 目标 R<sub>t+1</sub> + γv<sub>π</sub>(S<sub>t+1</sub>) 也是无偏的；但实践中用估计 V 代替 v<sub>π</sub>，因而<b>有偏</b>。<br>• 该 TD 目标只依赖<b>一步</b>随机性 → <b>低方差</b>，通常更高效。<br>课件 p28 总结：MC 高方差零偏差、收敛性质好（即使有函数近似）、对初值不敏感；TD 低方差有偏差、通常更高效、对初值更敏感，且配合函数近似不总收敛。`,
  `MC：零偏差高方差；TD：有偏低方差。`, undefined);

S(`In the unified view of RL backups presented in the lectures, which statement is correct?`,
  [`MC bootstraps and samples; DP samples but does not bootstrap; TD only samples`,`MC samples but does not bootstrap; DP bootstraps but does not sample; TD does both`,`All three methods bootstrap`,`None of the three methods uses sampling`], 1,
  `课件给出的「备份统一视图」中，哪个说法正确？`,
  [`MC 既自举又采样；DP 采样但不自举；TD 只采样`,`MC 采样但不自举；DP 自举但不采样；TD 两者都做`,`三种方法都自举`,`三种方法都不使用采样`],
  `L6 p40–p44 用备份图统一三种方法：<br>• <b>MC backup</b>：V(S<sub>t</sub>) ← V + α(G<sub>t</sub> − V)，一路采样到幕末，<b>samples、不 bootstrap</b>。<br>• <b>TD backup</b>：V(S<sub>t</sub>) ← V + α(R<sub>t+1</sub> + γV(S<sub>t+1</sub>) − V)，只采样一步、用后续估计自举，<b>两者都有</b>。<br>• <b>DP backup</b>：V(S<sub>t</sub>) ← E<sub>π</sub>[R<sub>t+1</sub> + γV(S<sub>t+1</sub>)]，用模型对所有后继求期望，<b>bootstraps、不 sample</b>。<br>这张图也是理解「TD 是 MC 与 DP 之间谱系」（L6 p45–p46）的基础。`,
  `采样 / 自举二维表：MC(✓,✗)、DP(✗,✓)、TD(✓,✓)。`, undefined);

S(`In the AB example (8 episodes: one "A, 0, B, 0" and seven episodes starting at B with six rewards of 1 and one reward of 0), what does batch TD(0) converge to for V(A)?`,
  [`0`,`0.75`,`0.5`,`1`], 1,
  `AB 例子（8 幕：1 幕为 A, 0, B, 0；7 幕从 B 开始，其中 6 幕奖励 1、1 幕奖励 0）中，批量 TD(0) 收敛到的 V(A) 是多少？`,
  [`0`,`0.75`,`0.5`,`1`],
  `L6 p33–p38 的经典对照：<br>• <b>批量 MC</b> 最小化 Σ(G<sub>t</sub> − V(s<sub>t</sub>))²，是对观测回报的最优拟合；A 只被观测到一次且回报为 0，所以 <b>V(A) = 0</b>。<br>• <b>批量 TD(0)</b> 收敛到<b>最大似然马尔可夫模型</b>的解（certainty equivalence）：从数据估计 P̂、R̂ 后再精确求解。B 的 8 次观测中 6 次得 1，故 V(B) = 6/8 = 0.75；又因 A→B 的观测奖励为 0 且 γ=1，得到 <b>V(A) = V(B) = 0.75</b>。<br>这个例子说明：TD 隐式利用了马尔可夫性，因此在有限数据下与 MC 给出不同答案；在马尔可夫环境中通常更高效，在非马尔可夫环境中 MC 反而更稳健（p39）。`,
  `AB 例子：MC → V(A)=0；TD(0) → V(A)=0.75（确定性等价）。`, undefined);

N(`In the AB example with 8 episodes starting at B, six episodes give reward 1 immediately and terminate, one gives reward 0, and the eighth is the "B, 0" tail of the A episode. With γ = 1, compute the TD(0) / certainty-equivalence estimate V(B). (Enter a number.)`,
  0.75,
  `AB 例子中共 8 次从 B 出发的观测：6 次立即得到奖励 1 并终止，1 次奖励 0 并终止，另 1 次是 A 幕尾部的「B, 0」。γ = 1，计算 TD(0) / 确定性等价估计 V(B)。（输入数值）`,
  `批量 TD(0) 等价于先由数据拟合最大似然 MDP 再求其价值函数（L6 p38「certainty equivalence」）。B 之后的即时奖励经验均值：<br>V(B) = R̂(B) = (6×1 + 2×0)/8 = 6/8 = <b>0.75</b>。<br>由于 A→B 的转移奖励为 0 且 γ=1，价值函数满足 V(A) = 0 + V(B) = 0.75。<br><b>对比</b>：批量 MC 只看「从 B 出发实际观测到的回报」，其均值同样是 0.75，但 A 只有一次观测且回报为 0，故 MC 得 V(A)=0。二者差异的根源是 TD 借用了 <b>A→B 必然发生</b> 这一马尔可夫结构。`,
  `V(B)=6/8=0.75；TD 用结构，MC 只用观测回报。`, undefined, 0.005);

S(`Why is TD(0) usually more efficient than MC in Markov environments?`,
  [`Because MC requires a neural network and TD does not`,`Because TD exploits the Markov property through bootstrapping (a certainty-equivalence estimate), while MC does not exploit it`,`Because TD always uses a larger step size`,`Because MC is an off-policy algorithm`], 1,
  `为什么在马尔可夫环境中 TD(0) 通常比 MC 更高效？`,
  [`因为 MC 必须要用神经网络而 TD 不用`,`因为 TD 通过自举利用了马尔可夫性质（等价于拟合最大似然模型），而 MC 不利用它`,`因为 TD 总是使用更大的步长`,`因为 MC 是异策略算法`],
  `L6 p38–p39：批量 TD(0) 收敛到「最拟合数据的 MDP ⟨S, A, P̂, R̂, γ⟩ 的精确解」，即 <b>certainty-equivalence estimate</b>——它把一步转移结构当成已知并利用起来；批量 MC 只最小化观测回报的均方误差，不使用状态之间的转移结构。因此在真正满足马尔可夫性的环境里，TD 通常样本效率更高；反之在<b>非马尔可夫</b>（部分可观测、状态表示不充分）环境里，MC 往往更稳健，因为它不对结构做假设。<br>C 错：步长由 α 决定，与算法类别无关；D 错：MC 预测评估的是生成数据的策略，通常同策略。`,
  `TD 利用 Markov 结构 → 高效；MC 不假设结构 → 非 Markov 时更稳。`, undefined);

S(`Which expression is the general n-step return used in n-step TD prediction?`,
  [`$R_{t+1} + γV(S_{t+1})$`,`$R_{t+1} + γR_{t+2} + \\cdots + γ^{n-1}R_{t+n} + γ^n V(S_{t+n})$`,`$\\sum _{k=0}^{\\infty } γ^k R_{t+k+1}$`,`$R_{t+1} + γG_{t+1} - V(S_t)$`], 1,
  `n 步 TD 预测中通用的 n 步回报表达式是？`,
  [`R<sub>t+1</sub> + γV(S<sub>t+1</sub>)`,`R<sub>t+1</sub> + γR<sub>t+2</sub> + … + γ<sup>n−1</sup>R<sub>t+n</sub> + γ<sup>n</sup>V(S<sub>t+n</sub>)`,`$\\sum _{k=0}^{\\infty } γ^{k}R_{t+k+1}$`,`R<sub>t+1</sub> + γG<sub>t+1</sub> − V(S<sub>t</sub>)`],
  `L6 p48 定义：$$G_{t}^{(n)} = R_{t+1} + γR_{t+2} + \\cdots + γ^{n-1}R_{t+n} + γ^{n}V(S_{t+n})$$，更新为 V(S<sub>t</sub>) ← V(S<sub>t</sub>) + α(G<sub>t</sub><sup>(n)</sup> − V(S<sub>t</sub>))。<br>两个端点：<b>n = 1</b> 就是 TD(0) 目标 R<sub>t+1</sub> + γV(S<sub>t+1</sub>)（A 选项）；<b>n → ∞</b>（到幕末）就是 MC 回报（C 选项）。因此 n 步回报把 TD 与 MC 连成一个谱系（p46），n 取中间值可在偏差与方差之间折中。`,
  `n 步回报：前 n 个奖励真实采样，第 n 步之后用 V 自举。`, undefined);

N(`Compute the 2-step return G_t^(2) when R_{t+1} = 1, R_{t+2} = 2, γ = 0.5 and V(S_{t+2}) = 4. (Enter a number.)`,
  3,
  `已知 R<sub>t+1</sub> = 1、R<sub>t+2</sub> = 2、γ = 0.5、V(S<sub>t+2</sub>) = 4，计算 2 步回报 G<sub>t</sub><sup>(2)</sup>。（输入数值）`,
  `n=2 时：$G_{t}^{(2)} = R_{t+1} + γR_{t+2} + γ^2V(S_{t+2})$。<br>代入：1 + 0.5×2 + 0.25×4 = 1 + 1 + 1 = <b>3</b>。<br><b>检查权重</b>：第 1 个奖励权重 γ⁰=1、第 2 个 γ¹=0.5、自举项 γ²=0.25。若误写成 γV(S<sub>t+2</sub>) 会得到 1+1+2=4（错）。<br>对比 1 步目标 = 1 + 0.5×? —— 题目未给 V(S<sub>t+1</sub>)，这也说明 n 越大需要的真实奖励越多、需要的估计越靠后，方差越大而偏差越小。`,
  `自举项的权重是 γ<sup>n</sup>，不是 γ。`, undefined, 0.005);

S(`Which statement about forward-view and backward-view TD(λ) is correct?`,
  [`The forward view can be computed online from incomplete sequences`,`The forward view provides the theory but needs complete episodes to compute G_t^λ; the backward view with eligibility traces provides the online mechanism`,`The backward view never uses eligibility traces`,`Forward and backward TD(λ) are identical for online updates at every value of λ`], 1,
  `关于 TD(λ) 的前向视图与后向视图，哪个说法正确？`,
  [`前向视图可以在线从不完整序列计算`,`前向视图提供理论，但要计算 G<sub>t</sub><sup>λ</sup> 需要完整幕；带资格迹的后向视图提供在线实现机制`,`后向视图从不使用资格迹`,`对任意 λ，在线更新下的前向与后向 TD(λ) 完全等价`],
  `L6 p51–p56：<b>前向视图</b>用 λ-回报 $G_{t}^{λ} = (1-λ)\\sum_{n=1}^{\\infty}λ^{n-1}G_{t}^{(n)}$ 更新，理论上清晰，但和 MC 一样「looks into the future」，只能在完整幕之后计算。<b>后向视图</b>为每个状态维护资格迹 $E_{t}(s) = γλE_{t-1}(s) + 1(S_{t}=s)$，按 $V(s) \\leftarrow V(s) + αδ_{t}E_{t}(s)$ 每步在线更新。<br>p60–p69 的等价定理：<b>离线（offline）更新</b>时两者在一个幕结束后的<b>总更新量恒等</b>；<b>在线（online）更新</b>时只有 λ=0 或采用 Exact Online TD(λ)（Sutton & van Seijen, ICML 2014）的迹定义才严格等价，故 D 错。`,
  `前向 = 理论（需完整幕）；后向 = 机制（资格迹、在线）；离线总更新相等。`, undefined);

N(`A truncated λ-return uses only three n-step returns: G_t^(1) = 2, G_t^(2) = 4, G_t^(3) = 6, with λ = 0.5. Using the weights (1-λ)λ^(n-1), compute (1-λ)[G^(1) + λG^(2) + λ^2 G^(3)]. (Enter a number.)`,
  2.75,
  `截断的 λ-回报只取三个 n 步回报：G<sub>t</sub><sup>(1)</sup> = 2、G<sub>t</sub><sup>(2)</sup> = 4、G<sub>t</sub><sup>(3)</sup> = 6，λ = 0.5。按权重 (1−λ)λ<sup>n−1</sup> 计算 (1−λ)[G<sup>(1)</sup> + λG<sup>(2)</sup> + λ²G<sup>(3)</sup>]。（输入数值）`,
  `① 括号内：2 + 0.5×4 + 0.25×6 = 2 + 2 + 1.5 = 5.5。<br>② 乘归一化因子 (1−λ) = 0.5：G<sub>t</sub><sup>λ</sup> = 0.5 × 5.5 = <b>2.75</b>。<br><b>为什么要有 (1−λ)</b>：权重 (1−λ)λ<sup>n−1</sup> 构成几何级数，Σ<sub>n=1</sub><sup>∞</sup>(1−λ)λ<sup>n−1</sup> = 1，保证 λ-回报是各 n 步回报的加权平均而非累加。<br>λ→0 时权重几乎全给 n=1（TD(0)）；λ→1 时权重趋于均匀铺开，离线更新下等价于 MC。`,
  `权重 (1−λ)λ<sup>n−1</sup> 求和为 1；λ 控制「看多远」。`, undefined, 0.005);

S(`With eligibility traces E_t(s) = γλ E_{t-1}(s) + 1(S_t = s), backward-view TD(λ) reduces to ___ when λ = 0 and is equivalent (offline) to ___ when λ = 1.`,
  [`Monte Carlo; TD(0)`,`TD(0); Monte Carlo (every-visit)`,`Dynamic programming; SARSA`,`SARSA; Q-learning`], 1,
  `对资格迹 E<sub>t</sub>(s) = γλE<sub>t−1</sub>(s) + 1(S<sub>t</sub> = s)，后向视图 TD(λ) 在 λ = 0 时退化为 ___，在 λ = 1 时（离线更新）等价于 ___。`,
  [`蒙特卡洛；TD(0)`,`TD(0)；蒙特卡洛（每次访问型）`,`动态规划；SARSA`,`SARSA；Q-learning`],
  `L6 p57–p64：<br>• <b>λ = 0</b>：E<sub>t</sub>(s) = 1(S<sub>t</sub> = s)，只有当前状态的迹非零，更新退化为 V(S<sub>t</sub>) ← V(S<sub>t</sub>) + αδ<sub>t</sub>，即 <b>TD(0)</b>。<br>• <b>λ = 1</b>：迹按 γ 衰减，一幕内所有 TD 误差「伸缩相加（telescoping）」：$δ_{t} + γδ_{t+1} + \\cdots = G_{t} - V(S_{t})$，因此幕末累计更新与 <b>every-visit MC</b> 相同（p63–p64）。<br>资格迹同时结合了 <b>recency heuristic</b>（越近的状态功劳越大）与 <b>frequency heuristic</b>（越常访问的状态功劳越大），用来解决信用分配问题（p57）。`,
  `λ=0 → TD(0)；λ=1 → MC；中间值是偏差-方差折中。`, undefined);

/* ==================================================================== */
/* CHAPTER 6 — Model-free Control (L7)                                    */
/* ==================================================================== */
CH(6, 'L7 Model-free Control');

S(`In the lectures, "learning on the job" — learning about π from experience sampled from π — is called`,
  [`On-policy learning`,`Off-policy learning`,`Planning`,`Model-based learning`], 0,
  `课件把「边干边学」——用从 π 采样得到的经验去学习 π——称为什么？`,
  [`同策略学习（on-policy）`,`异策略学习（off-policy）`,`规划`,`基于模型的学习`],
  `L7 p4 的对照表：<b>On-policy / learn on the job</b> = learn about π from experience sampled from π；<b>Off-policy / learn from others</b> = learn about π from experience sampled from μ（行为策略）。<br>异策略的三条价值（p46）：可以向其他智能体学习、重用旧策略产生的经验、<b>一边按探索策略行动，一边学习最优策略</b>——这正是 Q-learning 与 DQN 经验回放的理论基础。`,
  `目标策略 π vs 行为策略 μ；二者相同 = 同策略。`, undefined);

S(`Why can model-free control not simply improve a policy with π'(s) = argmax_a v_π(s)?`,
  [`Because v_π is always biased`,`Because greedy improvement from state values requires the MDP dynamics; model-free control must estimate q(s,a) instead, and must also guarantee exploration`,`Because argmax is not differentiable`,`Because γ must be 0 in the model-free setting`], 1,
  `为什么免模型控制不能简单地用 π′(s) = argmax<sub>a</sub> v<sub>π</sub>(s) 来改进策略？`,
  [`因为 v<sub>π</sub> 总是有偏的`,`因为由状态价值做贪心改进需要 MDP 动态；免模型控制必须改为估计 q(s,a)，并且还要保证探索`,`因为 argmax 不可导`,`因为免模型情形下 γ 必须为 0`],
  `L7 p9–p10：策略改进定理用 $π'(s) = \\operatorname{argmax}_{a} q_{π}(s,a)$；但由 v<sub>π</sub> 反推 q 需要 $q_{π}(s,a) = r(s,a) + γ\\sum_{s'}p(s'|s,a)v_{π}(s')$——<b>必须知道 p 和 r</b>。免模型时没有模型，只能直接估计 Q(s,a)（GPI over Q）。<br>第二个坑（p13–p15）：若一开始就对 Q 取贪心、不再探索，未被试过的动作 Q 值停留在初值，可能永远不会被选中（「I will never be explored」），从而收敛到次优策略。因此需要 <b>exploring starts</b> 或 <b>ε-greedy</b>。`,
  `免模型 → 直接学 Q；贪心 + 无探索 → 次优，必须显式探索。`, undefined);

S(`Under an ε-greedy policy with m actions, what is the probability of selecting the current greedy (argmax) action?`,
  [`1 - ε`,`1 - ε + ε/m`,`ε/m`,`1/m`], 1,
  `在含 m 个动作的 ε-greedy 策略下，选中当前贪心（argmax）动作的概率是多少？`,
  [`1 − ε`,`1 − ε + ε/m`,`ε/m`,`1/m`],
  `L7 p16–p18：以概率 <b>1−ε</b> 取贪心动作 a = argmax<sub>a</sub>Q(s,a)；以概率 <b>ε</b> 在全部 m 个动作中均匀随机采样（每个动作 ε/m）。<br>贪心动作可能在<b>两条路径</b>被选中，所以总概率 = (1−ε) + ε/m = <b>1 − ε + ε/m</b>。其余每个非贪心动作的概率是 ε/m。<br>常见错误：只写 1−ε（漏掉随机分支也会抽到贪心动作）。当 ε=1 时退化为均匀随机：1−1+1/m = 1/m ✓；当 ε=0 时为 1 ✓——可用这两个极端自检。`,
  `P(贪心) = 1 − ε + ε/m；别忘了探索分支也会抽中它。`, undefined);

N(`An ε-greedy behaviour policy uses ε = 0.1 and there are 4 actions. Compute the probability of taking the current greedy action. (Enter a number between 0 and 1.)`,
  0.925,
  `ε-greedy 行为策略取 ε = 0.1，动作数 m = 4。计算选中当前贪心动作的概率。（输入 0 到 1 之间的数值）`,
  `P(贪心) = 1 − ε + ε/m = 1 − 0.1 + 0.1/4 = 0.9 + 0.025 = <b>0.925</b>。<br>其余三个动作各为 ε/m = 0.025，总和 0.925 + 3×0.025 = 1 ✓。<br><b>概念关联</b>：正因为探索分支始终存在，Cliff Walking 中 Q-learning 虽然学到了贴着悬崖的最优路径，在线执行时仍会偶尔掉下去（L7 p63）；这个 ε 也是 DQN 训练时从 1.0 退火到 0.1 的对象（L9）。`,
  `1 − ε + ε/m；ε=0.1, m=4 → 0.925。`, undefined, 0.0005);

S(`What does GLIE require?`,
  [`The policy is greedy from the very first step`,`All state-action pairs are explored infinitely often, and the policy converges in the limit to a greedy policy w.r.t. Q`,`The importance-sampling ratio is always 1`,`The behaviour policy must equal the target policy at every step`], 1,
  `GLIE 要求什么？`,
  [`策略从第一步起就是贪心的`,`所有状态-动作对被访问无穷多次，且策略在极限下收敛到关于 Q 的贪心策略`,`重要性采样比率恒为 1`,`行为策略每一步都必须等于目标策略`],
  `L7 p23：<b>Greedy in the Limit with Infinite Exploration</b>，两个条件：① 所有 (s,a) 被探索无穷多次（保证 Q 的估计收敛）；② 策略最终收敛到贪心策略（保证最终利用已学到的最优动作）。<br>p24 给出典型例子：ε-greedy 在 $ε_{k} = 1/k$（随幕数衰减）时是 GLIE；<b>固定 ε</b> 不是 GLIE，因为它永远保留固定比例的探索，不收敛到贪心策略。<br>p25–p26：GLIE MC control 每幕采样 → 对 (S,A) 用增量均值更新 Q → 按 ε-greedy 改进策略，最终收敛到<b>最优 q*</b>。`,
  `GLIE = 无限探索 + 极限贪心；ε<sub>k</sub>=1/k 满足，常数 ε 不满足。`, undefined);

S(`GLIE Monte Carlo control converges to`,
  [`The true state-value function v_π of the behaviour policy only`,`The optimal action-value function q*`,`The MDP transition model`,`A uniformly random policy`], 1,
  `GLIE 蒙特卡洛控制收敛到`,
  [`仅收敛到行为策略的真实状态价值 v<sub>π</sub>`,`最优动作价值函数 q*`,`MDP 的转移模型`,`均匀随机策略`],
  `L7 p25–p26：GLIE MC control 的算法是「采样一幕 → 对幕中每个 (S<sub>t</sub>, A<sub>t</sub>) 用 G<sub>t</sub> 做增量均值更新 Q → 按 ε-greedy 对 Q 做贪心改进」，在 GLIE 条件下收敛到 <b>最优动作价值 q*</b>，从而得到最优策略。<br>注意与 L6 的 MC <b>预测</b>区分：预测只评估给定 π，得到 v<sub>π</sub>；控制要优化策略，得到 q*。它仍然要求完整幕、仍然 model-free、仍然是 on-policy（经验来自当前 ε-greedy 策略）。`,
  `MC 预测 → v<sub>π</sub>；MC 控制（GLIE）→ q*。`, undefined);

S(`Which is the SARSA update rule?`,
  [`Q(S,A) ← Q(S,A) + α[R + γ max_a Q(S',a) - Q(S,A)]`,`$Q(S,A) \\leftarrow Q(S,A) + α[R + γ Q(S',A') - Q(S,A)]$`,`$Q(S,A) \\leftarrow Q(S,A) + α[G_t - Q(S,A)]$`,`$Q(S,A) \\leftarrow E[R + γQ(S',A')]$`], 1,
  `SARSA 的更新式是？`,
  [`Q(S,A) ← Q(S,A) + α[R + γ max<sub>a</sub> Q(S′,a) − Q(S,A)]`,`$Q(S,A) \\leftarrow Q(S,A) + α[R + γ Q(S',A') - Q(S,A)]$`,`$Q(S,A) \\leftarrow Q(S,A) + α[G_{t} - Q(S,A)]$`,`$Q(S,A) \\leftarrow E[R + γQ(S',A')]$`],
  `L7 p34–p36：SARSA 名字来自五元组 <b>(S, A, R, S′, A′)</b>。算法：初始化 S，按 ε-greedy(Q) 选 A；每步执行 A、观测 R 与 S′、再按 ε-greedy(Q) 选 A′；用 $Q(S,A) \\leftarrow Q(S,A) + α[R + γQ(S',A') - Q(S,A)]$ 更新；最后 S←S′, A←A′。<br>因为 A′ 是<b>实际由行为策略采出</b>的动作，目标是同策略的，所以 SARSA 是 <b>on-policy</b>。A 是 Q-learning（max，异策略）；C 是 MC 控制；D 是期望形式（需模型）。`,
  `SARSA 用实际 A′；Q-learning 用 max<sub>a</sub>。`, undefined);

N(`One SARSA step: Q(S,A) = 1, R = 2, γ = 0.9, Q(S',A') = 3, α = 0.1. Compute the updated Q(S,A). (Enter a number.)`,
  1.37,
  `一次 SARSA 更新：Q(S,A) = 1，R = 2，γ = 0.9，Q(S′,A′) = 3，α = 0.1。计算更新后的 Q(S,A)。（输入数值）`,
  `目标 = R + γQ(S′,A′) = 2 + 0.9×3 = 4.7。<br>δ = 4.7 − 1 = 3.7。<br>Q(S,A) ← 1 + 0.1×3.7 = 1 + 0.37 = <b>1.37</b>。<br><b>要点</b>：这里用的是<b>实际采到的下一动作 A′</b>的 Q 值（3），而不是 max。若同一状态下 max<sub>a</sub>Q(S′,a) = 5，Q-learning 的目标会是 2+4.5=6.5，与 SARSA 的 4.7 不同——这个差别正是 Cliff Walking 中两种算法学到不同路径的原因。`,
  `SARSA 目标 = R + γQ(S′,A′)（含探索动作）。`, undefined, 0.005);

S(`Which is the Q-learning update rule?`,
  [`$Q(S,A) \\leftarrow Q(S,A) + α[R + γQ(S',A') - Q(S,A)]$`,`Q(S,A) ← Q(S,A) + α[R + γ max_a Q(S',a) - Q(S,A)]`,`$Q(S,A) \\leftarrow Q(S,A) + α[G_t - Q(S,A)]$`,`Q(S,A) ← Q(S,A) + α[R + γ Σ_a π(a|S')Q(S',a) - Q(S,A)]`], 1,
  `Q-learning 的更新式是？`,
  [`$Q(S,A) \\leftarrow Q + α[R + γQ(S',A') - Q]$`,`Q(S,A) ← Q + α[R + γ max<sub>a</sub> Q(S′,a) − Q]`,`$Q(S,A) \\leftarrow Q + α[G_{t} - Q]$`,`Q(S,A) ← Q + α[R + γ Σ<sub>a</sub> π(a|S′)Q(S′,a) − Q]`],
  `L7 p55–p60：目标策略 π 是关于 Q 的<b>贪心</b>策略，行为策略 μ 是 ε-greedy。目标可化简：$$R_{t+1} + γ Q(S_{t+1}, \\operatorname{argmax}_{a} Q(S_{t+1},a)) = R_{t+1} + γ \\max_{a} Q(S_{t+1}, a)$$。由于是 <b>max</b> 而不是对 μ 的期望，<b>无需重要性采样</b>（p57「No change of measure is required」）。<br>A 是 SARSA；C 是 MC；D 是 Expected SARSA（Sutton 补充）。p62 的定理：在标准条件下 Q-learning 收敛到最优 q*。`,
  `Q-learning：max 目标 + ε-greedy 行为 → 异策略、无需重要性采样。`, undefined);

N(`One Q-learning step: Q(S,A) = 0, R = 1, γ = 0.9, max_a Q(S',a) = 5, α = 0.5. Compute the updated Q(S,A). (Enter a number.)`,
  2.75,
  `一次 Q-learning 更新：Q(S,A) = 0，R = 1，γ = 0.9，max<sub>a</sub> Q(S′,a) = 5，α = 0.5。计算更新后的 Q(S,A)。（输入数值）`,
  `目标 y = R + γ max<sub>a</sub>Q(S′,a) = 1 + 0.9×5 = 1 + 4.5 = 5.5。<br>Q(S,A) ← 0 + 0.5 × (5.5 − 0) = <b>2.75</b>。<br><b>注意</b>：Q-learning 的目标用的是 <b>max</b>，与「实际执行的下一动作 A′」无关；因此它可以在行为策略持续探索的同时，学习最优（贪心）策略的价值。这也是 Nature DQN 的损失函数 $L_{i}(θ_{i}) = E[(y_{i} - Q(s,a;θ_{i}))^2]$ 的直接来源，其中 y<sub>i</sub> = r + γ max<sub>a′</sub> Q(s′,a′;θ<sub>i</sub><sup>−</sup>)。`,
  `y = r + γ max Q′；DQN 只是把 Q 表换成 Q 网络并加目标网络。`, undefined, 0.005);

S(`In the Cliff Walking example, SARSA obtains a better online episode reward than Q-learning even though Q-learning finds the optimal path. Why?`,
  [`Q-learning is a model-based algorithm`,`SARSA's on-policy target includes the ε-greedy exploratory action, so it learns the value of the risky path under exploration and prefers a safer path; Q-learning targets the greedy optimal path while still paying for exploratory falls`,`SARSA uses a larger discount factor`,`Q-learning converges to a suboptimal policy`], 1,
  `Cliff Walking 中，Q-learning 找到的是最优路径，但 SARSA 的在线每幕回报反而更好。为什么？`,
  [`Q-learning 是基于模型的算法`,`SARSA 的同策略目标包含 ε-greedy 的探索动作，因此学到「带探索时的风险路径价值」而偏好更安全的路径；Q-learning 的目标针对贪心最优路径，但执行时仍会因探索掉下悬崖`,`SARSA 使用了更大的折扣因子`,`Q-learning 收敛到了次优策略`],
  `L7 p63–p64：最优每幕回报是 −13（贴着悬崖走），但学习过程中行为策略是 ε-greedy，会以 ε 的概率误动作掉下悬崖（大负奖励）。<br><b>SARSA</b> 的目标用实际 A′，因此把这些探索性失误「算进」Q 值，学到沿上方安全路径走（回报略差但期望更好）；<b>Q-learning</b> 的目标用 max，学的是<b>最优贪心策略</b>的价值，却在评估时仍按 ε-greedy 行动，于是频繁掉崖，在线平均回报更差。<br>结论一句话：<b>on-policy 学到「带探索时的最优」，off-policy 学到「真正的最优」</b>；评估时若关掉探索，Q-learning 才会胜出。D 错：Q-learning 确实收敛到 q*。`,
  `SARSA 更保守（把探索风险计入价值）；Q-learning 更激进（学最优但在线吃亏）。`, undefined);

S(`For off-policy Monte Carlo evaluation, how is the importance-sampling ratio of a trajectory defined?`,
  [`$\\sum _t π(A_t|S_t) / μ(A_t|S_t)$`,`$Π_t π(A_t|S_t) / μ(A_t|S_t)$`,`π(a|s) - μ(a|s)`,`$γ^{T-1}$`], 1,
  `异策略蒙特卡洛评估中，一条轨迹的重要性采样比率如何定义？`,
  [`$\\sum _{t} π(A_{t}|S_{t}) / μ(A_{t}|S_{t})$`,`Π<sub>t</sub> π(A<sub>t</sub>|S<sub>t</sub>) / μ(A<sub>t</sub>|S<sub>t</sub>)`,`π(a|s) − μ(a|s)`,`γ<sup>T−1</sup>`],
  `L7 p47–p49：由测度变换（change of measure），目标策略 π 下轨迹的概率与行为策略 μ 下轨迹的概率之比是各步条件概率之比的<b>连乘</b>：$$ρ_{t:T-1} = Π_{k=t}^{T-1} π(A_{k}|S_{k}) / μ(A_{k}|S_{k})$$。<br>用它加权的回报 ρG<sub>t</sub> 在 π 下无偏（ordinary IS），但方差可能爆炸（p51：若 μ 很小，ρ 极大）；加权重要性采样用 ΣρG / Σρ 降低方差但引入偏差。还要求 <b>coverage</b>：π(a|s)&gt;0 时必须有 μ(a|s)&gt;0，否则比率无定义。`,
  `比率是连乘不是连加；coverage 条件：π&gt;0 ⇒ μ&gt;0。`, undefined);

N(`A behaviour policy μ selects action a with probability 0.2 in both s1 and s2; the target policy π selects a with probability 0.8 in both. For a two-step trajectory (s1,a), (s2,a), compute the importance-sampling ratio ρ. (Enter a number.)`,
  16,
  `行为策略 μ 在 s1、s2 两个状态选动作 a 的概率都是 0.2；目标策略 π 在两个状态选 a 的概率都是 0.8。对两步轨迹 (s1,a)、(s2,a)，计算重要性采样比率 ρ。（输入数值）`,
  `每一步的比率：π(a|s)/μ(a|s) = 0.8/0.2 = 4。<br>两步连乘：ρ = 4 × 4 = <b>16</b>。<br><b>危险信号</b>：轨迹越长、π 与 μ 差异越大，ρ 会呈指数级放大或塌缩到 0，这正是 L7 p51 说的「unstable in variance, can blow up」。因此 off-policy MC 通常需要加权重要性采样，或者改用<b>异策略 TD</b>——后者的比率只需一步（p53–p54）。`,
  `ρ 连乘 → 长轨迹方差爆炸；异策略 TD 只需一步比率。`, undefined, 0.005);

S(`Why does off-policy TD have much lower variance than off-policy Monte Carlo with importance sampling?`,
  [`Because it uses complete returns`,`Because its target depends on a single-step transition, so only one importance ratio is needed and the two policies need only be similar over one step`,`Because it uses a target network`,`Because it sets γ = 0`], 1,
  `为什么带重要性采样的异策略 TD 的方差远低于异策略 MC？`,
  [`因为它使用完整回报`,`因为它的目标只依赖一步转移，只需一个重要性比率，两个策略也只需在单步上相近`,`因为它使用了目标网络`,`因为它把 γ 设为 0`],
  `L7 p52–p54：异策略 TD 的目标 $R_{t+1} + γV(S_{t+1})$ 只涉及<b>一步</b>转移，因此测度变换只需一个 $π(A_{t}|S_{t})/μ(A_{t}|S_{t})$ 因子；而 MC 要对整条剩余轨迹连乘 T−t 个因子，方差随长度指数放大。<br>课件 p54 原话：「<b>Policy only need to be similar over a single step</b>」——这大幅放松了 coverage 要求。DQN 更彻底：因为目标用 max，连单步比率都不需要。`,
  `一步目标 → 一个比率 → 低方差。`, undefined);

M(`Which statements about SARSA and Q-learning are correct?`,
  [`SARSA is on-policy: its target uses the next action A' actually sampled from the behaviour policy`,`Q-learning is off-policy: its target uses max_a Q(S',a)`,`Q-learning needs an importance-sampling ratio because the behaviour policy is ε-greedy`,`With a greedy target policy and an ε-greedy behaviour policy, Q-learning converges to q* under standard conditions`], [0,1,3],
  `关于 SARSA 与 Q-learning，哪些说法正确？`,
  [`SARSA 是同策略：目标使用由行为策略实际采出的下一动作 A′`,`Q-learning 是异策略：目标使用 max<sub>a</sub> Q(S′,a)`,`由于行为策略是 ε-greedy，Q-learning 需要重要性采样比率`,`目标策略贪心、行为策略 ε-greedy 时，Q-learning 在标准条件下收敛到 q*`],
  `① ✓：L7 p34–p36，SARSA 的五元组 (S,A,R,S′,A′) 中的 A′ 来自 ε-greedy。<br>② ✓：L7 p59–p60，目标策略 π 是贪心，行为策略 μ 是 ε-greedy，目标化简为 R+γmax<sub>a</sub>Q(S′,a)。<br>③ ✗：因为目标里是 <b>max</b> 而不是对 μ 求期望，p57 明确写「No change of measure is required (importance sampling)」。这是高频考点。<br>④ ✓：p62 的收敛定理。<br><b>对照</b>：SARSA 的收敛还要求 GLIE（探索逐渐衰减到贪心）；Q-learning 因为异策略，可以永久保持 ε-greedy 探索仍收敛到最优。`,
  `max 目标 ⇒ Q-learning 免重要性采样；SARSA 需 GLIE 才收敛。`, undefined);

S(`Which statement best summarises the DP versus TD comparison in the lectures?`,
  [`Both sample and neither bootstraps`,`Both bootstrap; DP requires a model and performs full-width backups, whereas TD learns from sampled transitions without a model`,`TD requires a model but DP does not`,`Neither method uses a value function`], 1,
  `哪一項最好地概括了课件中 DP 与 TD 的比较？`,
  [`两者都采样、都不自举`,`两者都自举；DP 需要模型并做 full-width 备份，TD 则从采样转移中学习、无需模型`,`TD 需要模型而 DP 不需要`,`两者都不使用价值函数`],
  `L6 p42–p43、L7 p65、L5 p60–p61：<b>DP backup</b> = E<sub>π</sub>[R+γV(S′)]，用模型对所有后继求期望（full-width、不采样、自举）；<b>TD backup</b> = R+γV(S′) 的单次采样（sample、自举、免模型）。<br>因此二者<b>都自举</b>（用 V 的估计更新 V），区别在「是否采样 / 是否需要模型」。TD 用一次采样换取与状态数无关的计算量，是免模型与函数近似的基石；代价是引入采样方差。`,
  `DP 与 TD 都自举；差别是 full-width vs sample、有模型 vs 免模型。`, undefined);

S(`Which expression is the n-step Sarsa return q_t^(n) used in the lectures?`,
  [`R_{t+1} + γR_{t+2} + … + γ^{n-1}R_{t+n} + γ^n max_a Q(S_{t+n},a)`,`$R_{t+1} + γR_{t+2} + \\cdots + γ^{n-1}R_{t+n} + γ^n Q(S_{t+n},A_{t+n})$`,`$R_{t+1} + γR_{t+2} + \\cdots + γ^{n-1}R_{t+n} + γ^n V(S_{t+n})$`,`$\\sum _{k=0}^{T-1} γ^k R_{t+k+1}$`], 1,
  `课件中 n 步 Sarsa 的回报 q<sub>t</sub><sup>(n)</sup> 是？`,
  [`… + γ<sup>n</sup> max<sub>a</sub> Q(S<sub>t+n</sub>,a)`,`… + γ<sup>n</sup> Q(S<sub>t+n</sub>, A<sub>t+n</sub>)`,`… + γ<sup>n</sup> V(S<sub>t+n</sub>)`,`$\\sum _{k=0}^{T-1}γ^{k}R_{t+k+1}$`],
  `L7 p40：与 n 步 TD 预测（自举项是 V）不同，n 步 Sarsa 的自举项是<b>实际采样的状态-动作对</b> $Q(S_{t+n}, A_{t+n})$，因为它保持同策略（on-policy）。n=1 就是一步 SARSA；n→∞ 就是 MC 回报。<br>p41–p43 的 Sarsa(λ) 同样用前向视图的 q<sup>λ</sup> 回报与后向视图的资格迹，但资格迹定义在<b>状态-动作对</b>上：$E_{t}(s,a) = γλE_{t-1}(s,a) + 1(S_{t}=s, A_{t}=a)$，TD 误差 δ<sub>t</sub> = R+γQ(S′,A′) − Q(S,A)。`,
  `n 步 Sarsa 自举 Q(S′,A′)，不是 max 也不是 V。`, undefined);

/* ==================================================================== */
/* CHAPTER 7 — Value Function Approximation (L8)                          */
/* ==================================================================== */
CH(7, 'L8 Value Function Approximation');

S(`Why is value function approximation (VFA) introduced in the lectures?`,
  [`With enormous or continuous state spaces a lookup table needs too much memory and learns each state too slowly; VFA stores only a parameter vector w and generalises to unseen states`,`Because tabular values are always biased`,`Because the MDP dynamics are always known`,`Because it removes the need for a policy`], 0,
  `课件为什么要引入价值函数近似（VFA）？`,
  [`状态空间巨大或连续时，查表法存储开销太大、逐状态学习太慢；VFA 只存参数 w 并能泛化到未见过的状态`,`因为表格型价值总是有偏的`,`因为 MDP 动态总是已知的`,`因为它不再需要策略`],
  `L8 p7–p13：列举的状态规模包括西洋双陆棋 10²⁰、围棋 10¹⁷⁰、直升机（连续）。查表法有两个致命问题：<b>too much storage in memory</b>、<b>too slow to learn individually</b>。VFA 用 $v̂(s,w) \\approx v_{π}(s)$ 或 $q̂(s,a,w) \\approx q_{π}(s,a)$，好处有三：① 只需存 w（更少内存）；② 计算代价更低；③ 从见过的状态<b>泛化</b>到没见过的状态，所需经验更少。<br>参数 w 仍用 MC 或 TD 学习更新，所以它不改变 RL 的算法框架，只把「表」换成「可微函数」。`,
  `VFA 三大好处：省内存、省计算、能泛化。`, undefined);

S(`For a linear value function approximator, the estimate is written as`,
  [`$v̂(s,w) = x(s)^T w$`,`$v̂(s,w) = \\max _a q(s,a)$`,`$v̂(s,w) = w^T P w$`,`$v̂(s,w) = \\sum _{s'} p(s'|s) r(s')$`], 0,
  `线性价值函数近似器的估计写作`,
  [`$v̂(s,w) = x(s)^{T}w$`,`$v̂(s,w) = \\max _{a} q(s,a)$`,`$v̂(s,w) = w^{T}Pw$`,`$v̂(s,w) = \\sum _{s'} p(s'|s) r(s')$`],
  `L8 p24：先用特征向量 $x(s)$ 表示状态，再用特征的线性组合表示价值：$$v̂(s,w) = x(s)^{T}w = \\sum_{j} x_{j}(s) w_{j}$$。课件 p25 给的特征例子：21 点用（玩家点数和、庄家明牌、是否有可用 A）；自动驾驶用（到中线距离、到前车距离等）。<br>因为 J(w) = E[(v<sub>π</sub> − x(s)<sup>T</sup>w)²] 关于 w 是<b>二次凸函数</b>，SGD 收敛到全局最优（p27）——这是线性近似最重要的理论性质。非线性模型（神经网络）表达能力更强但没有这个保证（p39）。`,
  `线性 VFA：特征 x(s) + 权重 w；MSE 是凸的 → SGD 全局收敛。`, undefined);

S(`For linear v̂(s,w) = x(s)^T w and a squared-error objective with a target u, which is the SGD update?`,
  [`$Δw = α [u - v̂(s,w)] x(s)$`,`$Δw = α [v̂(s,w) - u] x(s)$`,`$Δw = α u w$`,`$Δw = -α x(s)$`], 0,
  `对线性 v̂(s,w) = x(s)<sup>T</sup>w 与以 u 为目标的平方误差目标函数，SGD 更新是？`,
  [`$Δw = α[u - v̂(s,w)] x(s)$`,`$Δw = α[v̂(s,w) - u] x(s)$`,`$Δw = α u w$`,`$Δw = -α x(s)$`],
  `L8 p17、p22–p26：目标 $J(w) = E_{π}[(v_{π}(s) - v̂(s,w))^2]$，梯度下降方向 $Δw = -½α\\nabla_{w}J(w) = α E[(v_{π} - v̂) x(s)]$；SGD 去掉期望、把未知真值 v<sub>π</sub> 换成采样目标 u：$$Δw = α [u - v̂(s,w)] x(s)$$。<br>符号检查：若 u &gt; v̂（实际比预测好），Δw 与 x(s) 同向，使 v̂ 增大 ✓。B 号写反会让价值朝反方向跑。<br>课件 p30 列出三种目标：MC 用 u = G<sub>t</sub>；TD(0) 用 u = R<sub>t+1</sub> + γv̂(S<sub>t+1</sub>,w)；TD(λ) 用 u = G<sub>t</sub><sup>λ</sup>。`,
  `Δw = α(u − v̂)∇<sub>w</sub>v̂；线性时 ∇<sub>w</sub>v̂ = x(s)。`, undefined);

N(`A linear approximator has w = (1, 2) and feature vector x(s) = (1, 0.5). One Monte Carlo target G_t = 3 is observed and α = 0.1. Compute the updated first component w_1 using Δw = α[G_t - v̂(s,w)] x(s). (Enter a number.)`,
  1.1,
  `线性近似器 w = (1, 2)，特征向量 x(s) = (1, 0.5)。观测到一个 MC 目标 G<sub>t</sub> = 3，α = 0.1。按 Δw = α[G<sub>t</sub> − v̂(s,w)]x(s) 计算更新后的第一个分量 w<sub>1</sub>。（输入数值）`,
  `① 当前预测：v̂ = x(s)<sup>T</sup>w = 1×1 + 0.5×2 = 1 + 1 = 2。<br>② 误差：G<sub>t</sub> − v̂ = 3 − 2 = 1。<br>③ Δw = 0.1 × 1 × (1, 0.5) = (0.1, 0.05)。<br>④ w′ = (1.1, 2.05)，所以 <b>w<sub>1</sub> = 1.1</b>。<br><b>验证</b>：更新后 v̂′ = 1×1.1 + 0.5×2.05 = 1.1 + 1.025 = 2.125，确实朝目标 3 靠近了（从 2 → 2.125）。<br><b>注意</b>：Δw 与特征向量 x(s) 成正比，因此只有<b>被激活的特征</b>对应的权重会变——这正是泛化与干扰并存的根源。`,
  `先算 v̂=x<sup>T</sup>w，再用 (u−v̂)x 更新全部特征权重。`, undefined, 0.005);

S(`Which pair correctly lists the MC and TD(0) targets used for prediction with VFA?`,
  [`$MC: R_{t+1} + γv̂(S_{t+1},w); TD: G_t$`,`$MC: G_t; TD(0): R_{t+1} + γv̂(S_{t+1},w)$`,`Both use the true v_π(s), which is provided by an oracle`,`Both require the transition model p(s'|s,a)`], 1,
  `使用 VFA 做预测时，MC 与 TD(0) 的目标分别是？`,
  [`MC：R<sub>t+1</sub> + γv̂(S<sub>t+1</sub>,w)；TD：G<sub>t</sub>`,`MC：G<sub>t</sub>；TD(0)：R<sub>t+1</sub> + γv̂(S<sub>t+1</sub>,w)`,`两者都用由 oracle 提供的真实 v<sub>π</sub>(s)`,`两者都需要转移模型 p(s′|s,a)`],
  `L8 p30：真实 v<sub>π</sub>(s) 是 <b>unknown oracle</b>，必须用可观测的目标替代：<br>• MC 目标 $G_{t}$（每幕结束后更新 w）；<br>• TD(0) 目标 $R_{t+1} + γv̂(S_{t+1}, w)$（每个时间步更新 w）；<br>• TD(λ) 目标 $G_{t}^{λ}$。<br>p31–p32 给出对应更新：Δw = α(G<sub>t</sub> − v̂(S<sub>t</sub>,w))∇<sub>w</sub>v̂，以及 Δw = α(R<sub>t+1</sub> + γv̂(S<sub>t+1</sub>,w) − v̂(S<sub>t</sub>,w))∇<sub>w</sub>v̂。C 错在「oracle 已知」——若已知就不需要学习了；D 错在两者都是免模型。`,
  `MC 目标 G<sub>t</sub>；TD 目标 R+γv̂(S′,w)；真值 v<sub>π</sub> 不可得。`, undefined);

S(`Why is TD with function approximation called a "semi-gradient" method?`,
  [`Because the TD target itself depends on w, but its derivative with respect to w is ignored in the update`,`Because α is always halved`,`Because only half of the sampled transitions are used`,`Because feature vectors are binary`], 0,
  `为什么带函数近似的 TD 被称为「半梯度（semi-gradient）」方法？`,
  [`因为 TD 目标本身依赖 w，但更新时忽略了目标对 w 的导数`,`因为 α 总是减半`,`因为只使用一半的采样转移`,`因为特征向量是二值的`],
  `TD 目标 $R_{t+1} + γv̂(S_{t+1},w)$ 里含有 <b>w</b>。若对 $(target - v̂(S_{t},w))^2$ 严格求梯度，应同时出现 v̂(S<sub>t+1</sub>,w) 对 w 的导数项；半梯度 TD 把目标当作常数（stop-gradient），只保留 $-\\nabla_{w}v̂(S_{t},w)$，得到 Δw = αδ∇<sub>w</sub>v̂。<br><b>为什么可以这样做</b>：自举目标是「移动的目标」，把它的导数算进来会破坏收敛性；忽略后，线性情形下半梯度 TD 仍收敛（收敛到略偏离 v<sub>π</sub> 的投影不动点）。<br>延伸：<b>函数近似 + 自举 + 异策略</b>三者同时出现时可能发散（deadly triad），DQN 用经验回放 + 目标网络来缓解。`,
  `自举目标依赖 w 但不求导 = 半梯度；DQN 中 target network 就是这个思想的工程化。`, undefined);

S(`For action-value approximation q̂(s,a,w) = x(s,a)^T w, which target is used by on-policy SARSA control?`,
  [`$R_{t+1} + γ \\max _a q̂(S_{t+1},a,w)$`,`$R_{t+1} + γ q̂(S_{t+1},A_{t+1},w)$`,`The full return G_t`,`r(s,a) alone`], 1,
  `对动作价值近似 q̂(s,a,w) = x(s,a)<sup>T</sup>w，同策略 SARSA 控制使用的目标是？`,
  [`R<sub>t+1</sub> + γ max<sub>a</sub> q̂(S<sub>t+1</sub>,a,w)`,`R<sub>t+1</sub> + γ q̂(S<sub>t+1</sub>, A<sub>t+1</sub>, w)`,`完整回报 G<sub>t</sub>`,`仅 r(s,a)`],
  `L8 p33–p38：控制 = 策略评估（拟合 q̂）+ ε-greedy 策略改进。可用的目标有：<b>MC 目标 G<sub>t</sub></b>、<b>SARSA 目标 R<sub>t+1</sub> + γq̂(S<sub>t+1</sub>,A<sub>t+1</sub>,w)</b>。更新为 $Δw = α[target - q̂(S_{t},A_{t},w)] x(S_{t},A_{t})$。<br>因为 SARSA 是 on-policy，自举项必须用实际采到的 A<sub>t+1</sub>；A 选项的 max 是 Q-learning（异策略）目标，在函数近似 + 自举下更易不稳定。课件 p39 总结：SGD 简单但样本效率不高，线性特征组合适合简单问题，复杂问题需要 DNN——直接引出 L9 的 DQN。`,
  `线性 SARSA：Δw = α(R + γq̂(S′,A′) − q̂(S,A)) x(s,a)。`, undefined);

S(`Which of the following correctly describes the Mountain Car example in the lectures?`,
  [`State = (position, velocity); three throttle actions (-1, 0, +1); reward = -1 until the goal is reached`,`State = raw 84×84 pixels; 18 Atari joystick actions; reward clipped to {-1,0,+1}`,`State = one-hot over 1000 tiles; continuous torque; +1 for every step`,`State = position only; two actions; +1 when the goal is reached`], 0,
  `课件中的 Mountain Car 例子，哪项描述正确？`,
  [`状态 =（位置, 速度）；三个油门动作（−1, 0, +1）；到达目标前每步奖励 −1`,`状态 = 原始 84×84 像素；18 个 Atari 摇杆动作；奖励裁剪为 {−1,0,+1}`,`状态 = 1000 个 tile 的 one-hot；连续力矩；每步 +1`,`状态 = 只有位置；两个动作；到达目标时 +1`],
  `L8 p40–p44：Mountain Car 的状态是二维连续量 <b>(position x<sub>t</sub>, velocity v<sub>t</sub>)</b>；动作集合为 <b>{−1, 0, +1}</b>（全油门后退 / 不踩 / 全油门前进）；奖励是「未到目标时 R<sub>t</sub> = −1，到目标给 +1（或终止）」，所以要通过先倒车蓄势再冲上坡。动力学会写为 $v_{t+1} = v_{t} + 0.001A_{t} - 0.0025cos(3x_{t})$，并对位置、速度做裁剪。<br>因为状态连续、无法查表，课件 p45–p48 用 <b>coarse coding / tile coding</b> 与 <b>RBF 核</b>构造特征，再用线性 SARSA 求解（p50–p51 给出学习曲线）。B 是 Atari/DQN 的设置。`,
  `Mountain Car = 2D 连续状态 + 3 个离散动作 + 每步 −1；需要 tile coding / RBF。`, undefined);

N(`In tile coding with 4 offset tilings of a two-dimensional state space, each tiling being a 4×4 grid, how many features are active for any single state? (Enter an integer.)`,
  4,
  `二维状态空间上使用 4 个相互偏移的 tiling，每个 tiling 是 4×4 网格。对任意一个状态，有多少个特征是激活的？（输入整数）`,
  `Sutton 教材 9.5.4（课件 L8 p47 引用）：状态在<b>每一个</b> tiling 中恰好落入一个 tile，因此激活特征数恒等于 <b>tiling 的个数 = 4</b>。<br>总特征数 = 4 个 tiling × 每个 4×4=16 个 tile = <b>64</b> 个分量，其中恰好 4 个为 1、其余为 0。<br><b>为什么用多个偏移 tiling</b>：单个 tiling 只是状态聚合（同一 tile 内完全泛化、tile 之间完全不泛化），多个重叠的感受野才实现 coarse coding，让相邻状态有部分共享特征。<br>实用优点：任意状态激活特征数恒定，因此步长可直观取 $α = 1/n$（n = tiling 数）。`,
  `激活数 = tiling 数；总特征数 = tiling 数 × 每个 tiling 的 tile 数。`, 'L8 · Sutton & Barto 9.5.4 Tile Coding', 0.5);

S(`The lectures/textbook note that, because exactly one feature is active per tiling in tile coding, a natural choice for the step-size parameter is`,
  [`α = 1/n, where n is the number of tilings`,`$α = n$`,`$α = 1/|S|$`,`$α = γ$`], 0,
  `课件 / 教材指出：由于 tile coding 中每个 tiling 恰有一个特征激活，步长参数的自然取法是`,
  [`α = 1/n，n 为 tiling 的个数`,`$α = n$`,`$α = 1/|S|$`,`$α = γ$`],
  `课件 L8 p47 引自 Sutton & Barto 9.5.4：「Exactly one feature is present in each tiling, so the total number of features present is always the same as the number of tilings. This allows the step-size parameter α to be set in an easy, intuitive way. For example, choosing <b>α = 1/n</b>, where n is the number of tilings」。<br>直觉：一次更新对 n 个激活特征同时加 Δ，若把 Δ 除以 n，则总改变量与 n 无关，学习速度不会随 tiling 数量放大而失控。`,
  `α = 1/激活特征数；tile coding 中即 1/n。`, undefined);

S(`A tabular lookup-table value function can be viewed as a special case of linear VFA where`,
  [`x(s) is a one-hot vector with one component per state, so v̂(s,w) = w_s with no generalisation between states`,`w is a matrix of transition probabilities`,`features are radial basis functions with wide bandwidth`,`the gradient is computed only once`], 0,
  `查表型价值函数可以看作线性 VFA 的特例，此时`,
  [`x(s) 是 one-hot 向量（每个状态一个分量），于是 v̂(s,w) = w<sub>s</sub>，状态之间不泛化`,`w 是转移概率矩阵`,`特征是具有宽带宽的径向基函数`,`梯度只计算一次`],
  `L8 p28：若把每个状态编码成 one-hot 特征 $x(s) = (0,\\cdots,1,\\cdots,0)$，则 $v̂(s,w) = x(s)^{T}w = w_{s}$，与查表完全等价，且 Δw = α(u − v̂)x(s) 只更新被访问状态的那一个分量——<b>不同状态之间没有任何泛化</b>。<br>这解释了 VFA 的本质：泛化程度由<b>特征重叠</b>决定。one-hot 无重叠（表格）；tile coding / RBF / 神经网络有重叠（泛化），但也带来状态之间的干扰（interference）。`,
  `one-hot 特征 = 查表；特征重叠 = 泛化（也带来干扰）。`, undefined);

S(`Which combination is known as the "deadly triad" that can cause TD control to diverge?`,
  [`Function approximation + bootstrapping + off-policy training`,`Large replay memory + target network + reward clipping`,`Large γ + small α + deterministic policy`,`First-visit MC + every-visit MC + importance sampling`], 0,
  `被称为「致命三要素（deadly triad）」、可能导致 TD 控制发散的组合是？`,
  [`函数近似 + 自举 + 异策略训练`,`大容量经验回放 + 目标网络 + 奖励裁剪`,`大 γ + 小 α + 确定性策略`,`首次访问 MC + 每次访问 MC + 重要性采样`],
  `补充知识（Sutton & Barto Ch.11，用于理解 L8→L9 的动机）：当<b>函数近似</b>（外推误差）、<b>自举</b>（用带误差的估计构造目标）、<b>异策略</b>（数据分布与目标策略不一致）三者同时存在时，价值估计可能无界发散。<br>课程中的对应关系：L8 p39 指出 SGD + 非线性模型（DNN）是必然趋势；L9 的 Nature DQN 用<b>经验回放</b>（打破数据相关性、平滑行为分布）与<b>冻结的目标网络</b>（延迟自举目标的更新）两大手段把训练稳定下来；L10a 的 Double DQN 进一步处理 max 带来的过高估计。<br>注意 B 是解决方案而不是问题本身。`,
  `FA + bootstrapping + off-policy = 发散风险；回放 + 目标网络 = 稳定化。`, 'Supplementary · Sutton & Barto Ch.11 (deadly triad)');

M(`Which statements about value function approximation are correct?`,
  [`VFA reduces memory and computation because only the parameter vector w is stored`,`VFA generalises from states already seen to unseen states`,`Differentiable models (linear feature combinations, neural networks) are favoured so that GD / SGD can be used`,`With VFA the true v_π(s) is supplied by an oracle and used directly as the regression target`], [0,1,2],
  `关于价值函数近似，哪些说法正确？`,
  [`VFA 只需存参数向量 w，因而降低内存与计算开销`,`VFA 能从见过的状态泛化到未见过的状态`,`偏好可微模型（特征的线性组合、神经网络），以便使用 GD / SGD`,`使用 VFA 时，真实 v<sub>π</sub>(s) 由 oracle 提供并直接作为回归目标`],
  `① ✓ L8 p13：only w is stored，减少内存、计算与所需经验。<br>② ✓ L8 p11：generalise from seen states to unseen ones，是 VFA 相对查表法的核心优势。<br>③ ✓ L8 p16：课程聚焦「对 w 可微」的模型（线性特征组合、神经网络），因为要用 GD / SGD / Adam 等高效、可扩展、适合非平稳非 i.i.d. 数据的训练方法。<br>④ ✗ L8 p30 明确写「An oracle ... is unknown」：真实 v<sub>π</sub> 未知，必须用 MC / TD / TD(λ) 的目标替代。若真有 oracle，就退化成普通监督学习，不需要 RL 了。`,
  `VFA 的目标必须来自采样回报 / 自举，不可能是真值。`, undefined);

/* ==================================================================== */
/* CHAPTER 8 — Nature DQN 2015 (L9)                                       */
/* ==================================================================== */
CH(8, 'L9 Nature DQN 2015');

S(`Why does DQN stack several recent frames into one state instead of using a single frame?`,
  [`A single frame cannot reveal motion (e.g. the direction of the ball), so stacking frames makes the state approximately Markov`,`Stacking frames increases the number of available actions`,`It removes the need for a discount factor`,`It turns the Q-network into a recurrent network`], 0,
  `为什么 DQN 要把最近若干帧堆叠成一个状态，而不是只用单帧？`,
  [`单帧无法体现运动信息（例如球的运动方向），堆叠多帧才能让状态近似满足马尔可夫性`,`堆叠帧可以增加可选动作的数量`,`这样就不再需要折扣因子`,`它把 Q 网络变成了循环网络`],
  `两层原因：<br>① <b>消除闪烁</b>：Atari 2600 同屏 sprite 数量有限，部分物体只在奇数帧或偶数帧出现，论文因此对相邻两帧逐像素取最大值，再取亮度通道并缩放；<br>② <b>恢复马尔可夫性</b>：单张画面看不出球往哪个方向飞，也就是「未来不能只由当前状态决定」（L3 p12、L4 p9），属于部分可观测。把最近几帧叠在一起就带上了速度信息，状态才近似是信息状态。<br>因此帧堆叠不是为了增加动作、也不是为了替代折扣因子；它属于<b>状态表示</b>的设计，与网络是否循环无关。论文也说明具体堆叠帧数取 3 或 5 影响不大，重点是要包含时间信息。`,
  `单帧不 Markov（看不出速度）→ 叠帧；顺带用逐像素 max 消除闪烁。`, undefined);

N(`The first hidden layer of the DQN convolves 32 filters of size 8×8 with stride 4 (no padding) over an 84×84 input. What is the spatial width (equal to height) of the resulting feature map? (Enter an integer.)`,
  20,
  `DQN 第一个隐藏层在 84×84 输入上以步长 4 卷积 32 个 8×8 滤波器（无 padding）。输出特征图的空间宽度（等于高度）是多少？（输入整数）`,
  `无 padding 卷积输出尺寸公式：$$\\lfloor(W - F)/S\\rfloor + 1 = \\lfloor(84 - 8)/4\\rfloor + 1 = 19 + 1 = 20$$，所以第一层输出 <b>20×20×32</b>。<br>后续结构（论文 Methods「Model architecture」）：<br>• 第二层：64 个 4×4、stride 2 → (20−4)/2+1 = <b>9</b>，输出 9×9×64；<br>• 第三层：64 个 3×3、stride 1 → <b>7</b>，输出 7×7×64 = 3136；<br>• 全连接 512 个 ReLU 单元；<br>• 输出层：每个有效动作一个线性输出（各游戏 4～18 个动作）。<br>这类「给定输入 / 滤波器 / 步长求尺寸」是深度学习部分最常见的计算题。`,
  `⌊(W−F)/S⌋+1；DQN 卷积链 84→20→9→7。`, undefined, 0.5);

S(`Why did the DQN authors use a network with a separate output unit for each action?`,
  [`It computes Q-values for all possible actions in a single forward pass`,`It requires a separate forward pass for each action, with its own convolutional filters`,`It makes the network recurrent`,`It is required for reward clipping`], 0,
  `DQN 作者为什么采用「每个动作一个输出单元」的网络结构？`,
  [`一次前向传播即可算出所有动作的 Q 值`,`每个动作都要单独做一次前向传播，并各自拥有独立的卷积滤波器`,`使网络变成循环结构`,`这是奖励裁剪所必需的`],
  `论文 Methods「Model architecture」：另一种做法是把 <b>(history, action)</b> 一起作为输入、输出一个标量 Q，缺点是要为每个动作单独做一次前向传播，代价随动作数 |A| 线性增长。DQN 改为「只输入状态表示、输出层为每个动作一个单元」，<b>一次前向即可得到所有动作的 Q 值</b>——这对需要 max<sub>a</sub> 的 Q-learning 目标与 ε-greedy 选动作都极其高效。<br>注意：这个设计是「动作各自一个输出头」，而 <b>Dueling DQN</b>（L10c）是进一步把它拆成 V 流 + A 流，两者不要混淆。`,
  `多头输出 → 一次前向得到全部 Q(s,·)；便于 max 与 argmax。`, undefined);

S(`Which is NOT one of the three advantages of experience replay listed in the Nature DQN paper?`,
  [`Each step of experience can be used in many weight updates, improving data efficiency`,`Randomising the samples breaks strong correlations between consecutive samples and reduces the variance of updates`,`Averaging the behaviour distribution over many previous states smooths learning and avoids oscillations or divergence`,`It eliminates the need for a separate target network`], 3,
  `下列哪一项不是 Nature DQN 论文列出的经验回放三大优点？`,
  [`每一步经验可被用于多次权重更新，提升数据效率`,`随机采样打破相邻样本间的强相关性，降低更新方差`,`把行为分布对许多历史状态取平均，平滑学习过程、避免震荡或发散`,`它消除了对独立目标网络的需求`],
  `论文 Methods 明确列出三点：① <b>greater data efficiency</b>（每个转移可重复用于多次更新）；② <b>breaks correlations</b> → 降低更新方差；③ <b>smoothing out learning</b>：避免「当前参数决定下一批训练数据」的反馈回路（若贪心动作从左变右，训练分布也跟着突变，可能陷入差的局部极小甚至灾难性发散）。<br>目标网络是论文紧接着提出的<b>第二项独立改进</b>——「The second modification to online Q-learning ... is to use a separate network for generating the targets」，因此 D 不是经验回放的优点。<br>此外论文还指出：使用回放就必须<b>异策略学习</b>（存储样本由旧参数生成），这正是选择 Q-learning 的原因。`,
  `回放三优点：数据效率 / 打破相关 / 平滑分布；目标网络是另一项改进。`, undefined);

S(`How is the target network used in the 2015 DQN algorithm?`,
  [`It is updated by SGD on every minibatch alongside the online network`,`Every C updates the online network Q is cloned into Q̂, and Q̂ generates the Q-learning targets for the following C updates`,`It selects actions while the online network evaluates them`,`It is a separate value network V(s) used for the baseline`], 1,
  `2015 年 DQN 算法中目标网络如何使用？`,
  [`它与在线网络一起在每个 minibatch 上用 SGD 更新`,`每 C 次更新把在线网络 Q 克隆为 Q̂，随后 C 次更新中的 Q-learning 目标由 Q̂ 产生`,`它负责选动作，在线网络负责评估`,`它是用作基线的独立价值网络 V(s)`],
  `论文 Methods：每隔 <b>C 次更新</b>，把 Q 的参数复制给 $Q̂$，并在接下来 C 次更新中用 Q̂ 计算目标 $y_{j} = r_{j} + γ \\max_{a'}Q̂(s',a';θ^{-})$。<br><b>为什么能稳定</b>：标准在线 Q-learning 中，提升 Q(s,a) 往往同时提升 Q(s′,a) 与目标 y，形成自激反馈导致震荡/发散；用<b>较旧的参数</b>产生目标，就在「更新 Q」与「目标变化」之间插入了延迟。<br>注意区分：<b>Double DQN</b>（L10a）用在线网络<b>选</b>动作、目标网络<b>评估</b>，与本题的普通 DQN 不同。`,
  `目标网络 = 周期性冻结的 Q 副本；断开自举反馈回路。`, undefined);

S(`Why does the Nature DQN paper clip all positive rewards to +1, all negative rewards to -1, and leave zero unchanged?`,
  [`To limit the scale of error derivatives so that the same learning rate can be used across games; the cost is that the agent can no longer distinguish reward magnitudes`,`To make the return unbiased`,`To remove the need for a discount factor`,`To convert the problem into a continuing task`], 0,
  `Nature DQN 论文为什么把所有正奖励裁剪为 +1、负奖励裁剪为 −1、零保持不变？`,
  [`限制误差导数的尺度，使同一学习率可跨游戏通用；代价是智能体再也无法区分奖励的大小`,`为了让回报无偏`,`为了不再需要折扣因子`,`为了把问题变成持续性任务`],
  `论文 Training details：不同 Atari 游戏的分数尺度差异极大，裁剪到 <b>{−1, 0, +1}</b> 后「limits the scale of the error derivatives and makes it easier to use the same learning rate across multiple games」。这也支撑了「同一套超参数跑 49 款游戏」的结论。<br>但论文紧接着写明副作用：<b>「it could affect the performance of our agent since it cannot differentiate between rewards of different magnitude」</b>——例如得分 1 分与 100 分被同等对待。<br>注意与<b>误差裁剪</b>区分：论文还把 TD 误差项裁剪到 [−1,1]（等价于区间外使用绝对值损失 / Huber 形式），那是另一项独立技巧。`,
  `奖励裁剪 ≠ 误差裁剪；前者为跨游戏统一学习率，后者为稳定梯度。`, undefined);

S(`The paper also clips the TD error term to the interval [-1, 1]. What loss does this correspond to?`,
  [`An absolute-value (Huber-like) loss for errors outside (-1, 1), and a squared loss inside`,`A cross-entropy loss`,`A KL divergence between return distributions`,`A hinge loss on the advantage`], 0,
  `论文还把 TD 误差项裁剪到 [−1, 1]。这对应什么损失？`,
  [`区间 (−1, 1) 外为绝对值损失（类 Huber），区间内为平方损失`,`交叉熵损失`,`回报分布之间的 KL 散度`,`作用在优势函数上的 hinge loss`],
  `论文 Methods 末段：把更新中的误差项 $r + γ \\max Q(s',a';θ^{-}) - Q(s,a;θ)$ 裁剪到 [−1,1]。因为 |x| 的导数在负半轴为 −1、正半轴为 +1，「clipping the squared error」等价于对 |x|&gt;1 使用<b>绝对值损失</b>、对 |x|≤1 使用<b>平方损失</b>，即 Huber 损失。<br>作用：限制异常大 TD 误差带来的巨大梯度，进一步稳定训练。<br>到 Rainbow（L10d）时，分布式的 KL 损失又被用作<b>优先回放的优先级</b>，但那是另一种用法。`,
  `误差裁剪 = Huber-like：内平方、外线性。`, undefined);

N(`The DQN agent selects an action on every k = 4th emulator frame and repeats its previous action on the skipped frames. If training lasts 50 million emulator frames, how many million agent decisions are made? (Enter a number in millions, e.g. 12.5 for 12.5 million.)`,
  12.5,
  `DQN 每 k = 4 个模拟器帧才选一次动作，跳过的帧重复上一动作。若训练共 5000 万模拟器帧，智能体一共做了多少次决策？（以「百万次」为单位输入，例如 12.5 表示 1250 万次）`,
  `每个决策覆盖 k = 4 帧，所以决策数 = 50,000,000 / 4 = 12,500,000 = <b>12.5 百万</b>。<br><b>论文动机</b>：把模拟器向前推进一帧的计算量远小于让网络前向一次，因此跳帧能在几乎不增加运行时间的前提下「多玩 k 倍」。论文还说明在 60 Hz 下每 4 帧决策一次约为 15 Hz，接近人类按「开火」键的最快频率；把 k 改成 6 对归一化分数影响很小。<br><b>注意</b>：论文所说的「50 million frames」是模拟器帧，不是智能体步数；回放内存「1 million most recent frames」同样按帧计。`,
  `跳帧 k=4 → 50M 模拟器帧 = 12.5M 智能体决策。`, undefined, 0.005);

M(`Which statements about the 2015 Nature DQN are correct?`,
  [`The loss is L_i(θ_i) = E[(y_i - Q(s,a;θ_i))^2] with y_i = r + γ max_{a'} Q(s',a';θ_i^-)`,`Experience replay necessitates off-policy learning, because stored transitions were generated with older parameters`,`The target network is a periodically frozen copy of the online network`,`The state given to the network is a single 84×84 grayscale frame`], [0,1,2],
  `关于 2015 年 Nature DQN，哪些说法正确？`,
  [`损失为 L<sub>i</sub>(θ<sub>i</sub>) = E[(y<sub>i</sub> − Q(s,a;θ<sub>i</sub>))²]，其中 y<sub>i</sub> = r + γ max<sub>a′</sub> Q(s′,a′;θ<sub>i</sub><sup>−</sup>)`,`经验回放必然要求异策略学习，因为存储的转移是由较旧的参数生成的`,`目标网络是在线网络的周期性冻结副本`,`送入网络的状态是单张 84×84 灰度图`],
  `① ✓：论文 Methods 给出的 Q-learning 损失函数；θ<sub>i</sub><sup>−</sup> 是目标网络参数。<br>② ✓：原文「when learning by experience replay, it is necessary to learn off-policy (because our current parameters are different to those used to generate the sample), which motivates the choice of Q-learning」。<br>③ ✓：every C updates clone Q → Q̂。<br>④ ✗：输入是 <b>84×84×4</b>（最近 4 帧堆叠），单帧不满足马尔可夫性（看不出运动方向）。<br>顺带：DQN 的三大支柱通常概括为「卷积网络 + 经验回放 + 固定 Q 目标」，L10a 课件 p1 的 Summary 又补上 Double / Prioritized / Dueling。`,
  `DQN = Q-learning + CNN + replay + target net；输入是 4 帧堆叠。`, undefined);

S(`Why does experience replay force the use of an off-policy algorithm such as Q-learning?`,
  [`Because the current parameters differ from those that generated the stored samples`,`Because rewards are clipped to {-1, 0, +1}`,`Because the network is convolutional`,`Because γ = 0.99`], 0,
  `为什么经验回放必然要求使用 Q-learning 这类异策略算法？`,
  [`因为当前参数与生成所存样本时的参数不同`,`因为奖励被裁剪为 {−1, 0, +1}`,`因为网络是卷积网络`,`因为 γ = 0.99`],
  `论文 Methods 原话：「by using experience replay, ... it is necessary to learn off-policy (because our current parameters are different to those used to generate the sample), which motivates the choice of Q-learning」。<br>回放池里的转移来自过去很多个版本的策略，属于<b>行为策略 μ</b> 的混合；而我们要学的是关于当前 Q 的<b>贪心目标策略 π</b>。若用 SARSA 这类同策略算法，目标里的 A′ 必须来自当前策略，与旧样本不兼容。Q-learning 的目标用 max，天然不依赖行为策略，因此无需重要性采样。<br>这一逻辑也解释了 L7 p46 强调的异策略价值：「reuse experience from old policies」。`,
  `回放 = 旧策略数据 ⇒ 必须异策略；Q-learning 的 max 目标正好不依赖 μ。`, undefined);

/* ==================================================================== */
/* CHAPTER 9 — DQN improvements: Double DQN / PER / Dueling (L10a/b/c)   */
/* ==================================================================== */
CH(9, 'L10a DQN+ · L10b PER · L10c Dueling');

S(`Why does standard Q-learning systematically overestimate action values?`,
  [`Because γ is too close to 1`,`Because the max of noisy estimates is biased upward, E[max_a X_a] ≥ max_a E[X_a], and the same estimates are used to select and to evaluate the greedy action`,`Because experience replay samples transitions uniformly`,`Because rewards are clipped to {-1, 0, +1}`], 1,
  `为什么标准 Q-learning 会系统性地高估动作价值？`,
  [`因为 γ 太接近 1`,`因为噪声估计的最大值有向上偏差 E[max<sub>a</sub> X<sub>a</sub>] ≥ max<sub>a</sub> E[X<sub>a</sub>]，且「选动作」与「评估动作」用的是同一批估计`,`因为经验回放对转移均匀采样`,`因为奖励被裁剪为 {−1, 0, +1}`],
  `L10a p5：设 X<sub>n</sub> 是各动作 Q 值的含噪估计，由 Jensen 不等式 / 次序统计量可证 $E[\\max_{n} X_{n}] \\ge \\max_{n} E[X_{n}]$。Q-learning 的目标 $r + γ \\max_{a}Q(s',a)$ 用<b>同一套</b>带噪 Q 值既挑出最大动作又给出它的价值，于是噪声中的正偏差被反复「挑中」并自举放大，产生<b>overoptimistic value estimates</b>。<br>课件 p13 总结：overestimation 常见且可能很严重，会得到更差的策略；此时需要「reduce our optimism」。<br>注意 C 是 PER 要解决的问题（哪些经验更重要），D 是 DQN 的稳定化技巧，都不是过高估计的成因。`,
  `max 的选择偏差 = 过高估计的根源；解法是「选择与评估解耦」。`, undefined);

S(`Which is the Double DQN target used in the lectures?`,
  [`$y = r + γ \\max _a Q(s',a;θ^-)$`,`$y = r + γ Q(s', \\operatorname{argmax} _a Q(s',a;θ); θ^-)$`,`$y = r + γ \\max _a Q(s',a;θ)$`,`$y = r + γ Q(s',a';θ^{-})$ with $a'$ sampled ε-greedy`], 1,
  `课件中的 Double DQN 目标是？`,
  [`$y = r + γ \\max _{a} Q(s',a;θ^{-})$`,`$y = r + γ Q(s', \\operatorname{argmax} _{a} Q(s',a;θ); θ^{-})$`,`$y = r + γ \\max _{a} Q(s',a;θ)$`,`$y = r + γ Q(s',a';θ^{-})$，其中 $a'$ 由 ε-greedy 采样`],
  `L10a p10–p11：普通 DQN 目标 $Y^{DQN} = R + γ \\max_{a}Q(S',a;θ^{-})$；<b>Double DQN</b> 把两件事拆开——<b>当前（在线）网络 θ 负责选动作</b>，<b>较旧的目标网络 θ<sup>−</sup> 负责评估</b>：$$Y^{DoubleDQN} = R + γ Q(S', \\operatorname{argmax}_{a} Q(S',a;θ); θ^{-})$$。<br>这样两套噪声相互独立，正偏差不再被系统性地挑中，估计更稳定、策略更好。工程上「Easy transition from DQN」：不需要新增网络，只需把已有的目标网络复用为评估器（p9–p13）。<br>A 是普通 DQN；D 是同策略 SARSA 的思路。`,
  `Double DQN：在线网络 argmax，目标网络取值。`, undefined);

N(`Compute the Double DQN target for one transition. R = 1, γ = 0.9. At the next state the ONLINE network outputs Q(s',·;θ) = [3, 5, 2], and the TARGET network outputs Q(s',·;θ^-) = [4.5, 4, 1]. The online network selects the greedy action and the target network evaluates it. (Enter a number.)`,
  4.6,
  `计算一次转移的 Double DQN 目标。R = 1，γ = 0.9；下一状态处<b>在线网络</b>输出 Q(s′,·;θ) = [3, 5, 2]，<b>目标网络</b>输出 Q(s′,·;θ<sup>−</sup>) = [4.5, 4, 1]。在线网络选贪心动作，目标网络评估它。（输入数值）`,
  `① 在线网络选动作：argmax [3, 5, 2] = 索引 1（第二个动作，值 5）。<br>② 目标网络评估该动作：Q(s′, a<sub>1</sub>;θ<sup>−</sup>) = 4。<br>③ 目标 y = R + γ × 4 = 1 + 0.9×4 = 1 + 3.6 = <b>4.6</b>。<br><b>对照普通 DQN</b>：Y<sup>DQN</sup> = 1 + 0.9 × max[4.5, 4, 1] = 1 + 4.05 = 5.05，比 Double DQN 高 0.45——这就是被 max 挑出来的正偏差。<br><b>常见错误</b>：用在线网络的最大值 5 去算（得 5.5），那是把「选择」和「评估」又混回了同一个网络。`,
  `先 argmax(在线)，再取对应位置的目标网络值。`, undefined, 0.005);

S(`In tabular Double Q-learning, how is the decoupling of selection and evaluation achieved?`,
  [`Two estimators Q1 and Q2 are maintained; with probability 0.5 one selects the greedy action and the other evaluates it, and vice versa`,`A single estimator is updated twice per step`,`The discount factor is halved on alternate steps`,`Rewards are clipped before the max`], 0,
  `表格型 Double Q-learning 是如何实现「选择与评估解耦」的？`,
  [`维护两个估计器 Q1、Q2；以 0.5 概率用其中一个选贪心动作、另一个评估，反之亦然`,`单个估计器每步更新两次`,`折扣因子在相邻步骤间减半`,`在取 max 之前裁剪奖励`],
  `L10a p6–p9：Double Q-learning 维护两套独立的价值估计 $Q_{1}, Q_{2}$，每步随机（各 0.5 概率）决定「由 Q<sub>1</sub> 选 a* = argmax Q<sub>1</sub>、用 Q<sub>2</sub> 评估并更新 Q<sub>1</sub>」或反过来。更新式形如 $Q_{1}(S,A) \\leftarrow Q_{1} + α[R + γQ_{2}(S', \\operatorname{argmax}_{a}Q_{1}(S',a)) - Q_{1}]$。<br>因为两个估计器的噪声近似独立，max 的选择偏差被消除。<b>扩展到 DQN</b> 时不需要额外训练第二个网络：现成的<b>目标网络</b>天然就是那个「较旧、噪声不同」的评估器，于是得到 Double DQN（p9）。`,
  `表格版两套 Q 随机轮换；DQN 版直接用在线/目标网络。`, undefined);

S(`In prioritized experience replay, what is used as the priority of a transition?`,
  [`How old the transition is`,`The magnitude of its TD error |δ_i|, as a proxy for how much can be learned from it`,`The magnitude of the immediate reward r`,`How many times it has already been replayed`], 1,
  `优先经验回放（PER）中，用什么作为一个转移的优先级？`,
  [`该转移的「年龄」`,`其 TD 误差的绝对值 |δ<sub>i</sub>|，作为「能从中学会多少」的代理量`,`即时奖励 r 的大小`,`它已经被回放过的次数`],
  `L10b §3.1：TD 误差 $δ = R + γ \\max Q(S',a) - Q(S,A)$ 衡量「这一步有多令人意外」，|δ| 越大说明当前预测越不准、越有信息量。论文用 <b>Blind Cliffwalker</b> 例子证明回放顺序可以让所需更新次数呈指数级差异。<br>两种优先级定义：<b>proportional</b> $p_{i} = |δ_{i}| + ε$（ε 保证 δ=0 的样本仍有机会被采到）；<b>rank-based</b> $p_{i} = 1/rank(i)$，对离群值更鲁棒。<br>在 Rainbow 中，优先级改用<b>分布式 KL 损失</b>，被观察为更鲁棒（L10d §3）。`,
  `PER 优先级 = |TD error|（或 rank）；Rainbow 改用 KL loss。`, undefined);

S(`For proportional stochastic prioritization with P(i) = p_i^α / Σ_k p_k^α, what does α = 0 give?`,
  [`Greedy prioritization by the largest |δ|`,`Uniform sampling`,`Rank-based prioritization`,`No samples are drawn`], 1,
  `对比例型随机优先采样 P(i) = p<sub>i</sub><sup>α</sup> / Σ<sub>k</sub> p<sub>k</sub><sup>α</sup>，α = 0 会得到什么？`,
  [`按最大 |δ| 贪心优先`,`均匀采样`,`基于排序的优先采样`,`不采样`],
  `L10b §3.3：α 控制「优先程度」。α=0 时对所有 i 有 p<sub>i</sub><sup>0</sup> = 1，故 P(i) = 1/N，即<b>退化为普通 DQN 的均匀采样</b>；α=1 是完全按比例优先；α→∞ 配合 p<sub>i</sub>=|δ<sub>i</sub>| 则趋近于「总选最大 |δ|」的贪心优先化。<br>论文实验调出的取值：比例变体 <b>α=0.6, β<sub>0</sub>=0.4</b>；排序变体 <b>α=0.7, β<sub>0</sub>=0.5</b>。<br>随机优先化（stochastic prioritization）保证了低优先级样本也有非零概率被采到，缓解了贪心优先化「低 δ 样本永不回放」「对噪声尖峰敏感」「loss of diversity」三大问题。`,
  `α=0 均匀；α 越大越贪心；论文用 0.6 / 0.7。`, undefined);

N(`Two transitions in a replay buffer have proportional priorities p_1 = 1 and p_2 = 4. With α = 1, compute the sampling probability P(1) = p_1^α / (p_1^α + p_2^α). (Enter a number between 0 and 1.)`,
  0.2,
  `回放池中两个转移的比例优先级为 p<sub>1</sub> = 1、p<sub>2</sub> = 4。取 α = 1，计算采样概率 P(1) = p<sub>1</sub><sup>α</sup> / (p<sub>1</sub><sup>α</sup> + p<sub>2</sub><sup>α</sup>)。（输入 0 到 1 之间的数值）`,
  `P(1) = 1 / (1 + 4) = <b>0.2</b>，相应地 P(2) = 0.8，第二个转移被回放的频率是第一个的 4 倍。<br><b>延伸（重要性采样权重）</b>：若池大小 N = 2、β = 1，则 w<sub>1</sub> = (N·P(1))<sup>−1</sup> = (2×0.2)<sup>−1</sup> = 2.5，w<sub>2</sub> = (2×0.8)<sup>−1</sup> = 0.625；再除以 max<sub>j</sub>w<sub>j</sub> = 2.5 得归一化权重 (1, 0.25)。直觉：被高频采到的样本要<b>降权</b>，才能把期望拉回均匀分布下的无偏估计。`,
  `P(i) ∝ p<sub>i</sub><sup>α</sup>；随后用 w<sub>i</sub> = (N·P(i))<sup>−β</sup> 纠偏。`, undefined, 0.005);

S(`Which problem does STOCHASTIC prioritization solve compared with greedily replaying the transition with the largest |δ|?`,
  [`It removes the need for importance-sampling weights entirely`,`Low-|δ| transitions (especially new ones) may otherwise never be replayed, and greedy replay is sensitive to noise spikes and loses diversity; stochastic prioritization keeps a non-zero probability for every transition`,`It makes the replay buffer smaller`,`It guarantees convergence of Q-learning with function approximation`], 1,
  `与「贪心地回放 |δ| 最大的转移」相比，随机优先化解决了什么问题？`,
  [`它完全不再需要重要性采样权重`,`贪心策略下低 |δ| 的转移（尤其是新样本）可能永远不被回放，且对噪声尖峰敏感、多样性下降；随机优先化保证每个转移概率非零`,`它让回放池变小`,`它保证带函数近似的 Q-learning 收敛`],
  `L10b §3.2–§3.3：贪心（highest-prioritization）方案的三个缺陷：① 只有被回放的转移才更新 δ，<b>首次访问时 δ 小的样本可能长期不被回放</b>（滑动窗口下等于永远丢失）；② 对<b>随机奖励造成的噪声尖峰</b>敏感，自举会把误差放大；③ 反复回放少数样本导致<b>多样性损失 / 过拟合</b>。<br>随机优先化让采样概率对优先级<b>单调</b>但非确定，并保证最低优先级也有非零概率；新转移被存入时赋予<b>最大优先级</b>，确保每个样本至少被看到一次。<br>代价是非均匀采样引入偏差，这仍需重要性采样权重修正，所以 A 错。`,
  `随机优先化 = 单调 + 非零下限 + 新样本最高优先级。`, undefined);

S(`How does the PER paper correct the bias introduced by non-uniform sampling?`,
  [`w_i = (N·P(i))^{-β} / max_j w_j, with β linearly annealed from β_0 to 1`,`$w_i = p_i^α$`,`w_i = 1/N for every transition`,`$w_i = γ^t$`], 0,
  `PER 论文如何修正非均匀采样引入的偏差？`,
  [`w<sub>i</sub> = (N·P(i))<sup>−β</sup> / max<sub>j</sub>w<sub>j</sub>，其中 β 从 β<sub>0</sub> 线性退火到 1`,`$w_{i} = p_{i}^{α}$`,`所有转移取 w<sub>i</sub> = 1/N`,`$w_{i} = γ^{t}$`],
  `L10b §3.4：估计 E<sub>uniform</sub>[·] 时若按 P(i) 非均匀采样，必须用重要性采样权重 $w_{i} = (N\\cdot P(i))^{-β}$ 加权；<b>β = 1</b> 时完全补偿偏差。实践中把 β 从 β<sub>0</sub> 线性退火到 1：训练初期估计本身很不准、无偏性没那么重要，后期才需要严格纠偏。权重还除以 max<sub>j</sub>w<sub>j</sub> 做归一化以稳定梯度（只缩放、不改变方向）。<br>论文还指出一个副作用：β 增大时归一化常数变大，等效于逐步<b>减小步长</b>，与学习率退火效果类似。`,
  `β 退火 0→1：早期容偏、后期纠偏；除以 max w 稳定更新。`, undefined);

S(`Why does the dueling architecture need an extra constraint (max or mean subtraction) when combining V and A?`,
  [`Because V and A are not identifiable: adding a constant to V and subtracting it from all A leaves every Q(s,a) unchanged`,`Because V has more parameters than A`,`Because the advantage stream cannot be trained by SGD`,`Because the discount factor must be 0`], 0,
  `为什么 Dueling 架构在合并 V 与 A 时需要额外约束（减 max 或减均值）？`,
  [`因为 V 与 A 不可辨识：给 V 加一个常数、同时给所有 A 减去同一常数，所有 Q(s,a) 完全不变`,`因为 V 的参数比 A 多`,`因为优势流不能用 SGD 训练`,`因为折扣因子必须为 0`],
  `L10c §3.1 / L10a p36「Not identifiable ... Need one constraint」：若 $Q(s,a) = V(s) + A(s,a)$，那么对任意常数 c，$V' = V + c, A' = A - c$ 给出完全相同的 Q。因此反向传播时 V 与 A 可以沿这个方向任意漂移，两个流<b>学不到各自有意义的语义</b>，也不稳定。<br>两种约束：<br>① $Q = V + (A - \\max_{a'}A(s,a'))$（强制最优动作的优势为 0）；<br>② $Q = V + (A - (1/|A|)\\sum_{a'}A(s,a'))$（强制优势均值为 0）。<br>加约束后 V 流才真正成为价值函数 V*、A 流才真正成为优势的估计。`,
  `V+A 有常数自由度 → 必须减去 max 或 mean 才能辨识。`, undefined);

S(`Which aggregation module did the Dueling DQN paper favour in practice, and why?`,
  [`Subtracting max_a A(s,a), because it is differentiable`,`Subtracting the mean advantage, because advantages then only have to change as fast as the mean instead of compensating changes to the optimal action's advantage`,`No aggregation at all`,`A softmax over the advantage stream`], 1,
  `Dueling DQN 论文在实践中更偏好哪种聚合模块？原因是什么？`,
  [`减去 max<sub>a</sub> A(s,a)，因为它可导`,`减去优势的均值，因为此时优势只需跟得上均值的变化，而不必补偿最优动作优势的任何变化`,`完全不做聚合`,`对优势流做 softmax`],
  `L10c Eq.8 是减 max，Eq.9 是减均值：$$Q(s,a;θ,α,β) = V(s;θ,β) + ( A(s,a;θ,α) - (1/|A|) \\sum_{a'} A(s,a';θ,α) )$$。论文在 Eq.9 后明确写道：「with (9) the advantages only need to change as fast as the mean, instead of having to compensate any change to the optimal action's advantage in (8)」——因此<b>均值减基线更稳定</b>。<br>论文也试过 softmax 版本的 Eq.8，但发现表现与减 max 相近（「found it to degrade ... / perform similarly」），最终采用均值。<br>额外好处：做决策时只需评估优势流（argmax<sub>a</sub>Q = argmax<sub>a</sub>A），在动作数很多时更高效。`,
  `均值减基线比 max 更稳定；决策时 argmax Q = argmax A。`, undefined);

N(`A dueling network uses the mean-advantage aggregation. At state s the value stream gives V(s) = 5 and the advantage stream gives A = [2, 4, 0]. Compute Q(s,a_2) for the second action. (Enter a number.)`,
  7,
  `某 dueling 网络使用均值优势聚合。状态 s 处价值流给出 V(s) = 5，优势流给出 A = [2, 4, 0]。计算第二个动作的 Q(s, a<sub>2</sub>)。（输入数值）`,
  `① 优势均值 = (2 + 4 + 0)/3 = 2。<br>② 中心化优势 = [0, 2, −2]。<br>③ Q = V + 中心化优势 = [5, 7, 3]，所以 <b>Q(s,a<sub>2</sub>) = 7</b>。<br><b>校验</b>：max<sub>a</sub>Q = 7 = V(中心化后)？注意减均值时 V 等于 Q 的<b>均值</b>（这里 (5+7+3)/3 = 5 ✓），而减 max 时 V 等于 max Q。两种聚合都保证了「加常数不改变 Q」的自由度被消除。<br>若误用减 max（max A = 4）会得到 A′ = [−2, 0, −4]、Q(s,a<sub>2</sub>) = 5，与正确答案不同——考试时注意题目指定哪种聚合。`,
  `减均值：Q = V + (A − mean(A))；此时 V = mean(Q)。`, undefined, 0.005);

S(`What is the main empirical advantage of the dueling architecture?`,
  [`It removes the need for experience replay`,`In states where actions barely affect the environment it can learn the state value without updating a separate Q for every action, and its advantage grows as redundant actions are added (corridor experiment)`,`It eliminates the overestimation bias of the max operator`,`It turns Q-learning into an on-policy algorithm`], 1,
  `Dueling 架构的主要实证优势是什么？`,
  [`它不再需要经验回放`,`在动作对环境几乎无影响的状态里，能直接学到状态价值而不必为每个动作单独更新 Q；随着冗余动作增多优势更明显（corridor 实验）`,`它消除了 max 算子的过高估计偏差`,`它把 Q-learning 变成同策略算法`],
  `L10c 摘要与 §4.1、L10a p35「Killing 2 birds with 1 stone」：dueling 把 <b>V(s)</b>（状态有多好）与 <b>A(s,a)</b>（每个动作相对好多少）分开估计。在很多状态下动作选择无关紧要（例如赛道上没有障碍时），Q 值几乎不随 a 变化，单流网络仍要为每个动作单独更新 Q；dueling 只需更新一次共享的 V。<br><b>Corridor 实验</b>（L10c §4.2）：构造带大量 no-op 冗余动作的走廊，动作数 5 / 10 / 20；动作少时两种架构相近，动作越多 dueling 的优势越明显。<br>显著性图（Fig.2）也印证：V 流始终关注道路，A 流只在前方出现车辆时才被激活。C 是 Double DQN 的作用，A、D 都错。`,
  `dueling = 动作无关时高效学 V；冗余动作越多越占优。`, undefined);

M(`Which statements about the three DQN improvements are correct?`,
  [`Double DQN addresses the overestimation bias introduced by the max operator`,`Prioritized replay changes the sampling distribution and therefore introduces bias that is corrected with importance-sampling weights`,`Dueling networks require an identifiability constraint because V and A are not uniquely recoverable from Q`,`All three improvements replace the squared TD loss with a KL divergence`], [0,1,2],
  `关于三项 DQN 改进，哪些说法正确？`,
  [`Double DQN 处理 max 算子引入的过高估计偏差`,`优先回放改变了采样分布，因此引入偏差，需要用重要性采样权重修正`,`Dueling 网络需要可辨识性约束，因为无法由 Q 唯一恢复 V 与 A`,`三项改进都把平方 TD 损失换成 KL 散度`],
  `① ✓ L10a：拆分选择与评估，压制 E[max] 的正偏差。<br>② ✓ L10b §3.4：非均匀采样改变期望，用 w<sub>i</sub>=(N·P(i))<sup>−β</sup> 纠偏并退火 β。<br>③ ✓ L10c §3.1：V+A 存在加常数自由度，需减 max / 减均值。<br>④ ✗：三者都保留 TD 回归框架；只有 <b>分布式（distributional）DQN / Rainbow</b> 才用 KL 散度比较回报分布。<br><b>整体脉络</b>：这三项（加上 multi-step、distributional、noisy nets）在 L10d 被集成为 Rainbow，论文的重点正是验证它们「complementary（互补）」而非互斥。`,
  `DDQN 管偏差、PER 管数据效率、Dueling 管结构；KL 属于分布式 RL。`, undefined);

/* ==================================================================== */
/* CHAPTER 10 — Rainbow (L10d)                                            */
/* ==================================================================== */
CH(10, 'L10d Rainbow');

M(`Which of the following are among the SIX extensions integrated by Rainbow?`,
  [`Double Q-learning`,`Prioritized experience replay`,`Dueling network architecture`,`Noisy Nets`,`A learned world model used for MuZero-style tree search`,`A fixed target network with C = 10000 as a newly proposed component`], [0,1,2,3],
  `下列哪些属于 Rainbow 整合的六项扩展？`,
  [`Double Q-learning`,`优先经验回放`,`Dueling 网络架构`,`Noisy Nets`,`用学到的世界模型做 MuZero 式树搜索`,`把「固定目标网络 C = 10000」作为新提出的组件`],
  `Rainbow 论文 §2 明确列出<b>六项</b> DQN 扩展：① <b>Double Q-learning</b>（解耦选择/评估）；② <b>Prioritized replay</b>（按学习潜力采样）；③ <b>Dueling networks</b>（分离 V 与 A）；④ <b>Multi-step learning</b>（截断 n 步回报）；⑤ <b>Distributional RL</b>（建模回报分布而非均值）；⑥ <b>Noisy Nets</b>（可学习噪声层驱动探索）。<br>E 是 MuZero / L12 的 model-based 方向，不在 Rainbow 中；F 的目标网络是 2015 年原始 DQN 就有的基础组件，Rainbow 沿用而非新提出。<br>论文核心贡献不是发明新组件，而是<b>证明这六者可以互补地组合</b>，并给出详细消融研究。`,
  `Rainbow 六件套：Double / PER / Dueling / Multi-step / Distributional / Noisy Nets。`, undefined);

S(`How does Rainbow construct its multi-step bootstrap target?`,
  [`A one-step target r + γQ(s',a')`,`A truncated n-step discounted return R_t^(n) = Σ_{k=0}^{n-1} γ^k R_{t+k+1} + γ^n Q(S_{t+n},·), with the horizon n chosen by tuning`,`The full Monte Carlo return until termination`,`A λ-return computed with eligibility traces`], 1,
  `Rainbow 如何构造其多步自举目标？`,
  [`一步目标 r + γQ(s′,a′)`,`截断 n 步折扣回报 R<sub>t</sub><sup>(n)</sup> = Σ<sub>k=0</sub><sup>n−1</sup>γ<sup>k</sup>R<sub>t+k+1</sub> + γ<sup>n</sup>Q(S<sub>t+n</sub>,·)，n 由调优选定`,`直到终止的完整蒙特卡洛回报`,`用资格迹计算的 λ-回报`],
  `Rainbow §2.4：用 forward-view 的<b>截断 n 步回报</b> $$R_{t}^{(n)} \\equiv \\sum_{k=0}^{n-1} γ_{t}^{(k)} R_{t+k+1} + γ_{t}^{(n)} \\max_{a} Q(S_{t+n}, a)$$（分布式版本再对回报分布做平移与投影）。<br>论文指出「Multi-step targets with suitably tuned n often lead to faster learning」，并强调 n 是<b>敏感超参数</b>，具体数值由调优选定（n 是敏感超参数），但题目考查的是「截断 n 步回报」这一结构本身。<br>权衡：n 越大，真实奖励越多、偏差越小但方差越大，且需要更多帧才能填满经验；n=1 就是原始 DQN。D 的 TD(λ) 属于 L6 的资格迹框架，Rainbow 未采用。`,
  `Rainbow 用 n=3 的截断 n 步回报；n 是敏感超参。`, undefined);

S(`What does the distributional component of Rainbow estimate?`,
  [`Only the variance of the return`,`The full distribution of discounted returns on a discrete support of N_atoms atoms, with N_atoms × N_actions network outputs trained by minimising a KL divergence to a projected target distribution`,`The state-value function V(s) instead of Q(s,a)`,`A Gaussian policy over continuous actions`], 1,
  `Rainbow 的分布式（distributional）组件估计的是什么？`,
  [`只估计回报的方差`,`在 N<sub>atoms</sub> 个离散支撑点上估计折扣回报的<b>完整分布</b>，网络输出 N<sub>atoms</sub> × N<sub>actions</sub> 个值，通过最小化与投影后目标分布的 KL 散度训练`,`用状态价值 V(s) 取代 Q(s,a)`,`连续动作上的高斯策略`],
  `Rainbow §2.5（基于 C51 / Bellemare 等）：不再只回归回报的期望 Q(s,a)，而是学习随机回报 Z(s,a) 的<b>分布</b>，其支撑为 $z = {z_{0}, \\cdots, z_{N_atoms-1}}$（论文取 <b>51 个 atoms</b>）。网络输出 $N_{atoms} \\times N_{actions}$ 个概率；目标分布由 r + γz 构造后经 <b>Φ<sub>z</sub> 的 L2 投影</b>回到固定支撑，再用 KL 散度 $D_{KL}(Φ_{z} d_{t}' \\| d_{t})$ 训练。<br>分布式表示即使期望相同也能提供更丰富的学习信号，是 Rainbow 中贡献很大的一项；Dueling 版本把 V 流设为 N<sub>atoms</sub> 输出、A 流设为 N<sub>atoms</sub>×N<sub>actions</sub> 输出后再聚合。`,
  `分布式 RL：学 P(Z)，不学 E[Z]；51 atoms + KL 损失。`, undefined);

N(`Rainbow's distributional head represents returns with N_atoms = 51 atoms. For a game with N_actions = 18 valid actions, how many output units does a non-dueling distributional Q-network have? (Enter an integer.)`,
  918,
  `Rainbow 的分布式输出头用 N<sub>atoms</sub> = 51 个 atoms 表示回报。某游戏有 N<sub>actions</sub> = 18 个有效动作，非 dueling 的分布式 Q 网络输出层有多少个单元？（输入整数）`,
  `Rainbow §2.5：分布式网络「with N<sub>atoms</sub> × N<sub>actions</sub> outputs」。代入 51 × 18 = <b>918</b>。<br>对比：原始 DQN 的输出层是「每个动作一个单元」，即 18 个输出；分布式版本为每个动作额外输出 51 个 atom 的概率（softmax 归一化）。<br>在 dueling 分布式版本（§3）中，价值流输出 N<sub>atoms</sub> = 51 个值，优势流输出 N<sub>atoms</sub>×N<sub>actions</sub> = 918 个值，聚合后再过 softmax。<br>这也解释了为什么 Rainbow 的计算量明显大于 DQN——它是用更多输出换取更丰富的监督信号。`,
  `分布式输出 = atoms × actions；51×18=918。`, undefined, 0.5);

S(`How do Noisy Nets provide exploration in Rainbow?`,
  [`Add fixed Gaussian noise to the rewards`,`Replace linear layers by noisy linear layers y = (b + Wx) + (b_noisy ⊙ ε_b + (W_noisy ⊙ ε_w)x), whose noise parameters are learned; the network can learn to ignore the noise, and ε-greedy is no longer needed`,`Apply dropout to convolutional feature maps`,`Randomise the priorities in the replay buffer`], 1,
  `Rainbow 中 Noisy Nets 如何提供探索？`,
  [`给奖励加固定的高斯噪声`,`把线性层替换为噪声线性层 y = (b + Wx) + (b<sub>noisy</sub> ⊙ ε<sub>b</sub> + (W<sub>noisy</sub> ⊙ ε<sub>w</sub>)x)，噪声参数可学习；网络能自己学会忽略噪声，因此不再需要 ε-greedy`,`对卷积特征图使用 dropout`,`随机打乱回放池中的优先级`],
  `Rainbow §2.6（Fortunato 等, Noisy DQN）：线性层被替换为 $$y = (b + Wx) + (b_{noisy} \\odot ε_{b} + (W_{noisy} \\odot ε_{w})x)$$，其中 ε 是分解高斯噪声，<b>b<sub>noisy</sub>, W<sub>noisy</sub> 是可学习参数</b>。由此产生的<b>参数空间随机性</b>带来状态相关、可随时间退火的自适应探索：网络可以学着把噪声调小（利用）或调大（探索）。<br>论文实验设置明确写：「Whenever using Noisy Nets, we set <b>ε = 0</b>」——不再需要 ε-greedy；没有 Noisy Nets 的变体才用 ε-greedy（ε 退火到 0.01）。<br>注意 ε 在这里是采样噪声，不是探索率。`,
  `Noisy Nets = 可学习参数噪声 → 自适应探索 → ε=0。`, undefined);

S(`Which combination correctly describes how Rainbow integrates its components?`,
  [`Double: the online network selects the greedy action and the target network evaluates it; PER priority = the distributional KL loss; dueling architecture adapted to distributions`,`Double: the target network selects and the online network evaluates; PER priority = |reward|; a single-stream architecture`,`Noisy Nets are combined with ε-greedy at ε = 0.1; uniform replay for the distributional loss`,`Multi-step targets are replaced by a target network updated every step`], 0,
  `哪个组合正确描述了 Rainbow 的整合方式？`,
  [`Double：在线网络选贪心动作、目标网络评估；PER 优先级取分布式 KL 损失；dueling 架构改造为分布式版本`,`Double：目标网络选动作、在线网络评估；PER 优先级取 |奖励|；单流架构`,`Noisy Nets 与 ε=0.1 的 ε-greedy 同时使用；分布式损失采用均匀回放`,`用逐步更新的目标网络取代多步目标`],
  `Rainbow §3「Integrating all components」原文要点：<br>① 用<b>分布式损失</b>替换 1 步损失，并用截断 n 步回报构造目标分布；<br>② <b>Double</b>：用在线网络选贪心动作、用目标网络评估该动作；<br>③ <b>PER</b>：由于分布式的 KL 损失「might be more robust to noisy stochastic environments」，所有分布式 Rainbow 变体用 <b>KL loss 作为优先级</b>而非 |δ|；<br>④ <b>Dueling</b>：价值流 N<sub>atoms</sub> 输出、优势流 N<sub>atoms</sub>×N<sub>actions</sub> 输出，聚合后 softmax；<br>⑤ 所有线性层换成 noisy linear 层。<br>因此 B、C、D 都与论文相反：目标网络不是每步更新、Noisy Nets 时 ε=0、优先级不是 |r|。`,
  `Rainbow 整合：KL 作优先级 + 在线选/目标评 + 分布式 dueling + noisy 线性层。`, undefined);

S(`What is the purpose of the ablation study in the Rainbow paper?`,
  [`To show that each of the six components is necessary by removing components one at a time from the full agent and measuring the drop in performance`,`To tune the learning rate on a single game`,`To prove that DQN converges for γ &lt; 1`,`To compare Q-learning with SARSA on Cliff Walking`], 0,
  `Rainbow 论文中的消融实验（ablation study）目的是什么？`,
  [`从完整智能体中<b>逐项移除</b>六个组件之一，衡量性能下降，以说明各组件的贡献`,`在单个游戏上调优学习率`,`证明 γ &lt; 1 时 DQN 收敛`,`在 Cliff Walking 上比较 Q-learning 与 SARSA`],
  `Rainbow §4.2：对完整智能体做「leave-one-out」消融（以及仅加单项的对照），逐一去掉 prioritized replay、multi-step、distributional、noisy nets、dueling、double 等，观察 median/mean 人类归一化分数的变化，从而判断哪些组件最关键、哪些之间有互补或冗余。<br>论文结论：组合确实带来新的 SOTA，且各组件大体互补；消融图中<b>优先回放</b>与<b>多步回报</b>的移除造成明显下降，而某些单项（如 dueling，在分布式+noisy 组合中）影响相对小。<br>消融实验是「组合型论文」的标准论证手段，与单纯罗列基线分数（A/B/C/D 其他选项）不同。`,
  `消融 = 逐项去掉组件看性能掉多少，验证互补性。`, undefined);

/* ==================================================================== */
/* CHAPTER 11 — Policy Gradient (L11)                                     */
/* ==================================================================== */
CH(11, 'L11 Policy Gradient');

S(`Which statement best describes policy-based RL as presented in the lectures?`,
  [`It learns a value function and derives a deterministic greedy policy from it`,`It directly parameterises and optimises the policy π(a|s;θ), can represent stochastic policies, and copes better with high-dimensional or continuous action spaces`,`It always converges to the global optimum because the objective is convex`,`It requires a known transition model`], 1,
  `哪个说法最好地描述了课件中的基于策略（policy-based）RL？`,
  [`它学习价值函数并从中导出确定性贪心策略`,`它直接参数化并优化策略 π(a|s;θ)，能表达随机策略，更擅长高维 / 连续动作空间`,`因为目标函数是凸的，它总是收敛到全局最优`,`它需要已知的转移模型`],
  `L11 p2、p8–p10：此前课程是 value-based（near-deterministic policies）；现在转向<b>direct policy search</b> 与 <b>stochastic policies</b>，并聚焦 model-free。对比表：<br>• value-based：显式学价值函数、隐式策略（greedy）；<br>• policy-based：直接学 π，通常<b>不学</b>价值函数；<br>• actor-critic：两者都学。<br>优势：能表示<b>随机策略</b>、在高维 / 连续动作空间更有效；代价：一般只保证局部最优（不是凸目标），且基础 REINFORCE 方差高。D 错：课件明确是 model-free。`,
  `policy-based = 直接学 π + 随机策略 + 适合连续动作；不保证全局最优。`, undefined);

S(`In the rock-paper-scissors example, why is a stochastic policy needed?`,
  [`Because the reward is delayed until the end of an episode`,`A deterministic policy is easily exploited by an opponent; the uniform random policy is the optimal (Nash equilibrium) policy`,`Because the state space is continuous`,`Because the value function cannot be approximated`], 1,
  `在「石头剪刀布」例子中，为什么需要随机策略？`,
  [`因为奖励延迟到幕末才给出`,`确定性策略极易被对手利用；均匀随机策略才是最优（纳什均衡）策略`,`因为状态空间是连续的`,`因为价值函数无法近似`],
  `L11 p13–p14：两人石头剪刀布中，状态是历史动作（如 R, R, S 及输赢），奖励 +1 / −1 / 0。任何<b>确定性策略</b>都会被对手看穿并稳定击败；最优策略是<b>均匀随机</b>（Nash equilibrium）。课件 p14 原话：「A deterministic policy is easily exploited; Optimal policy = Uniform Random Policy」。<br>这正是 value-based + argmax 方法在对抗 / 部分可观测场景下的根本局限，也是引入直接优化 π(a|s;θ) 的动机之一。`,
  `确定性策略可被利用 → 需要随机策略（博弈 / 混策略）。`, undefined);

S(`What does the aliased Gridworld example demonstrate?`,
  [`When two states are indistinguishable, a value-based method with a deterministic / ε-greedy policy may get stuck for a long time, while an optimal stochastic policy can reach the goal with high probability in few steps`,`Value functions are always linear in the features`,`ε-greedy guarantees convergence in POMDPs`,`The optimal policy is always deterministic`], 0,
  `状态混叠（aliased）Gridworld 例子说明了什么？`,
  [`当两个状态不可区分时，采用确定性 / ε-greedy 策略的基于价值方法可能长时间卡住，而最优<b>随机策略</b>能以高概率在很少步数内到达目标`,`价值函数关于特征总是线性的`,`ε-greedy 保证在 POMDP 中收敛`,`最优策略总是确定性的`],
  `L11 p15–p17：两个灰色格子在特征层面完全不可区分（特征只有「北/南/东/西是否有墙」等）。基于价值的方法学到的近似确定性策略在两个灰格处必须做同样的事：要么都往西、要么都往东，于是会在走廊里长时间来回（ε-greedy 也只能靠随机慢慢撞出去）。<br>而<b>最优随机策略</b>可以在混叠状态下以一定概率选择两个方向，从而以高概率在很少步数内到达终点，且策略梯度方法收敛性质更好。<br>这与 L3 的 POMDP 一脉相承：状态表示不充分（非马尔可夫）时，随机策略可能是唯一的最优解。`,
  `混叠状态 → 确定性策略受限 → 随机策略最优。`, undefined);

S(`For episodic tasks, which policy objective is used in the lectures?`,
  [`$J(θ) = v_π(s_0) = E_π[G_t | S_t = s_0]$`,`$J(θ) = \\max _a q_π(s,a)$`,`J(θ) = Σ_s d^π(s) Σ_a π(a|s) r(s,a) for the average-reward continuing case`,`$J(θ) = E[(y - Q(s,a;θ))^2]$`], 0,
  `对幕式（episodic）任务，课件使用的策略目标函数是？`,
  [`$J(θ) = v_{π}(s_{0}) = E_{π}[G_{t} | S_{t} = s_{0}]$`,`$J(θ) = \\max _{a} q_{π}(s,a)$`,`J(θ) = Σ<sub>s</sub> d<sup>π</sup>(s) Σ<sub>a</sub> π(a|s) r(s,a)（持续性任务的平均奖励）`,`$J(θ) = E[(y - Q(s,a;θ))^2]$`],
  `L11 p21：<b>幕式环境</b>从固定起始状态 s<sub>0</sub> 出发，目标就是起始状态的价值 $J(θ) = E_{π}[G_{t}|S_{t}=s_{0}] = v_{π}(s_{0})$；<b>持续性环境</b>用平均奖励 $J(θ) = \\sum_{s}d^{π}(s) \\sum_{a}π(a|s)r(s,a)$，其中 d<sup>π</sup> 是策略 π 下马尔可夫链的<b>平稳分布</b>。课件明确「Focus episodic case；easily extend to continuing / finite horizon」。<br>C 本身是一个正确公式，但对应 continuing 情形，本题问 episodic，所以不选；D 是 DQN 的回归损失，不是策略目标。<br>优化方法是<b>梯度上升</b> θ ← θ + α∇J(θ)（因为是最大化）。`,
  `episodic：J=v<sub>π</sub>(s<sub>0</sub>)；continuing：平均奖励 + 平稳分布。`, undefined);

S(`Which expression is the policy gradient theorem as given in the lectures?`,
  [`$\\nabla J(θ) \\propto \\sum _s μ(s) \\sum _a q_π(s,a) \\nabla _θ π(a|s;θ)$`,`∇J(θ) = Σ_s μ(s) ∇_θ v_π(s) including the derivative of the state distribution`,`$\\nabla J(θ) = E[δ_t \\nabla _θ Q(s,a;θ)]$`,`$\\nabla J(θ) = \\max _a \\nabla _θ \\log π(a|s;θ)$`], 0,
  `课件给出的策略梯度定理是？`,
  [`$\\nabla J(θ) \\propto \\sum _{s} μ(s) \\sum _{a} q_{π}(s,a) \\nabla _{θ} π(a|s;θ)$`,`∇J(θ) = Σ<sub>s</sub> μ(s) ∇<sub>θ</sub>v<sub>π</sub>(s)（包含状态分布的导数）`,`$\\nabla J(θ) = E[δ_{t} \\nabla _{θ}Q(s,a;θ)]$`,`$\\nabla J(θ) = \\max _{a} \\nabla _{θ} \\log π(a|s;θ)$`],
  `L11 p24–p25：$$\\nabla J(θ) = \\sum_{s} μ(s) \\sum_{a} q_{π}(s,a) \\nablaπ(a|s;θ)$$，其中 μ(s) 是 on-policy 状态分布（幕式时 μ(s) = η(s)/Ση，η(s) 是一幕中访问 s 的期望步数；持续性时是平稳分布）。<br><b>定理的关键价值</b>（课件 p24 的 Remark）：梯度中<b>只出现策略 π 的导数</b>，不需要对状态分布 μ(s) 或动作价值 q<sub>π</sub> 求导——否则就要知道环境动态，无法 model-free。证明（p26 引自 Sutton 教材）通过反复展开 $\\nabla v_{π}(s)$ 并把所有 ∇q 项累加成 η(s)，最后归一化为 μ(s)。<br>用 log 技巧写成期望形式：$\\nabla J(θ) = E_{π}[q_{π}(S_{t},A_{t}) \\nabla\\log π(A_{t}|S_{t};θ)]$。`,
  `∇J 只含 ∇π，不含 ∇μ、∇q；这是能 model-free 采样的关键。`, undefined);

S(`The score function is defined as`,
  [`$\\nabla _θ \\log π_θ(a|s) = \\nabla _θ π_θ(a|s) / π_θ(a|s)$`,`$\\nabla _θ \\log π_θ(a|s) = π_θ(a|s) \\nabla _θ π_θ(a|s)$`,`$\\nabla _θ \\log π_θ(a|s) = π_θ(a|s)$`,`$\\nabla _θ \\log π_θ(a|s) = \\nabla _θ π_θ(a|s)$`], 0,
  `得分函数（score function）定义为`,
  [`$\\nabla _{θ} \\log π_{θ}(a|s) = \\nabla _{θ}π_{θ}(a|s) / π_{θ}(a|s)$`,`$\\nabla _{θ} \\log π_{θ}(a|s) = π_{θ}(a|s)\\nabla _{θ}π_{θ}(a|s)$`,`$\\nabla _{θ} \\log π_{θ}(a|s) = π_{θ}(a|s)$`,`$\\nabla _{θ} \\log π_{θ}(a|s) = \\nabla _{θ}π_{θ}(a|s)$`],
  `L11 p30：由链式法则 $\\nabla\\log π = \\nablaπ / π$。这被称为 <b>likelihood ratio trick</b>，作用是<br>$$\\sum_{a} q_{π}(s,a) \\nablaπ(a|s) = \\sum_{a} π(a|s) q_{π}(s,a) \\nabla\\log π(a|s) = E_{π}[q_{π}(s,A) \\nabla\\log π(A|s)]$$。<br>把「对所有动作求和」变成「按策略采一个动作再取期望」，于是策略梯度可以用<b>实际采样的轨迹</b>估计，无需枚举动作空间——这对连续动作空间尤其关键。<br>直觉（p42）：更新方向会让参数朝「提高该动作在未来被重复选中的概率」移动，幅度正比于回报，并除以 π 以免高频访问的状态占便宜。`,
  `∇logπ = ∇π/π：把求和变成可采样期望。`, undefined);

S(`For a softmax policy π(a|s) ∝ exp(x(s,a)^T θ), what is the score function?`,
  [`$x(s,a) - \\sum _b π(b|s) x(s,b)$`,`x(s,a)`,`π(a|s) x(s,a)`,`1 / π(a|s)`], 0,
  `对 softmax 策略 π(a|s) ∝ exp(x(s,a)<sup>T</sup>θ)，得分函数是？`,
  [`$x(s,a) - \\sum _{b} π(b|s) x(s,b)$`,`x(s,a)`,`π(a|s) x(s,a)`,`1 / π(a|s)`],
  `L11 p33 的推导：log π(a|s) = x(s,a)<sup>T</sup>θ − log Σ<sub>b</sub>exp(x(s,b)<sup>T</sup>θ)，求导得 $$\\nabla_{θ} \\log π(a|s;θ) = x(s,a) - E_{π}[x(s,\\cdot)]$$。<br>直觉：梯度是「被选中动作的特征」减去「策略下特征的期望」——即提高该动作相对平均水平出现的概率。所有动作的得分按 π 加权后期望为 0，这正是后面「基线不改变期望梯度」成立的原因。<br>softmax 适合<b>离散动作空间</b>；连续动作用高斯策略（p34）；两者都要求策略对 θ 可微，还包括神经网络策略（p35）。`,
  `softmax 得分 = 特征 − 策略下特征期望；按 π 加权期望为 0。`, undefined);

N(`A softmax policy over two actions has linear preferences h_1 = 1 and h_2 = 2. Compute π(a_2|s) = e^2 / (e^1 + e^2). (Enter a number rounded to four decimals.)`,
  0.7311,
  `两动作 softmax 策略的线性偏好为 h<sub>1</sub> = 1、h<sub>2</sub> = 2。计算 π(a<sub>2</sub>|s) = e² / (e¹ + e²)。（输入保留四位小数的数值）`,
  `π(a<sub>2</sub>) = e²/(e¹+e²) = 1/(1 + e<sup>−1</sup>) = sigmoid(1) = <b>0.7311</b>（更精确为 0.731058…）。<br>计算过程：e¹ ≈ 2.7183，e² ≈ 7.3891，分母 ≈ 10.1074，比值 ≈ 0.7311；π(a<sub>1</sub>) ≈ 0.2689，两者和为 1 ✓。<br><b>要点</b>：softmax 只依赖偏好的<b>差值</b>（h<sub>2</sub>−h<sub>1</sub>=1），同时给所有 h 加同一个常数不会改变概率——这与 Dueling DQN 中 V+A 的不可辨识性是同一类「加常数自由度」现象，softmax 通过归一化自动消除了它。`,
  `softmax 两动作 = sigmoid(Δh)；只依赖偏好差。`, undefined, 0.002);

S(`For a Gaussian policy with fixed variance σ² and mean μ(s,θ) = θ^T x(s), the score function used in the lectures is`,
  [`(a - μ) x(s) / σ²`,`$x(s,a) - E_π[x(s,\\cdot )]$`,`$\\nabla _θ π(a|s;θ)$`,`σ² (a - μ)`], 0,
  `对固定方差 σ²、均值 μ(s,θ) = θ<sup>T</sup>x(s) 的高斯策略，课件中的得分函数是？`,
  [`(a − μ) x(s) / σ²`,`x(s,a) − E<sub>π</sub>[x(s,·)]`,`$\\nabla _{θ} π(a|s;θ)$`,`σ²(a − μ)`],
  `L11 p34：连续动作空间用高斯策略 $a ~ N(μ(s,θ), σ^2)$，其中 $μ(s,θ) = θ^{T}x(s)$。由 $\\log π(a|s) = -(a-μ)^2/(2σ^2) + const$ 对 θ 求导：$$\\nabla_{θ} \\log π(a|s;θ) = (a - μ) x(s) / σ^2$$。<br>直觉：若采样动作 a 大于当前均值，梯度把 μ 往上推（若该动作回报高的话），且 σ² 越小越敏感。<br>若 σ 也要学习，还会多出关于 σ 的项；B 是离散 softmax 策略的得分，只适用于离散动作。`,
  `高斯策略得分 = (a−μ)∇μ/σ²；softmax 用于离散，高斯用于连续。`, undefined);

S(`Which is the REINFORCE (Monte Carlo policy gradient) update?`,
  [`$θ \\leftarrow θ + α γ^t G_t \\nabla _θ \\log π(A_t|S_t;θ)$`,`$θ \\leftarrow θ + α δ_t \\nabla _θ \\log π(A_t|S_t;θ)$`,`$θ \\leftarrow θ - α \\nabla _θ (y - Q(s,a;θ))^2$`,`θ ← θ + α[R + γ max_a Q(S',a) - Q(S,A)]`], 0,
  `REINFORCE（蒙特卡洛策略梯度）的更新式是？`,
  [`$θ \\leftarrow θ + α γ^{t} G_{t} \\nabla _{θ} \\log π(A_{t}|S_{t};θ)$`,`$θ \\leftarrow θ + α δ_{t} \\nabla _{θ} \\log π(A_{t}|S_{t};θ)$`,`$θ \\leftarrow θ - α \\nabla _{θ}(y - Q(s,a;θ))^2$`,`θ ← θ + α[R + γ max<sub>a</sub> Q(S′,a) − Q(S,A)]`],
  `L11 p37–p41：策略梯度定理里 q<sub>π</sub>(S<sub>t</sub>,A<sub>t</sub>) 未知，用<b>单次采样的完整回报 G<sub>t</sub></b> 代替并取期望，得 $$θ \\leftarrow θ + α γ^{t} G_{t} \\nabla\\log π(A_{t}|S_{t};θ)$$。其中 γ<sup>t</sup> 来自把 on-policy 状态分布 μ(s) 写成折扣访问频次。<br>B 是<b>一步 actor-critic</b>（用 TD 误差 δ 作优势估计，p49、p56）；C 是 DQN 的 Q 网络回归；D 是表格 Q-learning。<br>REINFORCE 是 <b>Monte Carlo</b> 方法：必须等一幕结束才能更新，无偏但方差高。`,
  `REINFORCE = MC 策略梯度，用 G<sub>t</sub> 估 q<sub>π</sub>；actor-critic 用 δ。`, undefined);

S(`What is the main drawback of REINFORCE, and how do the lectures propose to fix it?`,
  [`It is biased and low variance; fix by increasing the learning rate`,`It is unbiased but has high variance and learns slowly; fix by subtracting a baseline or using an actor-critic architecture`,`It requires a known model; fix by learning a model`,`It cannot handle stochastic policies; fix by using ε-greedy`], 1,
  `REINFORCE 的主要缺点是什么？课件提出的解决办法是？`,
  [`有偏但方差低；通过增大学习率解决`,`无偏但方差高、学习慢；通过减去基线或使用 actor-critic 架构降低方差`,`需要已知模型；通过学习一个模型解决`,`无法处理随机策略；改用 ε-greedy`],
  `L11 p44：REINFORCE 是 MC 策略梯度，G<sub>t</sub> 依赖一整幕的随机动作、转移与奖励，因此估计<b>无偏但方差极高</b>，学习慢。课件列出两条改进路线：<b>variance reduction techniques</b>——① 引入<b>基线 baseline</b>（p50）；② <b>Actor-Critic</b>（p45–p47）。<br>后续 p52 进一步指出：评论家真正该估计的是<b>优势函数 A(s,a)</b> 而不是 G 或 q；p54–p56 证明 TD 误差 δ 是 A 的无偏估计，因此实际的一阶 actor-critic 只需一个 v̂(s,w) 就能工作。<br>A 描述反了（TD 才是有偏低方差）；C、D 与 REINFORCE 的 model-free、随机策略特性相悖。`,
  `REINFORCE：无偏高方差 → baseline / actor-critic 降方差。`, undefined);

S(`Why can a state-dependent baseline b(s) be subtracted from the return without biasing the policy gradient?`,
  [`Because b(s) is always zero`,`Because E_π[∇log π(a|s;θ) · b(s)] = b(s) Σ_a ∇π(a|s;θ) = b(s) ∇1 = 0; a good choice is b(s) = v_π(s)`,`Because the baseline makes the algorithm off-policy`,`Because γ^t is removed at the same time`], 1,
  `为什么可以减去一个只依赖状态的基线 b(s) 而不改变策略梯度的期望？`,
  [`因为 b(s) 恒等于 0`,`因为 E<sub>π</sub>[∇log π(a|s;θ)·b(s)] = b(s)Σ<sub>a</sub>∇π = b(s)∇1 = 0；一个好的选择是 b(s) = v<sub>π</sub>(s)`,`因为基线会把算法变成异策略`,`因为同时消去了 γ<sup>t</sup>`],
  `L11 p50–p51 的证明：由于 b(s) <b>不依赖动作 a</b>，可以提出求和号：$$E_{π}[b(s)\\nabla\\log π] = b(s) \\sum_{a} π \\cdot (\\nablaπ/π) = b(s) \\sum_{a}\\nablaπ = b(s) \\nabla \\sum_{a}π = b(s) \\nabla1 = 0$$。所以 $\\nabla J = E[(G_{t} - b(S_{t}))\\nabla\\logπ]$ 与原来期望相同，但<b>方差显著降低</b>。<br><b>关键在于 b 不能依赖 a</b>；若依赖动作，就得额外补偿一个修正项。最优基线接近回报的（按梯度平方加权的）期望；实践中取 $b(s) = v̂(s,w)$，于是 (G<sub>t</sub> − b) 就是优势的估计。`,
  `基线必须只依赖 s；E[∇logπ]=0 是证明核心；常取 v<sub>π</sub>(s)。`, undefined);

S(`Which statement about the advantage function and the TD error is correct?`,
  [`A(s,a) = q_π(s,a) - v_π(s); the TD error δ_t = R_{t+1} + γv(S_{t+1}) - v(S_t) is an unbiased estimate of A(s,a)`,`$A(s,a) = q_π(s,a) + v_π(s)$`,`$A(s,a) = G_t - r$`,`$A(s,a) = \\max _a Q(s,a) - V(s)$`], 0,
  `关于优势函数与 TD 误差，哪个说法正确？`,
  [`A(s,a) = q<sub>π</sub>(s,a) − v<sub>π</sub>(s)；TD 误差 δ<sub>t</sub> = R<sub>t+1</sub> + γv(S<sub>t+1</sub>) − v(S<sub>t</sub>) 是 A(s,a) 的无偏估计`,`$A(s,a) = q_{π}(s,a) + v_{π}(s)$`,`$A(s,a) = G_{t} - r$`,`$A(s,a) = \\max _{a} Q(s,a) - V(s)$`],
  `L11 p52：优势函数定义为 $A(s,a) = q_{π}(s,a) - v_{π}(s)$，即「这个动作比策略平均水平好多少」。由于减去的是状态基线，用 A 替代 G<sub>t</sub> 不改变期望梯度，却能显著降方差，所以课件说「The Critic should really estimate Advantage instead of q or G」。<br>L11 p54–p55 的证明：$$E[δ_{t} | S_{t}=s, A_{t}=a] = E[R + γv(S')] - v(s) = q_{π}(s,a) - v_{π}(s) = A(s,a)$$，前提是 v = v<sub>π</sub>；因此一步 TD 误差就是一个（低方差的）优势估计。<br>p56 由此得到只需一个 v̂(s,w) 的实用 actor-critic：w 用 TD 更新，θ 用 δ∇logπ 更新。`,
  `A = q − v；δ 是 A 的无偏估计 → 只需一个 critic v̂。`, undefined);

N(`Using the one-step TD error as the advantage estimate: R_{t+1} = 1, γ = 0.9, v(S_{t+1}) = 5, v(S_t) = 2. Compute δ_t. (Enter a number.)`,
  3.5,
  `用一步 TD 误差作为优势估计：R<sub>t+1</sub> = 1、γ = 0.9、v(S<sub>t+1</sub>) = 5、v(S<sub>t</sub>) = 2。计算 δ<sub>t</sub>。（输入数值）`,
  `δ<sub>t</sub> = R<sub>t+1</sub> + γv(S<sub>t+1</sub>) − v(S<sub>t</sub>) = 1 + 0.9×5 − 2 = 1 + 4.5 − 2 = <b>3.5</b>。<br>actor 的更新为 $θ \\leftarrow θ + α δ_{t} \\nabla\\log π(A_{t}|S_{t};θ)$：正的 δ 说明该动作比当前状态价值预期的好，因此提高它的对数概率。<br><b>三重身份</b>：同一个 δ 在 L6 是 TD(λ) 后向视图的更新信号、在 L10b 是优先回放的优先级 |δ|、在 L11 是优势函数 A(s,a) 的无偏估计——把这三处串起来是期中综合题的常见考法。`,
  `δ = R + γv(S′) − v(S)；同时是 TD 误差与优势估计。`, undefined, 0.005);

S(`How are the two parameter sets used in the actor-critic algorithm described in the lectures?`,
  [`The critic (w) evaluates the action / state via TD and the actor (θ) updates the policy along δ_t ∇log π; a single value function v̂(s,w) suffices when the TD error is used as the advantage`,`The actor learns Q and the critic selects actions greedily`,`Only one parameter vector is needed because Q and π are the same object`,`Actor-critic requires complete episodes and cannot bootstrap`], 0,
  `课件描述的 actor-critic 算法中，两套参数如何使用？`,
  [`评论家（w）用 TD 评估动作 / 状态，演员（θ）沿 δ<sub>t</sub>∇logπ 更新策略；当用 TD 误差作优势时，只需一个 v̂(s,w) 即可`,`演员学 Q，评论家贪心地选动作`,`因为 Q 与 π 是同一个对象，只需一套参数`,`actor-critic 必须等完整幕、不能自举`],
  `L11 p45–p47：actor-critic 用两组参数——<b>critic</b> 用 w 估计 q̂(s,a,w)（可用 MC 或 TD(0) 做策略评估），<b>actor</b> 用 θ 按评论家给出的建议更新 π。这样「evaluation 与 improvement 解耦」，并显著降低 REINFORCE 的方差。<br>p53–p56 进一步简化：既然 δ 是优势 A 的无偏估计，critic 只需学一个 <b>v̂(s,w)</b>（用 TD 更新 w），actor 用 $θ \\leftarrow θ + α δ \\nabla\\logπ$ 更新 θ，也就是课件 p56 说的 critic 侧「only one set of parameters is needed」。<br>因此 C 错在把两套参数混为一谈（θ 和 w 仍各有一套）；D 错：actor-critic 用 TD <b>可以自举、可在线每步更新</b>。`,
  `critic = v̂(s,w) 用 TD；actor = π<sub>θ</sub> 用 δ∇logπ；每步可更新。`, undefined);

M(`Which statements about policy gradient methods are correct?`,
  [`Policy-based methods directly optimise a parameterised policy and can learn stochastic policies`,`The policy gradient theorem removes the need to differentiate the state distribution or the action-value function`,`REINFORCE uses the complete return of an episode and is therefore a Monte Carlo method`,`Subtracting a state-dependent baseline from the return introduces bias into the gradient estimate`], [0,1,2],
  `关于策略梯度方法，哪些说法正确？`,
  [`基于策略的方法直接优化参数化策略，能学到随机策略`,`策略梯度定理使得无需对状态分布或动作价值函数求导`,`REINFORCE 使用一幕的完整回报，因此是蒙特卡洛方法`,`减去只依赖状态的基线会给梯度估计引入偏差`],
  `① ✓ L11 p8–p10：直接学 π(a|s;θ)、支持随机策略。<br>② ✓ L11 p24 Remark：∇J 中只有 ∇π，不含 ∇μ(s) 与 ∇q<sub>π</sub>，所以无需环境模型。<br>③ ✓ L11 p37–p41：用 G<sub>t</sub> 估计 q<sub>π</sub>，需等幕结束，属于 MC。<br>④ ✗ L11 p50–p51：由 E[∇logπ]=0，减基线<b>不改变期望</b>（无偏），只降低方差。这是策略梯度最经典的概念题。<br>补充：REINFORCE 的方差来自一整幕的随机性；actor-critic 用自举的 δ 换低方差但引入偏差——与 L6 的 MC/TD 权衡完全对应。`,
  `减基线无偏；用自举 critic 才引入偏差（换低方差）。`, undefined);

/* ==================================================================== */
/* CHAPTER 12 — Integrated Learning & Planning (L12)                      */
/* ==================================================================== */
CH(12, 'L12 Integrated Learning & Planning');

S(`Which pair correctly states the pros and cons of model-based RL given in the lectures?`,
  [`Pros: no interaction needed; Cons: slow at test time`,`Pros: the model can be learned efficiently by supervised learning and model uncertainty can be reasoned about; Cons: two sources of approximation error (learning a model, then constructing a value function / policy)`,`Pros: always optimal; Cons: requires a GPU`,`Pros: no model is needed; Cons: high variance`], 1,
  `哪一对正确陈述了课件给出的 model-based RL 优缺点？`,
  [`优点：无需交互；缺点：测试时慢`,`优点：模型可用监督学习高效学习、可以对模型不确定性进行推理；缺点：存在两处近似误差（先学模型，再由模型构造价值 / 策略）`,`优点：总是最优；缺点：需要 GPU`,`优点：不需要模型；缺点：方差高`],
  `L12 p13：<b>Pros</b> —「Can learn model efficiently by Supervised Learning」「Can reason about model uncertainty」；<b>Cons</b> —「Two sources of approximation error: first learn a model, second construct value function」。<br>也就是说：真实经验 → 拟合 P̂, R̂ 会有误差；再用这个有误差的模型做规划又会产生第二次误差，两者可能叠加甚至被规划过程放大。相比之下 model-free 方法只有一次近似（直接学价值 / 策略），但需要更多真实交互。<br>L12 p16 的对照：direct RL = trial & error / reactive / 计算量小；indirect RL = reasoning / deliberative planning / 计算密集；人类两者都用。`,
  `model-based：样本效率高但两次近似误差；model-free：一次误差但数据饥渴。`, undefined);

S(`Which diagram correctly describes direct RL versus indirect RL?`,
  [`Direct: experience → value/policy; Indirect: experience → model → simulated experience → value/policy`,`Direct: experience → model → value/policy; Indirect: experience → value/policy`,`They are two names for the same algorithm`,`Indirect RL is identical to imitation learning`], 0,
  `哪个流程正确描述了直接 RL 与间接 RL？`,
  [`直接：经验 → 价值 / 策略；间接：经验 → 模型 → 模拟经验 → 价值 / 策略`,`直接：经验 → 模型 → 价值 / 策略；间接：经验 → 价值 / 策略`,`两者是同一算法的两个名称`,`间接 RL 等同于模仿学习`],
  `L12 p14 的框图：<b>Direct RL</b> 用真实经验直接更新价值函数 / 策略；<b>Indirect RL</b> 先把真实经验用于 <b>Model Learning</b>，再由模型产生 <b>Simulated Experience</b>，最后用这些模拟经验更新价值 / 策略。两条路径可以同时存在（p16「How do humans learn? Direct + Indirect」）。<br>p16 的性质对照：直接 = trial & error、reactive decision making、计算量小；间接 = reasoning / cognition、deliberative planning、计算密集。Dyna（p34–p37）就是把两者放进一个架构的具体实现。`,
  `direct 一条路；indirect 多出「学模型 + 造模拟经验」两步。`, undefined);

S(`How is a model learned from experience in the lectures?`,
  [`By Q-learning on the same transitions`,`Represent M = ⟨P̂, R̂⟩ and learn the transition and reward functions separately as supervised learning problems (e.g. MSE or KL divergence)`,`The true P and R must be supplied exactly`,`The model is derived analytically from the optimal policy`], 1,
  `课件中如何从经验中学习模型？`,
  [`对同一批转移运行 Q-learning`,`用 M = ⟨P̂, R̂⟩ 表示模型，把转移函数与奖励函数作为两个独立的监督学习问题分别拟合（如最小化 MSE 或 KL 散度）`,`真实的 P 与 R 必须被精确给出`,`模型可由最优策略解析推导`],
  `L12 p18–p21：真实模型 M = ⟨A, P, R⟩；学到的模型 M̂ = ⟨A, P̂, R̂⟩，其中 $S_{t+1} = f_{P}(S_{t},A_{t})$、$R_{t+1} = f_{R}(S_{t},A_{t})$。课件明确「<b>Learn them separately</b>」：把 (S<sub>t</sub>,A<sub>t</sub>) → S<sub>t+1</sub> 与 (S<sub>t</sub>,A<sub>t</sub>) → R<sub>t+1</sub> 当作两个监督学习回归 / 密度估计问题，用经验损失（L2、KL）最小化。<br>p19 列出可选模型表示：Table Lookup、Linear Expectation、Basis expansion / Linear Gaussian、Decision Trees、Neural Network（含 CNN）；p20 提醒该过程<b>隐含使用了马尔可夫假设</b>。`,
  `学模型 = 两个监督学习问题（P̂ 与 R̂ 分开）；隐含 Markov 假设。`, undefined);

S(`In a table-lookup model, how are P̂(s'|s,a) and R̂(s,a) estimated?`,
  [`P̂(s'|s,a) = N(s,a,s')/N(s,a) and R̂(s,a) is the average reward observed after (s,a)`,`P̂ = γ and R̂ = max reward`,`P̂ = π(a|s) and R̂ = G_t`,`P̂ is always uniform and R̂ is always 0`], 0,
  `在查表模型（table lookup model）中，P̂(s′|s,a) 与 R̂(s,a) 如何估计？`,
  [`P̂(s′|s,a) = N(s,a,s′)/N(s,a)，R̂(s,a) 取 (s,a) 之后观测到的奖励均值`,`P̂ = γ，R̂ = 最大奖励`,`$P̂ = π(a|s), R̂ = G_{t}$`,`P̂ 恒为均匀分布，R̂ 恒为 0`],
  `L12 p22–p23：把经验 {(S<sub>1</sub>,A<sub>1</sub>,R<sub>2</sub>,S<sub>2</sub>), …} 视为 (s,a) 条件下的样本，用<b>频率估计</b>转移概率 $$P̂(s'|s,a) = N(s,a,s') / N(s,a)$$，用<b>样本均值</b>估计奖励 $R̂(s,a) = (1/N(s,a)) \\sum r$。课件 p22 强调这隐含了马尔可夫假设（只看当前 (s,a)）。<br>这是最大似然估计：在离散表格模型下，频率就是使观测数据似然最大的解。得到 P̂、R̂ 后即可用值迭代 / 策略迭代 / 树搜索 / 采样规划求价值与策略。`,
  `表格模型 = 频率 + 均值；本质是最大似然。`, undefined);

N(`A table-lookup model has observed state-action pair (s,a) four times: three times transitioning to s1 with rewards 1, 1, 1, and once to s2 with reward 0. Compute R̂(s,a), the model's expected immediate reward. (Enter a number.)`,
  0.75,
  `查表模型对状态-动作对 (s,a) 共观测 4 次：3 次转移到 s1 且奖励为 1、1、1，1 次转移到 s2 且奖励为 0。计算模型的期望即时奖励 R̂(s,a)。（输入数值）`,
  `R̂(s,a) = (1 + 1 + 1 + 0) / 4 = 3/4 = <b>0.75</b>。<br>同时可得转移估计：P̂(s<sub>1</sub>|s,a) = 3/4 = 0.75，P̂(s<sub>2</sub>|s,a) = 1/4 = 0.25（行和为 1 ✓）。<br><b>与 L6 AB 例子的联系</b>：批量 TD(0) 收敛到「最拟合数据的最大似然马尔可夫模型的精确解」（certainty equivalence），用的正是这种频率估计。所以若 γ=1，用该模型做采样规划 / 值迭代得到的 V(B) 也是 0.75——L12 p29–p30 的 AB 例子与 L6 p38 的批量 TD 在这里合上了。`,
  `R̂ = 经验均值；P̂ = 频率；两者构成最大似然 MDP。`, undefined, 0.005);

S(`What is "sample-based planning" in the lectures?`,
  [`Use the model to compute exact full-width Bellman backups for every state`,`Use the model ONLY to sample simulated experience, then apply a model-free RL algorithm (MC, SARSA, Q-learning) to those samples`,`Use the model to rescale rewards`,`Use the model only at test time, never during learning`], 1,
  `课件中的「基于采样的规划（sample-based planning）」是指？`,
  [`用模型对所有状态计算精确的 full-width 贝尔曼备份`,`只用模型来采样出模拟经验，再把这些样本喂给免模型 RL 算法（MC、SARSA、Q-learning）`,`用模型重新缩放奖励`,`只在测试时使用模型，学习过程中从不使用`],
  `L12 p31：「<b>Use the model ONLY to sample</b>；Sample experience from model, $R_{t+1} = R̂(S_{t},A_{t}), S_{t+1} = P̂(S_{t},A_{t})$；Apply model-free RL to sample（e.g. Monte Carlo, SARSA, Q-learning）」，并评价「Simple but powerful, efficient」。<br>优点是不必枚举所有后继状态（避开 full-width 备份的维数灾难），且可以直接复用所有免模型算法；缺点当然是模型误差会污染模拟经验。<br>p28 还列出其他规划方式：值迭代、策略迭代、树搜索；p44–p45 的 simulation-based search 是采样规划向前搜索的特例。`,
  `采样规划 = 模型只负责「造数据」，算法仍是免模型那一套。`, undefined);

S(`What are the three steps performed for each real transition in Dyna-Q?`,
  [`Only simulated updates are performed`,`Q-learning update on the real experience, model learning from it, then n planning steps in which simulated transitions from previously observed (s,a) pairs update Q`,`Value iteration over all states using the true MDP dynamics`,`A complete Monte Carlo episode is replayed from memory`], 1,
  `Dyna-Q 中每获得一条真实转移，会执行哪三步？`,
  [`只执行模拟更新`,`① 用真实经验做一次 Q-learning 更新；② 用它更新模型；③ 做 n 步规划：从<b>先前见过的</b> (s,a) 出发由模型生成模拟转移，再更新 Q`,`使用真实 MDP 动态在所有状态上做值迭代`,`从记忆中回放一整幕蒙特卡洛轨迹`],
  `L12 p34–p37 的 Dyna 架构：真实经验同时走两条路——<b>Direct RL</b>（直接更新 Q）与 <b>Model Learning</b>（更新 P̂, R̂）；随后进行 n 次 <b>planning</b>：随机取一个<b>之前真实访问过的</b>状态-动作对 (s,a)，由模型采样 (r, s′)，再对 Q 做一次普通 Q-learning 更新。<br>注意两个易错点：① 规划用的是<b>模拟经验</b>而非真实经验，但起点来自已见过的 (s,a)（避免模型在完全没数据的区域外推）；② 规划阶段用的仍是<b>同一个 Q-learning 更新式</b>，所以 Dyna 是「真实 + 模拟」经验喂给同一个免模型算法。`,
  `Dyna-Q = 真实经验（学习+建模）+ n 次模拟规划更新同一个 Q。`, undefined);

S(`What does Dyna-Q+ add compared with Dyna-Q?`,
  [`An exploration bonus for state-action pairs that have not been tried for a long time, so the agent detects changed environments faster`,`A second Q-network used as a target`,`A learning rate that is doubled every episode`,`A distributional return head`], 0,
  `Dyna-Q+ 相比 Dyna-Q 增加了什么？`,
  [`对长时间未被尝试的状态-动作对给予探索奖励，因而能更快察觉环境发生变化`,`增加第二个 Q 网络作为目标网络`,`每一幕把学习率翻倍`,`增加分布式回报输出头`],
  `L12 p42–p43：Dyna-Q+ 给「很久没访问过的 (s,a)」加一个随未访问时长增长的<b>探索奖励（bonus）</b>（课件写 $Q_{t} encourages more explorations; once something is learnt, it will fall off$）。<br>动机：环境可能变化（例如原本的捷径被堵住、或新开了一条更短的路）。普通 Dyna-Q 的模型会一直停留在旧动态的估计上，且策略已收敛后不再探索，无法发现变化；加上 bonus 后，长期未试的动作会逐渐变得「值得一试」，从而更快检测到环境变化并重新规划。<br>课件给出的性能排序：Dyna-Q+ ≻ Dyna-Q ≻ Q-learning（小规模 (s,a) 场景）。`,
  `Dyna-Q+ = 未访问时长 bonus → 鼓励探索 → 更快发现环境变化。`, undefined);

S(`What is simulation-based search in the lectures?`,
  [`Backward dynamic programming that solves every state of the MDP exactly`,`Forward search from the current state using simulated trajectories generated by a model (e.g. Monte Carlo tree search), combined with model-free RL updates on the simulated experience`,`Uniform random action selection without a model`,`$Computing v_π exactly by inverting (I - γP^π)$`], 1,
  `课件中的「基于模拟的搜索（simulation-based search）」是指？`,
  [`在所有状态上精确求解 MDP 的反向动态规划`,`从<b>当前状态</b>出发，用模型生成模拟轨迹做前向搜索（如蒙特卡洛树搜索），并在模拟经验上应用免模型 RL 更新`,`不使用模型的均匀随机选动作`,`通过求逆 (I − γP<sup>π</sup>) 精确计算 v<sub>π</sub>`],
  `L12 p44–p45（David Silver Lecture 8「Simulation-Based Search」）：规划不必一次性解出整个 MDP，只需针对<b>当前状态</b>向前搜索若干条模拟轨迹（forward search / rollout / MCTS），用学到的模型产生 (s,a,r,s′)，再用 SARSA / Q-learning / MC 等免模型方法在模拟经验上更新，从而决定此刻的动作。<br>优势：计算集中在「当下要做的决策」上，与状态空间总规模无关；也是 AlphaGo / MuZero（L1）的核心思想。<br>A、D 是全局精确规划（DP / 矩阵求逆），C 与模型无关，均不符合。`,
  `simulation-based search = 从当前状态向前模拟 + 免模型更新；MCTS 是代表。`, undefined);

S(`In the AB example of sample-based planning, the learned model gives V(B) = 0.75. Why?`,
  [`Because the table-lookup model estimates the expected reward after B as 6/8 = 0.75, and Monte Carlo evaluation on simulated trajectories uses that model`,`Because γ is set to 0`,`Because V(A) was fixed to 1`,`Because the true transition probabilities are known to the agent`], 0,
  `L12 的 AB 采样规划例子中，学到的模型给出 V(B) = 0.75，原因是什么？`,
  [`因为查表模型把 B 之后的期望奖励估为 6/8 = 0.75，蒙特卡洛评估在由该模型采样出的轨迹上进行`,`因为 γ 被设为 0`,`因为 V(A) 被固定为 1`,`因为智能体知道真实转移概率`],
  `L12 p29–p30：先从经验拟合表格模型（8 次 B 的观测中 6 次奖励 1、2 次奖励 0，故 R̂(B) = 6/8 = 0.75），再<b>从模型采样轨迹</b>做蒙特卡洛评估，于是 V(B) ≈ 0.75。<br><b>与 L6 的联系</b>：批量 TD(0) 收敛到的正是「最大似然马尔可夫模型的精确解」（certainty equivalence），所以在 AB 例子里它也给出 V(A) = V(B) = 0.75；而批量 MC 只拟合观测回报，给出 V(A)=0。两处结论同源，是期中综合题常考的串联点。<br>D 错：模型是<b>学出来的</b>，真实 P、R 未知；这正是 model-based RL「两次近似误差」的来源。`,
  `模型采样规划 → V(B)=R̂(B)=6/8；与批量 TD 的确定性等价解一致。`, undefined);

M(`Which statements about integrating learning and planning are correct?`,
  [`Once a model is learned, planning can use value iteration, policy iteration or tree search`,`Direct RL and indirect (model-based) RL can be combined in a single architecture such as Dyna`,`Real experience and simulated experience can update the same value function / policy`,`A learned model introduces no additional approximation error beyond that of the value function`], [0,1,2],
  `关于学习与规划的结合，哪些说法正确？`,
  [`学到模型后，规划可使用值迭代、策略迭代或树搜索`,`直接 RL 与间接（基于模型）RL 可以在 Dyna 这样的单一架构中结合`,`真实经验与模拟经验可以更新同一个价值函数 / 策略`,`学到的模型除了价值函数近似误差外不会引入额外误差`],
  `① ✓ L12 p28：「Use any planning algorithm: Value iteration, Policy iteration, Tree Search」。<br>② ✓ L12 p16 / p32–p37：Dyna 同时包含 direct RL 与 model-based planning 两条路径。<br>③ ✓ L12 p33：Real experience 与 Simulated experience 都进入同一个 Q / V；Dyna-Q 的规划步用的就是与普通 Q-learning 完全相同的更新式。<br>④ ✗ L12 p13 明确指出 model-based RL 有<b>两处</b>近似误差：先学模型有误差，再由模型构造价值函数又有误差；这正是它的主要缺点。<br>另可联系 L3 p42：planning 是「模型已知、只做内部计算」，而 model-based RL 是「先从经验学模型，再规划」，属于两者的结合。`,
  `Dyna = 真实 + 模拟经验更新同一 Q；代价是模型误差 + 价值误差两次近似。`, undefined);

S(`Which of the following is NOT listed in the lectures as a model representation?`,
  [`Table lookup model`,`Linear expectation / linear Gaussian`,`Neural network (e.g. CNN)`,`Eligibility trace`], 3,
  `下列哪一项不是课件列出的模型表示（model representation）？`,
  [`查表模型`,`线性期望 / 线性高斯`,`神经网络（如 CNN）`,`资格迹（eligibility trace）`],
  `L12 p19 列出的模型表示：<b>Table Lookup、Linear Expectation、Basis expansion / Linear Gaussian、Decision Trees、Neural Network（e.g. CNN）</b>。这些都是用来拟合 $P̂(s'|s,a)$ 与 $R̂(s,a)$ 的回归 / 密度模型。<br><b>资格迹</b>是 L6 TD(λ) 后向视图中用于<b>信用分配</b>的机制（E<sub>t</sub>(s)=γλE<sub>t−1</sub>(s)+1），或 L7 Sarsa(λ) 中定义在 (s,a) 上的版本，与环境模型无关，因此不是模型表示。<br>这类题的解题要点是区分「学什么」：模型学的是环境如何转移、给多少奖励；资格迹记录的是哪些状态 / 动作最近被访问过。`,
  `模型表示 = P̂/R̂ 的函数类；资格迹属于 TD(λ) 的信用分配。`, undefined);

/* APPEND MARKER */

const out = [];
Object.keys(B).sort((a,b)=>Number(a)-Number(b)).forEach(n=>{
  B[n].forEach((x,i)=>{
    const id = 'c' + String(n).padStart(2,'0') + '-q' + String(i+1).padStart(2,'0');
    const q = {
      id: id,
      chapter: Number(n),
      number: i+1,
      type: x.t,
      source: x.s,
      key: x.k,
      scored: true,
      en: { stem: x.q },
      zh: { stem: x.zq, explanation: x.e }
    };
    if (x.t === 'numeric') {
      q.answer = { value: x.v, tol: x.tol };
    } else {
      q.en.options = x.o;
      q.zh.options = x.zo;
      q.accepted = x.a.slice().sort((a,b)=>a-b);
    }
    out.push(q);
  });
});
window.QUESTIONS = out;
})();
