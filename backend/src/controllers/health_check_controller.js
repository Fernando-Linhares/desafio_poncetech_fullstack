import { app_name, app_version } from "../../config/app.js";

export default async (req, res) => {
     return res.status(200)
     .json({
         application: app_name,
         version: app_version,
         health_check: true
    })
}