require("dotenv").config();

const env = process.env.NODE_ENV;

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || "localhost",
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        atlas_url: process.env.ATLAS_STG_URL
    }
};
const local = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT) || 3000
    },
    db: {
        host: process.env.LOCAL_DB_HOST || "localhost",
        port: parseInt(process.env.LOCAL_DB_PORT) || 27017,
        atlas_url: process.env.ATLAS_STG_URL
    }
};

const config = {
    dev,
    local
};

module.exports = config[env];
