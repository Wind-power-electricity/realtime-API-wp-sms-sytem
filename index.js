// noinspection JSValidateTypes,JSUnusedGlobalSymbols

import express from 'express'
import { PORT, USB_3G_PORT } from './config/variables'
import cors from 'cors'
import http from 'http'
import socketIO from 'socket.io';

import orderRouter from './controllers/order'
import mongoLoader from './config/db';
import smsRouter from './controllers/sms';

const app = express()
const server = http.createServer( app )
const io = socketIO( server, {
    transports: [ 'polling' ],
    cors: {
        cors: {
            origin: 'http://localhost:3000'
        }
    }
} )

export { io };

export default ( async () => {
    try {
        await Promise.all( [ mongoLoader() ] );

        io.on( 'connection', ( socket ) => {
            console.log( 'A user is connected' );
            socket.on( 'message', ( message ) => {
                console.log( `message from ${ socket.id } : ${ message }` );
            } )
            socket.on( 'disconnect', () => {
                console.log( `socket ${ socket.id } disconnected` );
            } )
        } )

        app.use( express.json() )
        app.use( cors() )
        app.use( '/orders', orderRouter )
        app.use( '/sms', smsRouter )
        app.get( '/', ( req, res ) => {
            res.send( 'Hello' )
        } )

        server.listen( PORT, () => {
            console.log( `Server up and running on port ${ PORT }` );
        } )

    } catch ( err ) {
        console.error( err );
    }
} )();
