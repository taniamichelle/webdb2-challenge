exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { make: 'Tesla', model: 'S', vin: '0000000', mileage: '0', price: '75k' },
        { make: 'Toyota', model: 'Rav4', vin: '111111', mileage: '0', price: '28k' }
      ]);
    });
};
