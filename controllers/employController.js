const project = require('../models').project_model;
const employ = require('../models').employ_model;
const activity = require('../models').activity_model;
const db = require('../models');
module.exports = {
    list(req, res) {
        return employ
            .findAll({})
            .then((a) => res.status(200).send(a))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return employ
            .findByPk(req.params.id)
            .then((a) => {
                console.log(a);
                if (!a) {
                    return res.status(404).send({
                        message: 'employ Not Found',
                    });
                }
                return res.status(200).send(a);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add(req, res) {
        return employ
            .create({
                name: req.body.name,
                description: req.body.description,
                id_project: req.body.id_project
            })
            .then((a) => res.status(201).send(a))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return employ
            .findByPk(req.params.id)
            .then(employ => {
                if (!employ) {
                    return res.status(404).send({
                        message: 'employ Not Found',
                    });
                }
                return employ
                    .update({
                        name: req.body.name || employ.name,
                        description: req.body.description || employ.description,
                        id_project: req.body.id_project || employ.id_project
                    })
                    .then(() => res.status(200).send(employ))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return employ
            .findByPk(req.params.id)
            .then(employ => {
                if (!employ) {
                    return res.status(400).send({
                        message: 'employ Not Found',
                    });
                }
                return employ
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    listFull(req, res) {
        return employ
            .findAll({
                attributes: ['id', 'name', 'lastname', 'email'],
                include: [{
                    attributes: ['id', 'description'],
                    model: project,
                    include:
                        [{
                            attributes: ['id', 'name', 'description'],
                            model: activity
                        }

                        ]
                },
                ]
            })
            .then((project) => res.status(200).send(project))
            .catch((error) => { res.status(400).send(error); });
    },

    listEnableFull(req, res) {
        return employ
            .findAll({
                attributes: ['id', 'name'],
                include: [{
                    attributes: ['id', 'description'],
                    model: project,

                    include: [{
                        attributes: ['id', 'name', 'description'],
                        model: activity
                    }]
                },
                ],
                order: [
                    ['name', 'ASC']
                ]
            })
            .then((employ) => res.status(200).send(employ))
            .catch((error) => { res.status(400).send(error); });
    },
    
    getSQL(req, res) {

        return db.sequelize.query("SELECT * FROM employ")
            .then((result) => {
                console.log(result);
                if (!result) {
                    return res.status(404).send({
                        message: 'result Not Found',
                    });
                }
                return res.status(200).send(result[0]);
            })
            .catch((error) =>
                res.status(400).send(error));
    },
};
