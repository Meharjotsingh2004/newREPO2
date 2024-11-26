import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
await connectDB(); 

const app = express();
//middleWare-->
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    credentials: true, // If cookies are used
  })
);

app.use(express.json())
app.use(morgan('dev'))



//routes
app.use('/api/v1/auth' , authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
  });
  

app.listen(process.env.PORT , ()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})