// auth, create, view, remove, logout

const jwt = require("jsonwebtoken");
const {userModel, noteModel} = require("../models/data");
require("dotenv").config();


exports.auth = async(req, res, next) => {
    try {
        //extract JWT token
        //const token = req.body.token;
        const token = req.header("Authorization").replace("Bearer ", "");
        //const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success:false,
                message:"token missing",
            });
        }

        //verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "token is invalid",
                });
            }
            // check token's expiration
            const isTokenExpired = decoded.exp < Date.now() / 1000;
            if (isTokenExpired) {
                return res.status(401).json({
                  success: false,
                  message: "Token has expired",
                });
              }

            req.user = decoded; //for later use
        });

        //pass the control
        next();
    }
    catch(error) {
        return res.status(401).json({
            sucess: false,
            message: "something went wrong, while verifying the user",
        });
    }
}

exports.create = async(req, res, next) => {
    try {
        const {title, details, category} = req.body;
        const myNote = await noteModel.create({title, details, category});
        const myUser = await userModel.findOneAndUpdate(
            {_id: req.user.id},
            {$push: {notes: myNote}}
        );
        res.status(200).json({
            success: true,
            message: "Note created successfully",
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: error.message,
        });
    }
}

exports.view = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const userWithNotes = await userModel
         .findById(userId)
         .populate('notes');

        const userNotes = userWithNotes.notes;

        res.status(200).json({
            success: true,
            message: "Notes retrieved successfully",
            data: userNotes,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message,
        });
    }
};


exports.remove = async(req, res, next) => {
    try {
        const noteId = req.params.noteId;

        const deletedNote = await noteModel.findOneAndDelete({_id: noteId});

        await userModel.findOneAndUpdate(
            { _id: req.user.id },
            { $pull: { notes: noteId } }
        );

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message,
        });
    }
}

// will handle this on frontend
/*
exports.logout = async(req, res, next) => {
    try {

    }
    catch(error) {
        
    }
}
*/