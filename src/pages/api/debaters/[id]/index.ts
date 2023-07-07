import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { debaterValidationSchema } from 'validationSchema/debaters';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.debater
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDebaterById();
    case 'PUT':
      return updateDebaterById();
    case 'DELETE':
      return deleteDebaterById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDebaterById() {
    const data = await prisma.debater.findFirst(convertQueryToPrismaUtil(req.query, 'debater'));
    return res.status(200).json(data);
  }

  async function updateDebaterById() {
    await debaterValidationSchema.validate(req.body);
    const data = await prisma.debater.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDebaterById() {
    const data = await prisma.debater.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
