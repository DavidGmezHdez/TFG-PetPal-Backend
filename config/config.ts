// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const env: string = process.env.NODE_ENV || "local";

const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || "localhost",
        port: process.env.DEV_DB_PORT || 8000,
        atlas_url: process.env.ATLAS_STG_URL
    }
};
const local = {
    app: {
        port: process.env.TEST_APP_PORT || 3000
    },
    db: {
        host: process.env.LOCAL_DB_HOST || "localhost",
        port: process.env.LOCAL_DB_PORT || 8000,
        atlas_url: process.env.ATLAS_STG_URL
    }
};

const config = {
    dev,
    local
};

export default config[env];
