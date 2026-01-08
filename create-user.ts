```ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getServerSession(req, res, authOptions as any);
  if (!session || (session.user as any).role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });

  const { email, password, name, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ error: 'Missing fields' });

  const existing = await prisma.user.findUnique({ where: { email }});
  if (existing) return res.status(409).json({ error: 'User exists' });

  const hashed = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email, password: hashed, name, role
    }
  });
  return res.status(201).json({ id: newUser.id, email: newUser.email });
}
```