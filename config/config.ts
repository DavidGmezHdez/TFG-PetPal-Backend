import dotenv from "dotenv";

dotenv.config();
const env: string = process.env.NODE_ENV || "local";

const dev = {
    db: {
        host: process.env.DEV_DB_HOST || "localhost",
        port: process.env.PORT || 8000,
        atlas_url: process.env.ATLAS_STG_URL
    }
};
const local = {
    db: {
        host: process.env.LOCAL_DB_HOST || "localhost",
        port: process.env.PORT || 8000,
        atlas_url: process.env.ATLAS_STG_URL
    }
};

const config = {
    dev,
    local
};

export default config[env];
