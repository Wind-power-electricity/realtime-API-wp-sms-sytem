import express from 'express'
import Message from '../models/message';
import { USB_3G_PORT } from '../config/variables';

const SmsTransceiver = require( 'node-sms-transceiver' );
const smsTransceiver = new SmsTransceiver( USB_3G_PORT, { baudRate: 115200 } );

const smsRouter = express.Router()

smsRouter.post( '/send/', async ( req, res ) => {
    try {
        const message = new Message( req.body );
        await message.save();
        // Open the serial port
        await smsTransceiver.open();
        // Send message
        await smsTransceiver.sendMessage(req.body?.phoneNumber, req.body?.content);
        // Close the serial port
        await smsTransceiver.close();
        // res.status( 201 ).send( message );
        res.status( 201 ).send({message: 'Send message successfully in main'});
    } catch ( error ) {
        // Close the serial port
        await smsTransceiver.close();
        if ( error.message.includes( 'TIMEOUT:')) {
            console.error('error.message: ', error.message);
            // // Open the serial port
            // await smsTransceiver.open();
            // const storedMess = await smsTransceiver.sendStoredMessage(7);
            // console.log('storedMess: ', storedMess);
            // await smsTransceiver.close();
            res.status( 201 ).send({message: 'Send message successfully'});
        } else {
            console.error(error.message);
            res.send( error )
        }
    }
} )

export default smsRouter
