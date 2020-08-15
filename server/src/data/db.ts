import Datastore from 'nedb';

const db = {
  messages: new Datastore(),
  chatNames: new Datastore(),
};

db.messages.ensureIndex({ fieldName: 'chatTitle' });

db.chatNames.ensureIndex({ fieldName: 'title', unique: true });

export default db;
