import eventValidation from "./event.validation";
import petValidation from "./pet.validation";
import protectorValidation from "./pet.validation";
import postValidation from "./post.validation";
import userValidation from "./user.validations";

const options = { keyByField: true };

export {
    userValidation,
    protectorValidation,
    petValidation,
    eventValidation,
    postValidation,
    options
};
