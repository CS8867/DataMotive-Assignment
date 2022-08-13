import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('user', UserSchema);

export const userSchema = userModel.Schema;
export default userModel;
