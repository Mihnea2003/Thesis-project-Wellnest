const axios = require('axios');
const db = require('../Database/firebase');  
const userCollection = db.collection('users'); 

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
exports.getUserImages = async (userEmail) => {
  try {
    
    const userDoc = await userCollection.doc(userEmail).get();
    
    if (!userDoc.exists) {
      return { error: 'User not found' };
    }

    const userData = userDoc.data();
    return userData.images || [];  
  } catch (error) {
    console.error("Error fetching images:", error);
    return { error: 'Failed to fetch images' };
  }
};

exports.uploadImage = async (userEmail, image) => {
  try {
    if (!userEmail || !image) {
      return { error: 'User email and image data are required.' };
    }

    
    const imgurResponse = await axios.post('https://api.imgur.com/3/image', image.buffer, {
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/octet-stream',
      },
    });

    const imageUrl = imgurResponse.data.data.link; 

    
    const userDoc = await userCollection.doc(userEmail).get();
    if (!userDoc.exists) {
      return { error: 'User not found' };
    }

    const userData = userDoc.data();

    if (!userData.images) {
  userData.images = [];
}
    userData.images.push({ url: imageUrl, uploadedAt: new Date() });

    
    await userCollection.doc(userEmail).update({ images: userData.images });

    
    return { message: 'Image uploaded successfully', imageUrl };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: 'Failed to upload image' };
  }
};
