import Datastore from 'nedb';

const db = {
  messages: new Datastore(),
  chatNames: new Datastore(),
};

export default db;
