const axios = require("axios");
const { faker } = require('@faker-js/faker');

let access_token = null;

async function get_fake_access_token() {
    if(!access_token) {

        let user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const res = await axios.post(`${process.env.BACKEND_URL}/auth/register`, user)
        access_token = res.data.data.access_token;
    }

    return access_token;
}

module.exports = get_fake_access_token;