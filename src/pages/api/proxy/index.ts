import { NextApiResponse } from 'next';
import NextConnect from 'next-connect';
import ApiFactory from '../../../api/factory';

const handler = NextConnect();

export default handler.post(async (req: any, res: NextApiResponse) => {
  try {
    const { _path, _method } = req.query;
    let _body = req.body;
    let _headers = {};

    if (_path == null || !_method) {
      throw {
        response: {
          status: 404,
          data: {},
        },
      };
    }

    const response = await ApiFactory.getInstance()
      .getService('server')
      .request(_path, _body, { method: _method, headers: _headers });

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    }
  }
});
