import { ServerResponse } from 'http';

export default (res: ServerResponse, Location = '/') => {
  res.writeHead(301, {
    Location,
  });
  res.end();
};
