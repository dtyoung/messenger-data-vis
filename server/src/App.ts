import express, { Request, Response } from 'express';
import db from './data/db';
import parseMessages from './services/parseMessages';

const app = express();

parseMessages();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.get('/chat_names', async (req: Request, res: Response) => {
  db.chatNames.find({}, (_: any, docs: any) => {
    res.status(200).send(docs);
  });
});

app.get('/chat/:chatTitle', async (req: Request, res: Response) => {
  const { chatTitle } = req.params;
  db.messages.find({ chatTitle }, (_: any, docs: any) => {
    res.status(200).send(docs);
  });
});

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Server Started at Port, 8000');
});
