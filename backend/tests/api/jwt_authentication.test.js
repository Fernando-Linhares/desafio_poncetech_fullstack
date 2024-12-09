const { faker } = require('@faker-js/faker');
const axios = require("axios");
const get_fake_access_token = require('../get_fake_access_token.js');

test('User login must to be ok', async () => {

    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    await axios.post(`${process.env.BACKEND_URL}/auth/register`, user)

    const res = await axios.post(`${process.env.BACKEND_URL}/auth/login`, {
        email: user.email,
        password: user.password
    });

    expect(res.status).toBe(200);
});

test('User register must to be ok', async () => {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    const res = await axios.post(`${process.env.BACKEND_URL}/auth/register`, user)

    expect(res.status).toBe(200);
});

test('Validation register must to be ok', async () => {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

     await axios.post(`${process.env.BACKEND_URL}/auth/register`, user);

     axios.post(`${process.env.BACKEND_URL}/auth/register`, user)
         .catch(err => {
             expect(err.response.data.errors[0].msg).toBe('Email is already in use');
             expect(err.response.status).toBe(400);
         });
});


test('Validation login must to be ok', async () => {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    await axios.post(`${process.env.BACKEND_URL}/auth/register`, user);

    axios.post(`${process.env.BACKEND_URL}/auth/login`, {
        email: user.email,
        password: "000000000"
    }) .catch(err => {
        expect(err.response.data.authError).toBe('Invalid email or password');
        expect(err.response.status).toBe(401);
    });
});

test('Validation login must to be ok', async () => {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    await axios.post(`${process.env.BACKEND_URL}/auth/register`, user);

    axios.post(`${process.env.BACKEND_URL}/auth/login`, {
        email: user.email,
        password: "000000000"
    }) .catch(err => {
        expect(err.response.data.authError).toBe('Invalid email or password');
        expect(err.response.status).toBe(401);
    });
});

test('Request me most be ok', async () => {

    const access_token = await get_fake_access_token();

    const response = await axios.get(`${process.env.BACKEND_URL}/auth/me`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    expect(response.status).toBe(200);
});

test('Request me most be ok', async () => {
    const access_token = await get_fake_access_token();

    const response = await axios.get(`${process.env.BACKEND_URL}/auth/me`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    expect(response.status).toBe(200);
});


test('Refresh token most be ok', async () => {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    const registerRes = await axios.post(`${process.env.BACKEND_URL}/auth/register`, user);

    const access_token = registerRes.data.data.access_token;
    const refresh_token = registerRes.data.data.refresh_token;

    const response = await axios.put(`${process.env.BACKEND_URL}/auth/refresh/${refresh_token}`, {}, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })

    expect(response.status).toBe(201);
});

test('Authentication token must to be ok', async () => {
    const access_token = await get_fake_access_token();

    const authRes = await axios.get(`${process.env.BACKEND_URL}/auth/me`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    expect(authRes.status).toBe(200);

    const failToken = access_token + '-s$a12A062';

    axios.get(`${process.env.BACKEND_URL}/auth/me`, {
        headers: {
            Authorization: 'Bearer ' + failToken
        }
    }).catch(error => {
        expect(error.response.status).toBe(403);
        expect(error.response.data.message).toBe('Invalid token.');
    });
});
