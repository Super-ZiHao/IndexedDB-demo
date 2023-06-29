import { message } from "antd"
import { db } from "./createDB"
import { User } from "../App";

/** 增加用户数据 */
export const onAddUser = async ({ id: id2, name, age, sex }: User) => {
  if (!name || !age || !sex) return message.error('用户数据不完整');
  try {
    const id = await db.users.add({
      id: id2 ? Number(id2) : undefined,
      name,
      age: Number(age),
      sex,
    })
    message.success(`添加成功，id 为：${id}`)
  } catch (error) {
    message.error(`添加失败 ${error}`)
  }
}

/** 修改用户数据 */
export const onUpdateUser = async (id: number, data: User) => {
  try {
    await db.users.update(id, data);
    message.success(`更新成功：${id}`)
  } catch (error) {
    message.error(`更新失败 ${error}`)
  }
}

/** 删除用户数据 */
export const onDeleteUser = async (id: number) => {
  try {
    await db.users.delete(id);
    message.success(`删除成功，id 为：${id}`)
  } catch (error) {
    message.error(`删除失败 ${error}`)
  }
};