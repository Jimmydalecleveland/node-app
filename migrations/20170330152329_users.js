
exports.up = function(knex, Promise) {
  return knex.raw(`
    CREATE TABLE users (
      id int(10) unsigned NOT NULL AUTO_INCREMENT,
      username varchar(45) NOT NULL,
      password varchar(45) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
  `)
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users")
};
