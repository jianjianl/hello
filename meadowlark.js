/* 项目入口 */

var express = require('express');
var app = express();

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars')
                .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 定义全局变量
var fortune = require('./lib/fortune.js');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('home');
});
app.get('/about', function(req, res) {
    res.render('about', {fortune: fortune.getFortune()});
});
// 定制404
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});
// 定制500
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + ';press ctrl-c to terminal');
});
