import Dexie, { Table } from 'dexie';
import { User } from '../App';

// export const db = new Dexie('dexieDB');
// db.version(1).stores({
//   users: '++id, name, age',
// });


export class MySubClassedDexie extends Dexie {
  users!: Table<User>; 

  constructor() {
    super('dexieDB');
    this.version(1).stores({
      users: '++id, name, age, sex',
    });
  }
}

export const db = new MySubClassedDexie();