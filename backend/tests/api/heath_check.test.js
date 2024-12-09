
test('Application Health Check', async () => {
    let axios = require('axios');

    const res = await axios.get(`${process.env.BACKEND_URL}/`);

    expect(res.status).toBe(200);
    expect(res.data.health_check).toBe(true);
})