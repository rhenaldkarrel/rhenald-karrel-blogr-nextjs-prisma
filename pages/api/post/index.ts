import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * POST /api/post
 * Required fields in body: title
 * Optional fields in body: content
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;

  const session = await getSession({ req });

  if (session) {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: session?.user?.email }},
      },
    });

    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized!' });
  }
}