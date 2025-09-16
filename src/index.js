import express from 'express'
const app = express();
import dotenv from 'dotenv'


app.use(express.json());
dotenv.config()

const port = process.env.PORT;

app.get('/v1/', (req, res) => {

    
   

    const verifyToken = req.query.hub_verify_token;
    
    console.log(req.query);
    console.log(verifyToken);
    
});

1
app.listen(port, () => {
    console.log(`Servidor de eco escuchando en http://localhost:${port}`);
});