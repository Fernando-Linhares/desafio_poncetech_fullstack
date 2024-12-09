import Person from "../models/Person.js";
import { validationResult } from "express-validator";

const person_crud_controller = {
    create: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        let person = await Person.create({ data: req.body });

        return res.status(201).json({data: person});
    },

    delete: async (req, res) => {
        let id = Number(req.params['id']);

        let person = await Person.findFirst({
            where: { id }
        })

        if(!person) {
            return res.status(404).json({
                error: 'No such person with this id'
            })
        }

        person = await Person.delete({
            where: {id}
        })

        return res.status(200).json({data: person});
    },
    
    index: async (req, res) => {
        let people = await Person.findMany();

        people = people.map(person => {
            const padZero = (num) => (num < 10 ? `0${num}` : num);

            let birthDate = new Date(person.birth_date);
            person.birth_date = `${padZero(birthDate.getUTCDate())}/${padZero(birthDate.getUTCMonth() + 1)}/${birthDate.getUTCFullYear()}`;

            return person;
        });
        
        return res.json({
            data: people
        });
    },

    show: async (req, res) => {
        let id = Number(req.params['id']);

        let person = await Person.findFirst({
            where: { id }
        })

        if(!person) {
            return res.status(404).json({
                error: 'No such person with this id'
            })
        }

        return res.status(200).json({data: person});
    },

    update: async (req, res) => {

        let id = Number(req.params['id']);
        let { name, email, birth_date, active } = req.body;

        let person = await Person.update({
            data: {
                name,
                email,
                birth_date,
                active,
                updated_at: new Date(),
            },
            where: {
                id: id
            }
        });

        return res.status(201).json({data: person});
    }
}

export default person_crud_controller;