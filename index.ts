import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./src/routes";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import config from "./config/config";

const app = express();

if (!dotenv.config()) {
    console.error("Error configurating process environment");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Setting up MONGO
const {
    db: { port, atlas_url }
} = config;

mongoose.connect(atlas_url).catch((err) => {
    console.log("Couldn't connect to Mongo: " + err);
});

mongoose.connection.once("open", () => {
    console.log("MongoDB is fully connected and operational");
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

//Setting up Server
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});

app.get("/", (req, res) => {
    res.json({ Success: "Successfully connected to server" });
});
