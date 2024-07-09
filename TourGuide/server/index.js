const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const expressConfig = require('./config/expressConfig');
const { initDB } = require('./config/databaseConfig');
const { PORT } = require('./config/env');
const router = require('./routes');
const { auth } = require('./middlewares/authMiddleware');
const { getErrorMessage } = require('./utils/errorHelper');

const app = express();

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
}
console.log(`Environment PORT: ${process.env.PORT}`);
console.log(`Configured PORT: ${PORT}`);
expressConfig(app);
app.use(cors({ origin: '*', credentials: true }));
// app.use(
//   cors({
//     origin: "https://tour-guide-react-project-001-ama7.vercel.app",
//     credentials: true,
//   })
// );
app.use(cookieParser());
app.use(auth);
app.use(router);
app.use(getErrorMessage);

initDB();

app.listen(PORT, '0.0.0.0', () => console.log(`Server is listening at port ${PORT}`));
