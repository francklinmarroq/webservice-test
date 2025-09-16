import express from 'express'
const app = express();
import dotenv from 'dotenv'


app.use(express.json());
dotenv.config()

const port = process.env.PORT;

app.get('/v1/', (req, res) => {

    
    if (Object.keys(receivedJson).length === 0) {
        return res.status(400).json({ error: "No se recibió un cuerpo de solicitud JSON válido." });
    }

    const verifyToken = req.query.hub_verify_token;

    console.log(verifyToken);
    
});


app.listen(port, () => {
    console.log(`Servidor de eco escuchando en http://localhost:${port}`);
});