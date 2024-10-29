const AWS = require('aws-sdk');
const translate = new AWS.Translate();
const polly = new AWS.Polly();

exports.handler = async (event) => {
  const { text, sourceLang = 'en', targetLang } = JSON.parse(event.body);
  
  try {
    // Translate text
    const translateParams = {
      Text: text,
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: targetLang
    };
    
    const translationResult = await translate.translateText(translateParams).promise();
    
    // Generate audio for translated text
    const pollyParams = {
      Engine: 'neural',
      LanguageCode: targetLang,
      Text: translationResult.TranslatedText,
      OutputFormat: 'mp3',
      VoiceId: 'Joanna' // Choose appropriate voice based on language
    };
    
    const audioResult = await polly.synthesizeSpeech(pollyParams).promise();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        translatedText: translationResult.TranslatedText,
        audioUrl: audioResult.AudioStream.toString('base64')
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};