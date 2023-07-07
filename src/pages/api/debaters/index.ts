import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { debaterValidationSchema } from 'validationSchema/debaters';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDebaters();
    case 'POST':
      return createDebater();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDebaters() {
    const data = await prisma.debater
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'debater'));
    return res.status(200).json(data);
  }

  async function createDebater() {
    await debaterValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.comment?.length > 0) {
      const create_comment = body.comment;
      body.comment = {
        create: create_comment,
      };
    } else {
      delete body.comment;
    }
    if (body?.post?.length > 0) {
      const create_post = body.post;
      body.post = {
        create: create_post,
      };
    } else {
      delete body.post;
    }
    if (body?.video?.length > 0) {
      const create_video = body.video;
      body.video = {
        create: create_video,
      };
    } else {
      delete body.video;
    }
    const data = await prisma.debater.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
