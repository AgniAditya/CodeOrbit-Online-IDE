import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import projectsRoutes from './routes/projects.js'

const app = express();
app.use(cors({ origin: process.env.WEB_URL, credentials: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/',(_,res) => {
    res.json({status:'Api is listening'})
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`[api] listening on http://localhost:${PORT}`));