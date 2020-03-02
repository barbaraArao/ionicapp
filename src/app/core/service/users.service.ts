import { Users } from './../../models/users';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: DatabaseService) { }

  save(user: Users) {
    if (user.id > 0) {
      return this.update(user);
    } else {
      return this.insert(user);
    }
  }

  private insert(user: Users) {
    const sql = 'insert into users (name) values (?)';
    const data = [user.nome];

    return this.db.executeSQL(sql, data);
  }

  private update(user: Users) {
    const sql = 'update users set name = ? where id = ?';
    const data = [user.nome, user.id];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'delete from users where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from users where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const user = new Users();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      user.id = item.id;
      user.nome = item.name;
    }
    return user;
  }

  async getAll() {
    const sql = 'select * from users';
    const result = await this.db.executeSQL(sql);
    const users = this.fillusers(result.rows);
    return users;
  }

  async filter(text: string) {
    const sql = 'select * from users where name like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const users = this.fillusers(result.rows);
    return users;
  }

  private fillusers(rows: any) {
    const users: Users[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const user = new Users();
      user.id = item.id;
      user.nome = item.name;
      users.push(user);
    }

    return users;
  }
}
