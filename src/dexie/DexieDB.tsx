import { Button, Input, Radio, Select, Table } from 'antd';
import { db } from './createDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { ColumnsType } from 'antd/es/table';
import { onAddUser, onDeleteUser, onUpdateUser } from './userTable';
import { useMemo, useState } from 'react';
import { User } from '../App';
function DexieDB() {
  const [id, setId] = useState<string>('');
  const [sex, setSex] = useState<'男' | '女'>('男');
  const [age, setAge] = useState<number>(18);
  const [name, setName] = useState<string>('');

  const aaa = useMemo(() => {
    if (isNaN(Number(id))) return undefined;
    return Number(id);
  }, [id]);

  // 当前查看用户的性别
  const [curentSex, setCurrentSex] = useState<'男' | '女' | '两者'>('两者');
  // 当前数据库中所有的用户数据
  const users = useLiveQuery(() => {
    if (curentSex === '两者') return  db.users.toArray();
    return db.users.where({ sex: curentSex }).toArray()
  }, [curentSex])

  const COLUMNS: ColumnsType<User> = [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '姓名', dataIndex: 'name', key: 'name'},
    {title: '年龄', dataIndex: 'age', key: 'age'},
    {title: '性别', render: (data) => data.sex === 0 ? '女' : '男'},
    {title: '操作', render: (data) => <Button onClick={() => onDeleteUser(data.id)}>删除</Button>}
  ]
  const SELECT_OPTIONS = [
    { value: '女', label: '女' },
    { value: '男', label: '男' },
    { value: '两者', label: '两者' },
  ]

  return (
    <div className='flex column gap-16' style={{ maxWidth: 600, margin: '20px auto' }}>
      <Input placeholder='用户的唯一id，可以不填写' value={id} onChange={(e) => setId(e.target.value)} />
      <Input value={name} placeholder='请输入用户名称' onChange={(e) => setName(e.target.value)} />
      <Input type="number" placeholder='用户年龄' value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <Radio.Group value={sex} onChange={(e) => setSex(e.target.value)}>
        <Radio value='男'>男</Radio>
        <Radio value='女'>女</Radio>
      </Radio.Group>
      <div className='flex gap-16'>
        <Button type="primary" onClick={() => onAddUser({ id: aaa, name, sex, age })}>提交</Button>
        <Button type="primary" onClick={() => onUpdateUser(aaa as number, { id: aaa, name, sex, age })} disabled={!(typeof id === 'number')}>修改</Button>
      </div>

      <div>
        <Select options={SELECT_OPTIONS} value={curentSex} onChange={(e) => setCurrentSex(e)} popupMatchSelectWidth={100} />
      </div>
      <Table dataSource={users} columns={COLUMNS} />
    </div>
  )
}

export default DexieDB
