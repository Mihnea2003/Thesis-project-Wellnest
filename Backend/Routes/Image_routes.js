const express = require('express');
const imageController = require('../Controllers/Image_controller'); 

const router = express.Router();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.get('/:email/images', async (req, res) => {
    try {
      const { email } = req.params;
      const images = await imageController.getUserImages(email);  
      
      if (images.error) {
        return res.status(404).json({ error: images.error });
      }
      
      res.json(images); 
    } catch (error) {
      console.error("Error while fetching user images:", error);
      return res.status(500).json({ error: "Failed to fetch images" });
    }
  });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { userEmail } = req.body;  
    const image = req.file;  

    if (!userEmail || !image) {
      return res.status(400).json({ error: 'User email and image data are required' });
    }

    
    const result = await imageController.uploadImage(userEmail, image);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json(result);  
  } catch (error) {
    console.error("Error while uploading image:", error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
