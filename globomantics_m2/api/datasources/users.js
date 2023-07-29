const { DataSource } = require("apollo-datasource");
const lodashId = require("lodash-id");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./data/users.json");
const db = low(adapter);
db._.mixin(lodashId);

class UserDataSource extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.db = db.get("users");
  }

  getUsers(args) {
    return this.db.value();
  }

  getUserById(id) {
    return this.db.getById(id).value();
  }

  createUser(user) {
    return this.db.insert(user).write();
  }

  getUserByEmail(email) {
    return this.db.find({ email }).value();
  }
}

module.exports = UserDataSource;
