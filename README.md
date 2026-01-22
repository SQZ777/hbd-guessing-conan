# 🕵️ 案件檔案：生日特別任務

> **CASE #2026-0122**  
> 一個以柯南偵探風格打造的互動式問答解謎網頁  
> 專為生日驚喜設計的尋寶遊戲

## 📋 專案簡介

這是一個使用 Vue 3 開發的互動式問答網頁，以「名偵探柯南」為主題，透過 4 道精心設計的問題引導使用者找到生日禮物的藏匿地點。整體採用偵探檔案風格，營造推理辦案的沉浸式體驗。

### ✨ 核心特色

- 🎨 **偵探檔案風格設計** - 深藍、黑、灰配色搭配金色點綴
- 🎯 **互動式問答系統** - 支援選擇題與問答題兩種題型
- 🔐 **循序漸進解鎖** - 答對才能進入下一題，答錯留在原地
- 🎬 **精緻動畫效果** - 包含「真相只有一個」彩蛋、CASE CLOSED 印章等
- 📱 **響應式設計** - 手機優先，單手可操作
- 🎁 **最終揭曉** - 引導至禮物藏匿地點

## 🛠️ 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 建構工具 | Vite |
| 路由 | Vue Router 4 |
| 樣式 | SCSS + CSS Variables |
| 語言 | JavaScript |

## 📦 安裝步驟

### 前置需求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安裝

```bash
# 1. 複製專案
git clone <repository-url>
cd hbd-guessing-conan

# 2. 安裝相依套件
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 打開瀏覽器訪問
# http://localhost:3000
```

## 🚀 可用指令

```bash
# 開發模式（熱重載）
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 📁 專案結構

```
hbd-guessing-conan/
├── src/
│   ├── assets/
│   │   └── styles/          # 樣式檔案
│   │       ├── variables.scss   # CSS 變數
│   │       ├── animations.scss  # 動畫定義
│   │       └── main.scss        # 主樣式
│   ├── components/          # 元件（未來擴充用）
│   ├── composables/         # Composition API 邏輯
│   │   └── useGameState.js      # 遊戲狀態管理
│   ├── data/
│   │   └── questions.js         # 題目資料
│   ├── router/
│   │   └── index.js             # 路由設定
│   ├── views/               # 頁面元件
│   │   ├── WelcomePage.vue      # 歡迎頁
│   │   ├── QuestionPage.vue     # 題目頁
│   │   └── FinalPage.vue        # 結案頁
│   ├── App.vue              # 根元件
│   └── main.js              # 應用程式入口
├── index.html               # HTML 模板
├── package.json             # 專案配置
├── vite.config.js           # Vite 配置
├── SPEC.md                  # 技術規格書
└── README.md                # 本文件
```

## 🎮 遊戲流程

1. **歡迎頁** - 展示案件資訊，點擊「開始調查」進入遊戲
2. **題目 1-3** - 選擇題，選對才能進入下一題
3. **題目 4** - 問答題，輸入正確答案「赤井秀一」
4. **結案頁** - 揭曉禮物位置：「異次元的狙擊手」拼圖後面

### 題目列表

| # | 題型 | 題目內容 | 難度 |
|---|------|----------|------|
| 1 | 選擇題 | 數學題：127x5 等於多少 | Normal |
| 2 | 選擇題 | 東京敘敘苑燒肉地點 | Easy |
| 3 | 選擇題 | 「真相只有一個」的口頭禪主人 | Normal |
| 4 | 問答題 | FBI 狙擊手人物檔案 | Hard |

## 🎨 設計規範

### 色彩配置

```scss
--color-bg-primary: #1a1a2e;      // 主背景（深藍）
--color-bg-secondary: #0f0f0f;    // 次背景（黑）
--color-bg-card: #2d2d44;         // 卡片背景（灰）
--color-accent: #e63946;          // 強調色（紅）
--color-gold: #d4a373;            // 金色（線索卡邊框）
--color-success: #06d6a0;         // 成功（綠）
--color-error: #ef476f;           // 錯誤（紅）
```

### 視覺元素

- 打字機風格字體（標題）
- 線索卡片設計
- 指紋浮水印背景
- CASE CLOSED 印章
- 警戒線圖案（結案頁）

## 🔧 自訂題目

修改 `src/data/questions.js` 檔案即可自訂題目：

```javascript
// 選擇題範例
{
  id: 1,
  type: 'choice',
  question: '你的問題？',
  options: ['選項A', '選項B', '選項C', '選項D'],
  answer: '正確答案',
  difficulty: 'Normal'
}

// 問答題範例
{
  id: 4,
  type: 'input',
  question: '請填入答案',
  answer: '正確答案',
  difficulty: 'Hard'
}
```

## 📱 響應式設計

- **手機優先**：所有按鈕最小高度 48px
- **單手操作**：主要操作區域在螢幕中下方
- **字體調整**：使用 `clamp()` 函式自動縮放
- **斷點**：768px（平板/手機）

## 🚢 部署建議

### Vercel（推薦）

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Netlify

```bash
# 建構專案
npm run build

# 上傳 dist 資料夾到 Netlify
```

### GitHub Pages

```bash
# 修改 vite.config.js 加入 base
export default defineConfig({
  base: '/hbd-guessing-conan/',
  // ...
})

# 建構並部署
npm run build
# 將 dist 資料夾內容推送至 gh-pages 分支
```

## 💡 開發提示

### 修改題目後重置進度

遊戲狀態儲存在記憶體中，重新整理頁面即可重置。如需持久化儲存，可在 `useGameState.js` 中加入 `localStorage` 支援。

### 新增動畫效果

所有動畫定義在 `src/assets/styles/animations.scss`，可自由擴充。

### 調整配色

修改 `src/assets/styles/variables.scss` 中的 CSS 變數即可全域套用。

## 📄 授權

本專案為個人生日驚喜專案，未開放授權。

## 🎂 致謝

感謝老婆的陪伴，祝你生日快樂！

> 「真相只有一個——我愛你！」 🔍❤️

---

**CASE CLOSED** 🕵️‍♂️
