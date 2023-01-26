const allowedHosts = [
    'http://localhost:3000',
    'http://localhost:4000'
];

export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedHosts.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Request blocked by CORS policy.'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

