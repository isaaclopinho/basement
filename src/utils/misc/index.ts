import { ServerResponse } from 'http';

export const redirects = (res: ServerResponse, Location = '/') => {
  res.writeHead(301, {
    Location,
  });
  res.end();
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
