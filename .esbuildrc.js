require("esbuild").build({
    entryPoints: [ "app.ts" ],
    bundle: true,
    minify: true,
    outfile: "app.js",
    platform: "node",
    target: "node14.16",
    external: [ "express", "body-parser", "cors", "bcrypt", "jsonwebtoken", "dotenv", "express-validator", "sequelize" ]
}).catch(() => process.exit(1))