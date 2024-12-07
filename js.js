const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

// ตั้งค่า Express
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ตั้งค่า OpenAI API
const openai = new OpenAI({
  apiKey: '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', // ใส่ API Key ของ OpenAI ที่นี่
});

// สร้าง endpoint สำหรับการถามคำถาม
app.post('/ask', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // เลือกโมเดลที่ต้องการใช้งาน
      messages: [{ role: 'user', content: req.body.question }],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// เริ่ม server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
