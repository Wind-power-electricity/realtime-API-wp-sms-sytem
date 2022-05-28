import dotenv from 'dotenv'

dotenv.config()

const DB_URL = `${ process.env.MONGO_DB_URL }`;
const PORT = process.env.PORT;
const USB_3G_PORT = process.env.USB_3G_PORT || 'COM7';

export {
    DB_URL,
    PORT,
    USB_3G_PORT
}
