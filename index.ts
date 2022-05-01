import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import { router } from "./src/utils/routes";
import config from "./config/config";
import logger from "./src/utils/logger";
import { handleError } from "./src/middlewares/errorHandler";

const app = express();

if (!dotenv.config()) {
    logger.error("Error configuration process environment");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Setting up MONGO
const {
    db: { port, atlas_url }
} = config;

mongoose.connect(atlas_url).catch((err) => {
    logger.warn("Couldn't connect to Mongo: " + err);
});

mongoose.connection.once("open", () => {
    logger.warn("MongoDB is fully connected and operational");
});

// Setting up Passport
passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token);
            } catch (error) {
                return done(error);
            }
        }
    )
);
app.use(passport.initialize());

//Setting up Routes
app.use("/api/v1", router);
app.use(handleError);

//Setting up Server
app.listen(port, () => {
    logger.warn(`Server running in port: ${port}`);
});

app.get("/", (req, res) => {
    res.json({ Success: "Successfully connected to server" });
});
