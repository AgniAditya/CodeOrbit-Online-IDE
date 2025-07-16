import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors());
app.get('/', (_req, res) => res.json({ status: 'API is up' }));

app.listen(PORT, () => console.log(`[api] listening on http://localhost:${PORT}`));