'use strict';

var OpenTok = require('opentok'),
    apiKey = '45355362',
    apiSecret = '6623020fb590fdc46f7e5aa914ffbec7850008d2',
    opentok = new OpenTok(apiKey, apiSecret),
    session;

opentok.createSession(function(err, ses) {
  if (err) return console.error(err);

  session = ses;

  // TODO Persist!..
});

exports.getSession = function(req, res) {
  res.json({
    apiKey: apiKey,
    sessionId: session.sessionId,
    token: session.generateToken()
  });
};
