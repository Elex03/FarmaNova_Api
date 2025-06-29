import {Router} from 'express';
import { getMedicinePerCoincidence } from '../controllers/services/whatsapp.controller';


const serviceRoute = Router();


serviceRoute.get('/', getMedicinePerCoincidence);


export default serviceRoute;