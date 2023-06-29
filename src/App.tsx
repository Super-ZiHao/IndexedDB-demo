import DexieDB from './dexie/DexieDB';
// import IndexedDB from './indexedDB';

export interface User {
  id?: number;
  name: string;
  age: number;
  sex: '男' | '女';
}

function Demo() {
  return (
    <>
      <DexieDB />
      {/* <IndexedDB /> */}
    </>
  )
}

export default Demo
