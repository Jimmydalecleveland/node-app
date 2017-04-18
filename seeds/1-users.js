
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Richter Belmont', password: 'whips'},
        {id: 2, username: 'Dracula', password: 'blood'},
        {id: 3, username: 'Alucard', password: 'blood'}
      ]);
    });
};
