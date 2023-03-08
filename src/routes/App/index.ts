import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();


router.use('/users', require('./users').default);
router.use('/auth', require('./auth').default);