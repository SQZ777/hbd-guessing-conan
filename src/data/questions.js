// 題目資料結構
// Question: { id, type, question, options, answer, hint, difficulty }

export const questions = [
  {
    id: 1,
    type: 'choice',
    question: '先來一題簡單的數學題，127x5 等於多少',
    options: ['655', '645', '635', '625'],
    answer: '635',
    difficulty: 'Normal'
  },
  {
    id: 2,
    type: 'choice',
    question: '我們曾經在東京吃的敘敘苑燒肉地點是在哪裡？',
    options: ['東京鐵塔', '晴空塔', '台場自由女神像', '雷門'],
    answer: '晴空塔',
    difficulty: 'Easy'
  },
  {
    id: 3,
    type: 'choice',
    question: '真相只有一個，是誰的口頭禪？',
    options: ['前柯市長柯啊北', '藝人柯震東', '數學家柯西', '江戶川柯南'],
    answer: '江戶川柯南',
    difficulty: 'Normal'
  },
  {
    id: 4,
    type: 'input',
    question: '📁 人物檔案\n身分：FBI\n專長：狙擊\n特徵：針織帽\n請填入人物姓名。',
    answer: '赤井秀一',
    hint: '這是最重要的線索...',
    difficulty: 'Hard'
  }
]
