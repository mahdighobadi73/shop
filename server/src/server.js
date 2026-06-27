const express = require( "express" );
const cors = require( "cors" );
const dotenv = require( "dotenv" );
const connectDB = require( "./config/db" );
const config = require( "./config/config" );
const routes = require( "./routes" );
const errorMiddleware = require( "./middlewares/errorMiddleware" );

dotenv.config();
connectDB();

const app = express();

app.use(
    cors( {
        origin: config.clientUrl,
        credentials: true,
    } )
);

app.use( express.json() );

app.get( "/api/health", ( req, res ) => {
    res.json( { message: "API is running" } );
} );

app.use( "/api", routes );

app.use( errorMiddleware );

app.listen( config.port, () => {
    console.log( `Server running on port ${ config.port }` );
} );
