import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { Message } from '../types/messenger';
import db from '../data/db';

function parseRawMessage(message: any, title: string) {
  // Only parse messages that have content for right now
  if (!message.content) {
    return null;
  }

  const parsedMessage: Message = {
    chatTitle: title,
    senderName: message.sender_name,
    timestampMs: message.timestamp_ms,
    content: message.content,
    type: message.type,
  };

  return parsedMessage;
}

function storeChatData(messageData: any) {
  const { title } = messageData;

  const messages: any[] = [];

  messageData.messages.forEach((message: any) => {
    const parsedMessage = parseRawMessage(message, title);

    if (parsedMessage) {
      messages.push(parsedMessage);
    }
  });

  db.messages.insert(messages);
  db.chatNames.insert({
    title,
  });
}

function parseMessageFile(messageFilePath: string) {
  const rawMessageFile = fs.readFileSync(messageFilePath, 'utf8');
  const messageData = JSON.parse(rawMessageFile);

  storeChatData(messageData);
}

export default function parseMessages() {
  const messagesDirectory = path.resolve(process.cwd(), '..', 'messages', 'inbox');
  const chats = fs.readdirSync(messagesDirectory);

  chats.forEach((dir) => {
    const messageFiles = glob.sync('message_*.json', { cwd: path.resolve(messagesDirectory, dir) });

    messageFiles.forEach((messageFileName) => {
      const messageFilePath = path.resolve(messagesDirectory, dir, messageFileName);

      parseMessageFile(messageFilePath);
    });
  });
}
