const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const expressConfig = require('./config/expressConfig');

const { initDB } = require('./config/databaseConfig');
const { PORT } = require('./config/env');
const router = require('./routes');
const { auth } = require('./middlewares/authMiddleware')
const { getErrorMessage } = require('./utils/errorHelper');

const app = express();

expressConfig(app);
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());
app.use(auth);
app.use(router);
app.use(getErrorMessage);

initDB();

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))
