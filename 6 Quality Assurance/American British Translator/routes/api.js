'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;
      let translation;

      if (text == '')
        return res.json({ error: "No text to translate" });

      else if (!locale || !text)
        return res.json({ error: "Required field(s) missing" });

      else if (locale === 'british-to-american')
        translation = translator.britishToAmerican(text);

      else if (locale === 'american-to-british')
        translation = translator.americanToBritish(text);

      else
        return res.send({ error: 'Invalid value for locale field' });

      if (translation === text)
        translation = "Everything looks good to me!";

      return res.json({
        text,
        translation
      });
    });
};
