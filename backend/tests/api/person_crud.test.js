
const { faker, fa } = require('@faker-js/faker');
const axios = require("axios");
const get_fake_access_token = require('../get_fake_access_token.js');

test('Pagination people must to be ok', async () => {

    let token = await get_fake_access_token();

    const response = await axios.get(`${process.env.BACKEND_URL}/person/`, { 
        headers: { Authorization: 'Bearer ' + token }
    });

    expect(response.status).toBe(200);
});

test('Find person by id must to be ok', async () => {

    let token = await get_fake_access_token();
    let newPerson = await create_person();

    const response = await axios.get(`${process.env.BACKEND_URL}/person/${newPerson.id}`, { 
        headers: { Authorization: 'Bearer ' + token }
    });

    expect(response.status).toBe(200);

    expect(response.data.data).toHaveProperty('id');
    expect(response.data.data).toHaveProperty('name');
    expect(response.data.data).toHaveProperty('email');
    expect(response.data.data).toHaveProperty('active');
});


test('Pagination people must to be ok', async () => {

    let token = await get_fake_access_token();

    let person = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        birth_date: '1999-02-20T03:00:00.000Z',
        active: true
    };

    const response = await axios.post(`${process.env.BACKEND_URL}/person`,
        person,
        { headers: { Authorization: 'Bearer ' + token } }
    );

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('data');

    expect(response.data.data).toHaveProperty('id');
    expect(response.data.data).toHaveProperty('name');
    expect(response.data.data).toHaveProperty('email');
    expect(response.data.data).toHaveProperty('active');
    expect(response.data.data).toHaveProperty('birth_date');
});

test('Delete person by id must to be ok', async () => {

    let token = await get_fake_access_token();
    let newPerson = await create_person();

    const response = await axios.delete(`${process.env.BACKEND_URL}/person/${newPerson.id}`, { 
        headers: { Authorization: 'Bearer ' + token }
    });

    expect(response.status).toBe(200);

    expect(response.data.data).toHaveProperty('id');
    expect(response.data.data).toHaveProperty('name');
    expect(response.data.data).toHaveProperty('email');
    expect(response.data.data).toHaveProperty('active');
});

test('Update person by id must to be ok', async () => {

    let token = await get_fake_access_token();
    let newPerson = await create_person();
    let updatePerson = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        birth_date: '1999-02-20T03:00:00.000Z',
        active: true
    };

    const response = await axios.put(`${process.env.BACKEND_URL}/person/${newPerson.id}`,
        updatePerson,
        { headers: { Authorization: 'Bearer ' + token } }
    );

    expect(response.status).toBe(201);
    expect(response.data.data.name).toBe(updatePerson.name);

    expect(response.data.data).toHaveProperty('id');
    expect(response.data.data).toHaveProperty('name');
    expect(response.data.data).toHaveProperty('email');
    expect(response.data.data).toHaveProperty('active');
});

async function create_person() {
    let token = await get_fake_access_token();

    let person = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        birth_date: '1999-02-20T03:00:00.000Z',
        active: true
    };

    const response = await axios.post(`${process.env.BACKEND_URL}/person`,
        person,
        { headers: { Authorization: 'Bearer ' + token } }
    );

    return response.data.data;
}
