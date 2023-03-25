import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  const session = await getSession({ req })

  if (session) {
    const post = await prisma.post.update({
      where: { id: String(postId) },
      data: { published: true },
    });
    res.json(post);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}