# RL Midterm · Practice Lab

> **本仓库部署信息**：仓库 `xehuosh/slai-RL-midterm-practice.github.io`，分支 `main`，站点根目录 `/(root)`。
> 在 Settings → Pages 启用后访问 **https://xehuosh.github.io/slai-RL-midterm-practice.github.io/**。
> 注意：仓库名以 `.github.io` 结尾并不等于独立域名；只有 `<用户名>.github.io` 才是用户主页站点。

强化学习课程期中刷题网站。纯 HTML / CSS / JavaScript，无构建步骤、无 CDN、无后端、无登录，直接放到 GitHub Pages 即可访问。

界面结构与交互**仿照** [Evan2you/slai-NNtraining-midterm](https://github.com/Evan2you/slai-NNtraining-midterm)，按 RL 课程做了适配与扩展：题目全英文，答案区展开**中文版题目 + 详细中文解析**，并有错题本与进度导出/导入。

## 功能

| 功能 | 说明 |
|---|---|
| 分章节刷题 | 「全部章节」+ 01–12 章**竖排固定在页面最左侧**（任何窗口宽度都不折叠成横向），侧栏显示每章 `已练/总数` |
| 题型 | 单选题 117、多选题 11、计算题 31（数值输入，按容差判分），共 **159 题** |
| 中文对照 | 提交答案后立即显示该英文题的中文题干、中文选项、参考答案 |
| 详细解析 | 每题附中文详解（含公式推导、易错点）与「考点速记」 |
| 练习模式 | 顺序练习 / 随机练习 / 错题复习 / 错题本 |
| 错题本 | 按章节汇总所有「最近一次答错」的题，可批量复习、单独复习、标记已掌握、导出 Markdown |
| 进度导出/导入 | JSON 文件，按时间戳合并记录，可跨设备 / 浏览器同步 |
| 其他 | 答题卡跳题、收藏标记、中英界面切换、键盘快捷键（`A–D` / `1–4` 选项，`Enter` 提交，`←/→` 翻题） |

进度保存在浏览器 `localStorage`（键名 `rl-midterm-progress-v2`）。「重新开始」不删除历史；只有侧栏「清空全部进度」会清空，并有确认提示。

**命题原则**：面向闭卷考试，只考能靠理解、推导与计算得出的内容。已删除「某论文在哪一年 / 多少款游戏 / 报告了几个百分点 / 实验用了几幕」这类必须死记原文数字或专有名词的题目；保留的计算题都在题干里给全数据，答案由公式推出。

## 公式排版

使用**本地内置 KaTeX**（`vendor/katex/`，含 `katex.min.css`、`katex.min.js` 与 20 个 woff2 字体），不依赖任何 CDN，离线也能正常显示。

- 独立公式：`$$...$$`，行内公式：`$...$`。
- **在 `questions.js` 里写 LaTeX 时，反斜杠要写两遍**，例如 `$$G_{t} = \\sum_{k=0}^{\\infty}\\gamma^{k}R_{t+k+1}$$`，因为题干是 JS 模板字符串，`\s` 会被吞掉。
- 公式里可以用 Unicode 希腊字母（γ、π、δ、θ、λ 等），渲染时会自动交给 KaTeX 处理。
- 正文里残留的伪 LaTeX（如 `R_{t+1}`、`γ^k`、`S_t`）由页面自动转成规范的下标 / 上标，不再显示成乱码式的花括号。
- `tools/validate.cjs` 会检查所有公式的 `$` 配对，避免漏写定界符导致整段解析错乱。

## 文件

```
index.html       页面结构
style.css        样式（在参考站配色基础上改为蓝灰主题）
questions.js     题库 + 章节元数据（可直接编辑，无构建步骤）
app.js           交互逻辑
vendor/katex/    本地 KaTeX（CSS、JS、字体），不依赖 CDN
.nojekyll        GitHub Pages 必需
README.md        本说明
tools/validate.cjs  题库完整性校验（开发用，部署时可不上传）
tools/smoke.cjs     jsdom 全流程冒烟测试（开发用，可选）
```

## GitHub Pages 发布

1. 把 `index.html`、`style.css`、`questions.js`、`app.js`、`vendor/`、`README.md`、`.nojekyll` 放在仓库**根目录**（不要只上传 ZIP，也不要多套一层文件夹）。`tools/` 可选。
2. 打开本仓库 **Settings → Pages → Build and deployment**，Source 选 **Deploy from a branch**，Branch 选 `main` + `/(root)`，保存。
3. 等待约 1 分钟，访问 **https://xehuosh.github.io/slai-RL-midterm-practice.github.io/**。

命令行推送示例（需先配置 GitHub 登录凭据 / Personal Access Token）：

```bash
git clone https://github.com/xehuosh/slai-RL-midterm-practice.github.io.git
cd slai-RL-midterm-practice.github.io
# 把本目录全部文件复制进来
git add -A && git commit -m "Add RL midterm practice site" && git push origin main
```

本地也可以直接双击 `index.html`，或起一个静态服务器：

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 题库章节与来源

| 章 | 主题 | 对应课件 / 论文 | 题数 |
|---:|---|---|---:|
| 01 | 引言与经典案例 | `RL_1_Examples`, `RL_2_Introduction` | 10 |
| 02 | 形式化：状态与 MDP | `RL_3_Formulation` | 13 |
| 03 | MP / MRP / MDP 与贝尔曼方程 | `RL_4_MDP(3)` | 15 |
| 04 | 动态规划 | `RL_5_DP(3)` | 14 |
| 05 | 无模型预测 MC / TD / TD(λ) | `RL_6_Model-free Prediction` | 18 |
| 06 | 无模型控制 | `RL_7_Model-free Control` | 17 |
| 07 | 价值函数近似 | `RL_8 Value Function Approximation` | 13 |
| 08 | Nature DQN 2015 | `RL_9 Nature DQN 2015` | 10 |
| 09 | Double DQN / PER / Dueling | `RL_10a DQN+`, `RL_10b PER`, `RL_10c Dueling` | 14 |
| 10 | Rainbow | `RL_10d Rainbow` | 7 |
| 11 | 策略梯度 | `RL_11 Policy Gradient` | 16 |
| 12 | 学习与规划一体化 | `RL_12 Integrated Learning & Planning` | 12 |

内容依据 HKUST 荆炳义老师 RL 课程课件，以及 Mnih et al. (Nature, 2015)、Schaul et al. (PER)、Wang et al. (Dueling)、Hessel et al. (Rainbow) 四篇指定论文。论文原文只用于核对**原理与机制**（经验回放为何必须异策略、Double DQN 如何解耦选择/评估、PER 为何要重要性采样权重、Dueling 的不可辨识性、Rainbow 六项组件等），不考论文里的年份、游戏数量、实验曲线数值。部分概念题改编自 **EasyRL（蘑菇书）** 经典课后习题。**原始课件 PDF 与论文全文不随网页发布。**

课件中的经典例题（Student MRP、Small Gridworld、AB example、Cliff Walking、Jack's Car Rental、Mountain Car）都被改写成了可判分的计算题，答案与推导写在中文解析里。

## 编辑题库

`questions.js` 顶部有三个辅助函数，直接按格式加题即可，无需打包：

```js
CH(3, 'L4 MDP(3)');   // 开始第 3 章，并设置默认「来源」标签

// 单选：英文题干, 英文选项, 正确选项下标, 中文题干, 中文选项, 中文解析, 考点速记, 来源(可省)
S('Which tuple describes an MRP?', ['⟨S,P⟩','⟨S,P,R,γ⟩','⟨S,A,P,R,γ⟩','⟨S,A,P⟩'], 1,
  '哪个元组描述 MRP？', ['⟨S,P⟩','⟨S,P,R,γ⟩','⟨S,A,P,R,γ⟩','⟨S,A,P⟩'],
  '……详细中文解析……', 'MP → MRP → MDP');

// 多选：第三个参数改成「正确下标数组」
M('Which statements are correct?', ['A','B','C','D'], [0,2], '哪些说法正确？', ['甲','乙','丙','丁'], '……', '……');

// 计算题：英文题干, 数值答案, 中文题干, 中文解析, 考点速记, 来源(可省), 容差(可省，默认 0.005)
N('Compute G_t when R=[2,4,6] and γ=0.5.', 5.5, '计算 G_t……', '……', '……', undefined, 0.005);
```

题目字符串支持少量 HTML：`<b>`、`<sub>`、`<sup>`、`<code>`、`<br>`；独立公式用 `$$...$$`、行内公式用 `$...$`（LaTeX 反斜杠写两遍）。**不要写未转义的裸 `<`**（用 `&lt;`）。

章节标题在文件顶部的 `window.BANK_META.chapters` 中修改。删题后题号会自动重排，因此建议同时升级 `app.js` 里的 `KEY` / `FORMAT` 版本号，避免旧进度错配。

修改后运行校验：

```bash
node tools/validate.cjs     # 字段完整性、答案下标、中英选项数量、公式分隔符、HTML 标签配对
node --check app.js
node --check questions.js
# 可选（需先 npm install jsdom）：
NODE_PATH=<workspace>/node_modules node tools/smoke.cjs
```

## 进度文件格式

导出的 JSON：

```json
{
  "format": "rl-midterm-progress-v2",
  "version": 1,
  "exportedAt": "2026-11-06T00:00:00.000Z",
  "lang": "zh",
  "history":  { "c01-q01": { "choice": 1, "time": 1730000000000 } },
  "mastered": { "c03-q04": 1730000000000 },
  "flags":    { "c09-q03": 1730000000000 }
}
```

`choice` 单选/计算题为数字，多选题为下标数组。导入时按时间戳「取更新的一条」合并，不会覆盖本机较新的记录；格式不符的文件会被拒绝并提示。

## 致谢与说明

- 页面结构、配色系统与交互骨架参考 [Evan2you/slai-NNtraining-midterm](https://github.com/Evan2you/slai-NNtraining-midterm)。
- 公式排版使用 [KaTeX](https://katex.org/)（MIT 许可），资源已随站点本地打包。
- 题目为配合课程复习重新编写 / 改编，英文题干与中文讲解均为教学用途；公式与原理以课件及论文原文为准。
- 本站不收集任何数据，不上传任何文件，全部逻辑在浏览器本地运行。
