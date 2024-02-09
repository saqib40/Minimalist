// auth, create, view, remove, logout

const jwt = require("jsonwebtoken");
const {userModel, noteModel} = require("../models/data");
require("dotenv").config();

/*
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
*/

exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Token missing",
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const isTokenExpired = decoded.exp < Date.now() / 1000;
        if (isTokenExpired) {
            return res.status(401).json({
                success: false,
                message: "Token has expired",
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the user",
        });
    }
};


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
        const username = userWithNotes.username;

        res.status(200).json({
            success: true,
            username: username, // the change
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

// the uploading scene starts from here

function isFileTypeSupported(type, supportedTypes) {
    return  supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    try {
        const options = { folder }; // Set the folder where the file will be stored in Cloudinary
        options.resource_type = "auto"; // Detect the type of resource being uploaded
        
        // Add transformation parameters for resizing the image to 200px x 200px
        options.transformation = [{ width: 200, height: 200, crop: "fill" }];
        
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(file.tempFilePath, options);
        
        return response;
    } catch (error) {
        console.error(error);
    }
}


exports.upload = async(req, res, next) => {
    try {
        // fetch uploaded file
        const file =req.files.file;

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];

        // to find extension of file from file name we split it's name
        const fileType = `${file.name.split(".")[1]}`.toLowerCase();
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return response.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }

        // if supported types, proceed with upload
        const response = await uploadFileToCloudinary(file, "codehelp");

        // update the DB accordingly
        const myUser = await userModel.findOneAndUpdate(
            {_id: req.user.id},
            {profileURL: response.secure_url}
        );

        res.status(200).json({
            success: true,
            message: "Image successfully uploaded",
        });
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}