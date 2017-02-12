const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

const TEXT_TO_SPEECH_USERNAME = "1638cfd5-e21b-4edf-b999-d3abf21ef771"
const TEXT_TO_SPEECH_PASSWORD = "iUcdFtzMzDaB";
const PERSONALITY_INSIGHTS_USERNAME="7e4a0b41-6fce-42a9-b48c-83a1b821bb0f";
const PERSONALITY_INSIGHTS_PASSWORD="w6FHXnHktfZB";

const textToSpeech = new TextToSpeechV1({
  username: TEXT_TO_SPEECH_USERNAME,
  password: TEXT_TO_SPEECH_PASSWORD
});

var translator = new LanguageTranslatorV2({
  username: 'e612a7b0-55ac-4f9a-bb8a-cac97509c6e7',
  password: 'jJGpncbeX4q8',
  url: 'https://gateway.watsonplatform.net/language-translator/api'
});

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const personalityInsights = new PersonalityInsightsV3({
  username: PERSONALITY_INSIGHTS_USERNAME,
  password: PERSONALITY_INSIGHTS_PASSWORD,
  version_date: '2016-10-19',
});

module.exports = {
  personalityInsights: personalityInsights,
  textToSpeech: textToSpeech,
  translator: translator
};
