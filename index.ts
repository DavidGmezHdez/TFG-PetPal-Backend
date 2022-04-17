import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
    EventRouter,
    ProtectorRouter,
    UserRouter,
    PostRouter,
    PetRouter
} from "./src/routes";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const mongoose = require("mongoose");
const config = require("./src/config/config");
const app = express();

if (dotenv.config()) {
    console.error("Error configurating process environment");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Setting up MONGO
const {
    db: { port, atlas_url }
} = config;

mongoose.connect(atlas_url, { useNewUrlParser: true }).catch((err) => {
    console.log("Couldn't connect to Mongo: " + err);
});

mongoose.connection.once("open", () => {
    console.log("MongoDB is fully connected and operational");
});

require("dns").lookup(require("os").hostname(), function (err, add, fam) {
    console.log("addr: " + add);
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
app.use("/api/user", UserRouter);
app.use("/api/event", EventRouter);
app.use("/api/pet", PetRouter);
app.use("/api/post", PostRouter);
app.use("/api/protector", ProtectorRouter);

//Setting up Server
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});

app.get("/", (req, res) => {
    res.json({ Success: "Successfully connected to server" });
});
