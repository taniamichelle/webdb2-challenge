const express = require('express');
const knex = require('knex');
const db = require('../data/db-config');
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving cars." });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars').where({ id }).first()
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving car by id." });
        });
});

router.post('/', (req, res) => {
    const carData = req.body;
    db('cars').insert(carData)
        .then(ids => {
            db('cars').where({ id: ids[0] })
                .then(newCarEntry => {
                    res.status(201).json(newCarEntry);
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).json({ error: "Error with that id." })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error creating new car entry." });
        });
});

router.put('/:id', (req, res) => {
    const updated = req.body;
    db('cars')
        .where('id', req.params.id)
        .update(updated)
        .then(count => {
            res.status(200).json({ message: `Updated ${count} car record.` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error updating car entry." });
        });
});

router.delete('/:id', (req, res) => {
    db('cars')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json({ message: `Deleted ${count} car record.` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error deleting car entry." });
        });
});

module.exports = router;