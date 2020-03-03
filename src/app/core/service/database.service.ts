import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: SQLiteObject;
  databaseName: string = 'barbara.db';

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter) { }

  async openDatabase() {
    try {
      this.db = await this.sqlite.create({ name: this.databaseName, location: 'default' });
      await this.createDatabase();
    } catch (error) {
      console.error('Ocorreu um erro ao criar o banco de dados', error);
    }
  }

  async createDatabase() {
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase);
    return result ? true : false;
  }

  getCreateTable() {
    const sqls = [];
    sqls.push('CREATE TABLE IF NOT EXISTS users (id integer primary key AUTOINCREMENT, name varchar(100),  cpf varchar(11),  email varchar(100), senha varchar(15), data_nascimento DATE, telefone varchar(15), termos_de_uso BOOLEAN);');
    return sqls.join('\n');
  }

  executeSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }
}
