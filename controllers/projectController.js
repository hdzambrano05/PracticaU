const project = require('../models').project_model;
const activity = require('../models').activity_model;
const employ = require('../models').employ_model;

module.exports = {
    list(req, res) {
        return project
            .findAll({})
            .then((project) => res.status(200).send(project))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {

        console.log(req.params.id);
        return project
            .findByPk(req.params.id)
            .then((project) => {
                console.log(project);
                if (!project) {
                    return res.status(404).send({
                        message: 'project Not Found',
                    });
                }
                return res.status(200).send(project);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add(req, res) {
        return project
            .create({
                title: req.body.title,
                description: req.body.description,
                state: req.body.state
            })
            .then((project) => res.status(201).send(project))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return project
            .findByPk(req.params.id)
            .then(project => {
                if (!project) {
                    return res.status(404).send({
                        message: 'project Not Found',
                    });
                }
                return project
                    .update({
                        title: req.body.title || project.title,
                        description: req.body.description || project.description,
                        state: req.body.state || project.state
                    })
                    .then(() => res.status(200).send(project))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return project
            .findByPk(req.params.id)
            .then(project => {
                if (!project) {
                    return res.status(400).send({
                        message: 'project Not Found',
                    });
                }
                return project
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    listFull(req, res) {
        return project
            .findAll({
                include: [{
                    model: activity
                },
                {
                    model: employ
                }
                ]
            })
            .then((project) => res.status(200).send(project))
            .catch((error) => { res.status(400).send(error); });
    },





};