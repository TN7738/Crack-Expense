const stripe = require("stripe")("sk_test_51Kj8lxHcluK5qSq91YHR7sk1RsRlseDxG7Oh6g7T8QKt9zVSfUdns397ijD1PqFmXpGaYipJNqsfLm9Q4pFjdWjG00raAHB9fq");
const uuid = require("uuid");

const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

const stripeCreate = (req, res) => {
    // console.log(res);
    try{
        stripe
            .customers.create({
                token: req.body.token,
                idempotencyKey: uuid.v4()
            }, (err, stripedata) => {
                if (err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 200, stripedata);
                }
            });
    }
    catch(err){
        console.log("error", err);
    }
};

module.exports = {
    stripeCreate
}