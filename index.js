import express from "express";
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import SettingsBill from "./js/settings-bill.js";
let app = express();
const settingsBill = SettingsBill();
const PORT = process.env.PORT || 3011;
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index',{
    updateSettings: settingsBill.getSettings(),
    totals: settingsBill.totals()
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
   // Call the recordAction method to update the actions
    settingsBill.recordAction(req.body.billItemTypeWithSettings);
    res.redirect('/')
  });
  
app.get('/actions', function(req, res){
res.render('actions',{
    actions: settingsBill.actions()
})
});
app.get('/actions/:type', function(req, res){

});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});