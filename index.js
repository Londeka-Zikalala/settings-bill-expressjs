import express from "express";
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import {SettingsBill} from "./js/settings-bill.js";
const settingsBill = SettingsBill();
let app = express();
const PORT = process.env.PORT || 3011;
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.set('views', './views/layouts');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index',{
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals()
});

});

app.post('/settings', function(req, res){
console.log(req.body);
settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
});
console.log(settingsBill.getSettings())
res.redirect('/')
});

app.post('/action', function (req, res) {
    // Call the recordAction method to update the actions
    settingsBill.recordAction(req.body.billItemTypeWithSettings);
  
    // Update the totals to be sent to the view
    const totals = settingsBill.totals();
  
    // Render the index view with updated settings and totals
    res.render('index', {
      settings: settingsBill.getSettings(),
      totals: totals 
    });
  });
  
app.get('/actions', function(req, res){

});
app.get('/actions/:type', function(req, res){

});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});