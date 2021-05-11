import {Router} from 'express';
const router = Router();

import {getPhotos,createPhoto, getPhoto,deletePhoto,updatePhoto} from '../controllers/photo.controllers';
import multer from '../libs/multer';

router.route('/photos')
    .post(multer.single('image'), createPhoto)
    .get(getPhotos);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);

export default router;