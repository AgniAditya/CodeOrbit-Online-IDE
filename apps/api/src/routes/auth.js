import express from 'express'
import { PrismaClient } from '@prisma/client'
import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()

// Redirect User to Github
router.get('/github',(_,res) => {
    const url = 'https://github.com/login/oauth/authorize?' +
    new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      scope: 'user:email',
    });
    res.redirect(url)
})

// Handle Callback
router.get('/github/callback', async (req,res) => {
    const { code } = req.query
    if (!code) return res.status(400).send('Missing Code!');

    // Exchange code for token
    const tokenResp = await 
    fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        }),
    });

    const { access_token } = await 
    tokenResp.json();
    if (!access_token) return res.status(400).send('Bad GitHub token');

    const userResp = await 
    fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    const ghUser = await 
    userResp.json();

    // Upsert user
    const user = await 
    prisma.user.upsert({
        where: { githubId: ghUser.id },
        update: {},
        create: {
        githubId: ghUser.id,
        email: ghUser.email || `${ghUser.login}@users.noreply.github.com`,
        name: ghUser.name || ghUser.login,
        avatar: ghUser.avatar_url,
        },
    });

    // JWT cookie
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
     .redirect(`${process.env.WEB_URL}/projects`);
})

export default router