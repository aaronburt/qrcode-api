import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { promisify } from 'util';
import express from 'express';
import qrcode from 'qrcode';

const router: express.Application = express();
const qrToBuffer = promisify(qrcode.toBuffer);
const limiter: RateLimitRequestHandler = rateLimit({ windowMs: 1000, max: 5, message: "429", statusCode: 429 });

router.use(limiter);

router.get('/qr', async(req: express.Request, res: express.Response) => {
    try {
        if(typeof req.query.input !== 'string') return res.sendStatus(400);
        const response = await qrToBuffer(req.query.input);
        res.setHeader('content-type', 'image/png');
        return res.send(response);
    } catch(err: any){
        return res.sendStatus(400);
    }
});

router.all('*', (req: express.Request, res: express.Response) => { return res.sendStatus(400) });

router.listen(8080);