import express from "express";
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import moment from 'moment';
import SettingsBill from "./js/settings-bill.js";
let app = express();
const settingsBill = SettingsBill();
const PORT = process.env.PORT || 3011;
const router = express.Router();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//function to update the levels and use the next middleware to render
function updateLevels(req, res, next) {
  const hasReachedWarningLevel = settingsBill.hasReachedWarningLevel();
  const hasReachedCriticalLevel = settingsBill.hasReachedCriticalLevel();

  res.locals.hasReachedWarningLevel = hasReachedWarningLevel;
  res.locals.hasReachedCriticalLevel = hasReachedCriticalLevel;

  next();
}


app.get('/',updateLevels, (req, res) => {
  
  const totals = settingsBill.totals();
  totals.callTotal = totals.callTotal.toFixed(2);
  totals.smsTotal = totals.smsTotal.toFixed(2);
  totals.grandTotal = totals.grandTotal.toFixed(2)
  res.render('index',{
    updateSettings: settingsBill.getSettings(),
    totals
});

});

app.post('/settings', function(req, res){
settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
});
res.redirect('/')
});

app.post('/action', function (req, res) {
  if (!settingsBill.hasReachedCriticalLevel()) {
    
    settingsBill.recordAction(req.body.billItemTypeWithSettings);
  }
  res.redirect('/');
  });
  
app.get('/actions', (req, res) => {
  const actions = settingsBill.actions();

  // Calculating the time lapsed using Moment.js
  actions.forEach((action) => {
    action.timeLapsed = moment(action.timestamp).fromNow();
  });

  res.render('actions', { actions });
});


app.get('/actions/:type', (req, res) => {
  const actionType = req.params.type;
  const actions = settingsBill.actionsFor(actionType);

  actions.forEach((action) => {
    action.timeLapsed = moment(action.timestamp).fromNow();
  });

  res.render('actions', { actions });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});