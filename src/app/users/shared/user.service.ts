import {  User } from './user';
import { DatabaseService } from '../../core/service/database.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: DatabaseService) { }

  save(user: User) {
    if (user.id > 0) {
      return this.update(user);
    } else {
      return this.insert(user);
    }
  }

  private insert(user: User) {
    const sql = 'insert into users(name, cpf,  email, senha, data_nascimento, telefone, termos_de_uso) values (?, ?, ? , ?, ? , ? , ?)';
    const data = [user.name, user.cpf, user.email, user.senha, user.data_nascimento, user.telefone, user.termos_de_uso];

    return this.db.executeSQL(sql, data);
  }

  private update(user: User) {
    const sql = 'update users set name = ?, senha = ?, email = ?, telefone = ? where id = ?';
    const data = [user.name, user.senha, user.email, user.telefone, user.id];

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
    const user = new User();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      user.id = item.id;
      user.name = item.name;      
      user.cpf = item.cpf;
      user.email = item.email;
      user.senha = item.senha;
      user.telefone = item.telefone;
      user.data_nascimento = item.data_nascimento;
      user.termos_de_uso = item.termos_de_uso;
    }
    return user;
  }

  async getLogin(cpf : string, senha: string){
    const sql = 'select * from users where cpf = ? and senha = ?';   
    const data = [cpf,senha];
    const result = await this.db.executeSQL(sql, data);
    const users = this.fillUsers(result.rows);
    if(users.length == 0)
    {
      return null
    }
    else 
    {
    return users;
    }

  }

  async getAll() {
    const sql = 'select * from users';
    const result = await this.db.executeSQL(sql);
    const users = this.fillUsers(result.rows);
    return users;
  }

  async filter(text: string) {
    const sql = 'select * from users where name like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const users = this.fillUsers(result.rows);
    return users;
  }

  private fillUsers(rows: any) {
    const users: User[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const user = new User();
      user.id = item.id;
      user.name = item.name;
      user.cpf = item.cpf;
      user.email = item.email;
      user.senha = item.senha;
      user.telefone = item.telefone;
      user.data_nascimento = item.data_nascimento;
      user.termos_de_uso = item.termos_de_uso;
      users.push(user);
    }

    return users;
  }
}
