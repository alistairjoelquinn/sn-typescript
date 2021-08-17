const express = require('express');

const app = express();
const compression = require('compression');
const path = require('path');
const cookieSession = require('cookie-session');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) => callback(null, req.headers.referer.startsWith('http://localhost:3000')),
});

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const friendshipRoutes = require('./routes/friendshipRoutes');

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sameSite: true,
});

app.use(compression());
app.use(cookieSessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/friendship', friendshipRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening.");
});

require('./socket')(io);
