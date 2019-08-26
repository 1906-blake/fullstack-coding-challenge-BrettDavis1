import axios from 'axios';
import { environment } from '../environment';

export const listClient = axios.create({
    baseURL: environment.context,
    withCredentials: true
});