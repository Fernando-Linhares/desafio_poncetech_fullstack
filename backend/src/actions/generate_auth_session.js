import { app_key } from "../../config/app.js";
import jwt from "jsonwebtoken";

export default user => {
    const access_token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    }, app_key, { expiresIn: '1h' });

    const refresh_token = jwt.sign({
        id: user.id,
        email: user.email,
        password: user.password
    }, app_key, { expiresIn: '1h' });

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    return {
        access_token,
        refresh_token,
        expires_at: expires.getTime()
    };
}