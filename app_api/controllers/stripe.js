const stripe = require("stripe")("sk_test_51Kj8lxHcluK5qSq91YHR7sk1RsRlseDxG7Oh6g7T8QKt9zVSfUdns397ijD1PqFmXpGaYipJNqsfLm9Q4pFjdWjG00raAHB9fq");
const uuid = require("uuid");

const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

// const stripeListAll = (req, res) => {
//     stripe
//         .find()
//         .exec((err, stripedata) => {
//             if (err) {
//                 sendJSONResponse(res, 404, err);
//                 return;
//             } else if (stripedata.length <= 0) {
//                 sendJSONResponse(res, 404, { 'message': 'stripe list empty' });
//                 return;
//             } else {
//                 sendJSONResponse(res, 200, stripedata);
//             }
//         });
// };

const stripeCreate = (req, res) => {
    // console.log(res);
    stripe
        .create({
            token: req.body.token,
            idempotencyKey: uuid()
        }, (err, stripedata) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                stripe.charges.create({
                    amount: token.price * 100,
                    currency: 'cad'
                }, {idempotencyKey});
                sendJSONResponse(res, 200, stripedata);
            }
        });
};

module.exports = {
    // stripeListAll,
    stripeCreate
}