require( "dotenv" ).config();

module.exports = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};
