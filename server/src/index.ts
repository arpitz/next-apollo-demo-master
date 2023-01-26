import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import {resolvers} from "./resolvers/resolver.js";
import {typeDefs} from "./schema.js";
import {corsOptions} from "./config/corsOptions.js";

interface MyContext {
    token?: string;
}
const PORT = process.env.PORT || 4000;
const app = express();

const httpServer = http.createServer(app);


const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors<cors.CorsRequest>(corsOptions),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/`);
