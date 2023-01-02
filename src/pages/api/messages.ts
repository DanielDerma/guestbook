import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const messages = async (req: NextApiRequest, res: NextApiResponse) => {
  // const messages = await prisma.example.findMany();
  const messages = await prisma.message.findMany();
  res.status(200).json(messages);
};

export default messages;
