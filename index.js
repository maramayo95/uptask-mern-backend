import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import usuariosRoutes from './routes/usuariosRoutes.js'
import  proyectoRouter  from './routes/proyectoRoutes.js'
import tareaRoute from './routes/tareasRoutes.js'
import {MongoClient, ServerApiVersion} from 'mongodb'
import cors from 'cors'

const app = express()
app.use(express.json())


app.use("/api/usuarios", usuariosRoutes )
app.use("/api/proyectos", proyectoRouter)
app.use("/api/tareas", tareaRoute)


mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB)

// const uri = process.env.DB;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//  CORS
//const whiteList = ['http://localhost:5173'];

// const corsOptions = {
//     origin: function(origin,callback){
//         console.log(origin)
//         if(whiteList.includes(origin)){
//             callback(null,true)
//         } else {
//             callback(new Error('Error de Cors'))
//         }
//     }
// }

app.use(cors({
    origin: ['http://localhost:5173']
}))

app.listen(process.env.PORT, ()=> console.log(`Listen on port http://localhost:${process.env.PORT}`))

