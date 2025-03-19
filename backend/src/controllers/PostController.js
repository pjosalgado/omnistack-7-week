const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');  // sort by createdAt desc
        return res.json(posts);
    }, 

    async store(req, res) {

        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const resizedImage = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)  // width or height to 500 px
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', resizedImage)
            );
        
        fs.unlinkSync(req.file.path);  // deletes the original file

        const post = await Post.create({
            author, 
            place, 
            description, 
            hashtags, 
            image: resizedImage
        });

        req.io.emit('post', post);

        return res.json(post);
    }

};
