import express, { json, text } from 'express'
const app = express();
import dotenv from 'dotenv'


app.use(express.json());
dotenv.config();

const port = process.env.PORT;

app.get('/v1/', (req, res) => {

    const hubMode = req.query["hub.mode"];
    const hubChallenge = req.query["hub.challenge"];
    const verifyToken = req.query["hub.verify_token"];


    if (hubMode != undefined && hubChallenge != undefined && verifyToken != undefined) {
        if (hubMode === 'subscribe' && verifyToken === process.env.VERIFY_TOKEN) {
            console.log("Webhook verified. ", hubChallenge);
            res.status(200);
            res.send(hubChallenge);
        } else {
            res.status(404);
            res.json("WRONG VERIFY_TOKEN");
        }
    } else {
        res.status(404);
        res.json("Something went wrong. Check that all parameters are being passed.")
    }
});
app.post("/v1/", (req, res) => {
    console.log(req.body.entry[0].messaging);


    res.send(200);
    const recipientId = req.body.entry[0].messaging[0].id;
    const receivedMessage = req.body.entry[0].messaging[0].message.text
    sendReply(recipientId, receivedMessage)


});


async function sendReply(recipientId, receivedMessage) {
    let responseMessage = '¡Hola! Gracias por tu mensaje.';
    const params = {
        accessToken: process.env.PAGE_ACCESS_TOKEN
    }
    const url = "https://graph.facebook.com/v23.0/me/messages"

    if (receivedMessage.toLowerCase().includes('hola')) {
        responseMessage = '¡Hola! ¿En qué puedo ayudarte?';
    } else {
        responseMessage = 'Que tal?';
    }

    try {
        const data = {
            recipient: {
                id: recipientId
            },
            message: {
                text: responseMessage
            },
        }
        const response = await fetch(url, {
            method: "POST",
            params: params,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Respuesta enviada:', response);
    } catch (error) {
        console.error('Error enviando respuesta:', error.response?.data || error.message);
    }
}


app.listen(port, () => {
    console.log(`Servidor de eco escuchando en http://localhost:${port}`);
});