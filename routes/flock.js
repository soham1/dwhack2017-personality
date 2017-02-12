var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/event', function(req, res, next) {
if (req.body.name == 'app.install') {
    var fileName = __dirname + "/../users/" + req.body.userId;
    console.log('Saving install event in file:', fileName);
    fs.writeFile(fileName, JSON.stringify(req.body, null, 2), function(err) {
      if (err) {
        console.log('Error saving install event: ' + err);
        res.send('Error saving install event: ' + err);
      }
      else {
        console.log("The file was saved!");
        res.send('User install event is saved!');
      }
    });
  }
  else if (req.body.name == 'app.uninstall') {
    var fileName = __dirname + "/../users/" + req.body.userId;
    console.log('Deleting uninstall user file:', fileName);
    fs.unlink(fileName, function(err) {
      if (err) {
        console.log('Error deleting uninstall file: ' + err);
        res.send('Error deleting uninstall file: ' + err);
      }
      else {
        console.log("The file was deleted!");
        res.send('The file was deleted!');
      }
    });
  }
});

router.post('/webhook', function(req, res, next) {
  console.log('Stroing message: ', req.body);
  var dataFolder = __dirname + "/../data/" + req.body.from;
  console.log('Storing in folder:', dataFolder);

  if (!fs.existsSync(dataFolder)){
    console.log('Folder created:', dataFolder);
    fs.mkdirSync(dataFolder);
  }
  
  var fileName = dataFolder + '/' + req.body.uid;
  console.log('Storing in file:', fileName);

  fs.writeFile(fileName, req.body.text, function(err) {
    if (err) {
      console.log('Error saving data: ' + err);
      res.send('Error saving data: ' + err);
    }
    else {
      console.log("Data file was saved!");
      res.send('Data file was saved!!');
    }
  });
});

router.get('/profile/:userId', function(req, res, next) {
  var userId = req.params.userId;
  console.log('Profile called.', userId);
  //res.send('From profile: ' + userId);
  
  var dataFolder = __dirname + "/../data/" + userId;
  console.log("Reading all files from:", dataFolder);
  fs.readdir(dataFolder, function(err, list){
    console.log('Found files:', list);
    var allText = '';
    for (var i = 0, len = list.length; i < len; i++) {
      var fileName = dataFolder + '/' + list[i];
      console.log('Reading file:', fileName);
      
      var contents = fs.readFileSync(fileName).toString();
      allText = allText + ' ' + contents;
    }    
    console.log('All text: ', allText);
    
    var params = { language: 'en',
      source_type: 'text',
      accept_language: 'en',
      include_raw: 'false',
      consumption_preferences: 'true',
      text: allText }
    
    req.watson.personalityInsights.profile(params, function(err, profile){
      if (err) {
        console.log('Error calling Watson personalityInsights:', err);
        res.json({err: err});
      } else {
        console.log('Response from Watson personalityInsights:', profile);
        res.json(profile);
      }
    });    
    
  });
  
  
});

router.get('/personality', function(req, res, next) {
  console.log("Personlity page called", req.query);
  console.log("Personlity page res.locals", res.locals);
  
  var userId = res.locals.eventTokenPayload.userId;
  console.log("Reading all data of user:", userId);
  
  res.render('personality.ejs', {userId: userId});

});



router.get('/personality-OLD', function(req, res, next) {
  console.log("Personlity page called", req.query);
  console.log("Personlity page res.locals", res.locals);
  
  var userId = res.locals.eventTokenPayload.userId;
  console.log("Reading all data of user:", userId);
  
  var dataFolder = __dirname + "/../data/" + userId;
  console.log("Reading all files from:", dataFolder);
  fs.readdir(dataFolder, function(err, list){
    console.log('Found files:', list);
    var allText = '';
    for (var i = 0, len = list.length; i < len; i++) {
      var fileName = dataFolder + '/' + list[i];
      console.log('Reading file:', fileName);
      
      var contents = fs.readFileSync(fileName).toString();
      allText = allText + ' ' + contents;
    }    
    console.log('All text: ', allText);
    
    var params = { language: 'en',
      source_type: 'text',
      accept_language: 'en',
      include_raw: 'false',
      consumption_preferences: 'true',
      text: allText }
    
    req.watson.personalityInsights.profile(params, function(err, profile){
      if (err) {
        console.log('Error calling Watson personalityInsights:', err);
        res.render('personality.ejs');
      } else {
        console.log('Response from Watson personalityInsights:', profile);
        res.render('personality.ejs');
      }
    });    
    
  });

});






router.get('/config', function(req, res, next) {
  console.log("Config body", req.body);
  res.send('Thank you for installing the app!');
});

module.exports = router;
