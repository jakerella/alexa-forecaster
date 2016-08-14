'use strict';

let verifier = require('alexa-verifier');

module.exports = function(req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        return next();
    }

    if (!req.body.session || !req.body.request || !req.headers.signaturecertchainurl) {
        console.error(req.body, req.headers.signaturecertchainurl);
        return res.status(400).json({ message: 'Invalid Request Body', error: null });
    }

    verifier(req.headers.signaturecertchainurl, req.headers.signature, req.rawBody, function(err) {
        if (err) {
            console.error(err);
            res.status(401).json({ message: 'Verification Failure', error: err });
        } else {
            next();
        }
    });
};
