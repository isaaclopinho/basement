import { NextApiRequest, NextApiResponse } from 'next';
import NextConnect from 'next-connect';

const handler = NextConnect();

export default handler.get(async (req: any, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
});
