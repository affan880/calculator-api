const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  console.log(req.body)

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  let result;

  switch (operation) {
    case 'add':
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case 'subtract':
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case 'multiply':
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case 'divide':
      if (parseFloat(num2) === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero' });
      }
      result = parseFloat(num1) / parseFloat(num2);
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation' });
  }

  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
