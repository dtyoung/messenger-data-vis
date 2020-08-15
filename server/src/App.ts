import express, { Request, Response } from 'express';

import parseMessages from './services/parseMessages';

const app = express();

parseMessages();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Server Started at Port, 8000');
});
