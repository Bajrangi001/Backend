const Upload = require('../models/Upload');

const uploadFile = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // MongoDB me save karo
        const newUpload = new Upload({
            title,
            description,
            fileName: file.filename,
            filePath: `/uploads/${file.filename}`
        });

        await newUpload.save();

        res.status(201).json({
            message: 'File uploaded & saved to DB successfully',
            data: newUpload
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { uploadFile };