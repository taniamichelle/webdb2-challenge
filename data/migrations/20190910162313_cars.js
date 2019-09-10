exports.up = function (knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments(); // get a primary key called 'id' (default) that autoincrements
        tbl.text('make', 128)
            .notNullable();
        tbl.text('model', 128)
            .notNullable();
        tbl.string('vin')
            .unique()
            .notNullable();
        tbl.string('mileage')
            .notNullable();
        tbl.string('price')
            .notNullable();
    });
};

// revert changes from the up function
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars');
};
