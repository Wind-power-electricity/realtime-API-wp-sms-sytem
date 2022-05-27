import express from 'express'
import Message from '../models/message';

const GSM = require("nodegsm");
const gsm = new GSM('ttyUSB0');

const smsRouter = express.Router()

smsRouter.post( '/send/', async ( req, res ) => {
    try {
        const message = new Message( req.body );
        await message.save();
        await gsm.connect();
        console.log('Connected to serial modem');
        await gsm.check();
        console.log('Modem OK\n');
        res.status( 201 ).send( message );
    } catch ( error ) {
        res.send( error )
    } finally {
        gsm.disconnect();
    }
} )

export default smsRouter
