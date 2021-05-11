import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    title:String, 
    description:String,
    imagePath: String
});

//una Interface es una description de un obj
interface IPhoto extends Document{
    title: string;
    description: string;
    imagePath: string;
}

export default model<IPhoto>('Photo', schema);