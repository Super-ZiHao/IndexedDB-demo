import { useCallback, useEffect, useState } from "react";
import { User } from "../App";

export const useIndexedDB = () => {
  const [db, setDB] = useState<IDBDatabase>();

  useEffect(() => {
    const request = window.indexedDB.open('indexedDB-demo', 4); // 打开数据库

    request.onupgradeneeded = (e) => { // 创建数据库 or 版本升级
      const request = e.target as IDBOpenDBRequest;
      const database =  request.result;
      if (!database.objectStoreNames.contains('users')) {
        database.createObjectStore('users', { autoIncrement: true }) // 创建表
      }
    }
    request.onsuccess = (e) => { // 成功打开
      const request = e.target as IDBOpenDBRequest;
      setDB(request.result);
    }
  }, [])

  // 添加数据
  const onAddUser = useCallback((data: User) => new Promise((resolve, reject) => {
    if (!db) return;
    const transaction = db.transaction(['users'], 'readwrite') // 开启事物
    const usersTable = transaction.objectStore('users') // 拿到需要处理的表
    const req = usersTable.add({
      ...data
    })
    req.onsuccess = e => resolve((e.target as IDBOpenDBRequest).result)
    req.onerror = error => reject(error)
  }), [db])

  const getSexUser = useCallback((sex: '男' | '女') => new Promise((resolve, reject) => {
    if (!db) return;
    const transaction = db.transaction(['users'], 'readwrite'); // 开启事物
    const usersTable = transaction.objectStore('users'); // 拿到需要处理的表
    const sexIndex = usersTable.index('sex');
    const req = sexIndex.getAll(sex);
    req.onsuccess = e => resolve((e.target as IDBOpenDBRequest).result)
    req.onerror = error => reject(error)
  }), [db])

  return {
    db,
    onAddUser,
    getSexUser,
  }
}