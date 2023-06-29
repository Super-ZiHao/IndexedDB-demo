import { Button, Input, Radio } from 'antd';
import { useState } from 'react';
import { useIndexDB } from './fun';
function IndexedDB() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(18);
  const [sex, setSex] = useState<'男'|'女'>('男');

  const { addUser, getUsers, getSexUser } = useIndexDB();

  return (
    <div className='flex column gap-16' style={{ maxWidth: 600, margin: '20px auto' }}>
      <Input value={name} placeholder='请输入用户名称' onChange={(e) => setName(e.target.value)} />
      <Input type="number" placeholder='用户年龄' value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <Radio.Group value={sex} onChange={(e) => setSex(e.target.value)}>
        <Radio value='男'>男</Radio>
        <Radio value='女'>女</Radio>
      </Radio.Group>
      <div className='flex gap-16'>
        <Button type="primary" onClick={() => addUser({name, age, sex})}>提交</Button>
        <Button type="primary" onClick={() => getUsers()}>获取</Button>
        <Button type="primary" onClick={() => getSexUser()}>获取男</Button>
      </div>
    </div>
  )
}

export default IndexedDB
