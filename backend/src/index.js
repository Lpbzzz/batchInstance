const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

app.post('/api/rules', async (req, res) => {
  const { ids } = req.body;
  const r = ids.map((e, i) => {
    return {
      id: e,
      name: 'test',
      status: true,
      message: i % 2 === 0 ? '验证错误' : '验证正确'
    }
  })
  res.status(200).send({
    validate: r,
    code: 10000
  })
})

const PORT = process.env.PORT || 3080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
