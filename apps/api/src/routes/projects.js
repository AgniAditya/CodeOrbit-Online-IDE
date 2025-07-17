import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/projects  → create
router.post('/', express.json(), async (req, res) => {
  const { name, content, language } = req.body;
  const project = await prisma.project.create({
    data: { name, content, language, ownerId: '38e51793-ea76-4988-b18d-7e233779f918' }, // TODO real auth
  });
  res.json(project);
});

// GET /api/projects/:id  → fetch
router.get('/:id', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
  });
  if (!project) return res.status(404).send('Not found');
  res.json(project);
});

export default router;