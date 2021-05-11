import {Request,Response} from 'express';
import path from 'path';
import fs from 'fs-extra';
import Photo from '../models/Photo';

export async function getPhotos(req:Request,res:Response): Promise<Response> {
    const photos = await Photo.find();
    console.log(photos)
    return res.send(photos);
}

export async function getPhoto(req:Request,res:Response): Promise<Response>{
    const {id}= req.params;
    const photo = await Photo.findById(id);
    
    return res.json(photo)
}

//Para probar la ruta desde postman seleccionar body y en 'key' hay dos opciones file y text(seleccionar file)
export async function createPhoto(req: Request, res: Response): Promise<Response> {    

    const {title, description} = req.body;
    
    const newPhoto = {
        title,
        description,
        imagePath: req.file.path
    };
    
    const photo = new Photo(newPhoto);
    await photo.save();

    return res.json({
        message:'Photo successfully saved'
    })
}

export async function deletePhoto(req:Request,res:Response): Promise<Response>{
    const { id } = req.params;
    const photo = await Photo.findByIdAndDelete(id);
    if(photo){
        await fs.unlink(path.resolve(photo.imagePath));
        //unlink es el metodo que elimina la imagen de la carpeta uploads y necesita la direccion de la img desde el sist operativo
    }
    return res.json({
        message: "Photo Removed",
        photo
    })
}

export async function updatePhoto(req:Request, res:Response): Promise<Response>{
    const{id} = req.params;
    const {title, description} = req.body;

    const updatedPhoto = await Photo.findByIdAndUpdate(id,{
        title,
        description
    },{new:true});
    
    return res.json({
        message: 'updated Photo',        
        updatedPhoto
    })
}