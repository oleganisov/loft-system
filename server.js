const { server } = require('./app');
require('dotenv').config();

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
