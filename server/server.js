import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import './config/instrument.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRouter from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRouter from './routes/jobRoutes.js'
import userRouter from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'

// initialize express
const app = express()

//connect to database
await connectDB()
await connectCloudinary()

// middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


// Routes
app.get('/', (req, res) => res.send("API is on"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRouter)
app.use('/api/jobs', jobRouter)
app.use('/api/users', userRouter)


// Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})