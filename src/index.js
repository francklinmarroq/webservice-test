import express from 'express'
const app = express();
import dotenv from 'dotenv'


app.use(express.json());
dotenv.config()

const port = process.env.PORT;

app.post('/v1/', (req, res) => {
    const receivedJson = req.body;
    
    if (Object.keys(receivedJson).length === 0) {
        return res.status(400).json({ error: "No se recibió un cuerpo de solicitud JSON válido." });
    }
    
    res.json(receivedJson);
});


app.listen(port, () => {
    console.log(`Servidor de eco escuchando en http://localhost:${port}`);
});