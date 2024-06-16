import express from 'express';
import { getLatestContent } from './lastContent.controllers.js';

const router = express.Router();

router.get('/latest', getLatestContent);

export default router;
