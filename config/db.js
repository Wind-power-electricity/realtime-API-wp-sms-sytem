import mongoose from 'mongoose'
import { DB_URL } from './variables'

const mongoLoader = async () => {
    await mongoose
        .connect( DB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        } )
        .then( () => {
            console.log( 'Mongo DB connected successfully' );
        } )
        .catch( ( err ) => {
            console.error( 'Failed connect Mongo DB', err );
            process.exit();
        } );
};

export default mongoLoader;
