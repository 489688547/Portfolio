const swal = require('sweetalert2');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req,res) {
    res.sendFile(process.cwd() + '/public/index.html')
});
// app.get('/projects', function (req,res) {
//     res.sendFile(process.cwd() + '/public/projects.html')
// });
app.get('/contact', function (req,res) {
    res.sendFile(process.cwd() + '/public/contact.html')
});


app.post('/', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
          user: 'zhourongqing0518@gmail.com',
          pass: 'pmrunflfhwloeynx' 
      }
  });

  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'zhourongqing0518@gmail.com',
    subject: 'New message from contact form at rongqingzhou.com',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
        console.log('send failure');
    }
    else {
        console.log('send success');
    }
  });
});

app.listen(3000, function () {
    console.log('Listening on port 3000...');
});