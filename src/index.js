import express, { json } from 'express'
const app = express();
import dotenv from 'dotenv'


app.use(express.json());
dotenv.config();

const port = process.env.PORT;

app.get('/v1/', (req, res) => {

    const hubMode = req.query["hub.mode"];
    const hubChallenge = req.query["hub.challenge"];
    const verifyToken = req.query["hub.verify_token"];


    if(hubMode != undefined && hubChallenge !=  undefined && verifyToken != undefined){
        if (hubMode === 'subscribe' && verifyToken === process.env.VERIFY_TOKEN){
            console.log("Webhook verified. ", hubChallenge);
            res.status(200);
            res.send(hubChallenge);
        } else {
            res.status(404);
            res.json("WRONG VERIFY_TOKEN");
        }
    }else{
        res.status(404);
        res.json("Something went wrong. Check that all parameters are being passed.")
    }   
});
app.post("/v1/", (req, res)=>{
    console.log(req.body);
    res.send(200)
});

1
app.listen(port, () => {
    console.log(`Servidor de eco escuchando en http://localhost:${port}`);
});