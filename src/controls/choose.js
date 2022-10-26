const {
  models: {Issue,Fcm_token},
} = require('../modules');
const {
  models: {Work},
} = require('../modules');
const {
  models: {Notification},
} = require('../modules');
var FCM = require('fcm-node');
const date = require('date-and-time');
const work = require('../modules/work');
const notification = require('../modules/notification');
var serverKey = 'AAAAmt4-Z98:APA91bHZHe2YT_7LyZ3cj6IYkERGQDGsc4zX_E2lpiKAvEQsLzK11Mgf7GuBC3tywigqKiuypehxSVg0tiexO93Sndc98buHGE2NAZI3QN4fjiX_1znPASrCZJJvA8IR3Ukvo2FOIVlT';
var fcm = new FCM(serverKey);
module.exports = {
  Find: async (req, res) => {
    try {
      if (req.body.btn && req.body.text) {
        let issueId = await Issue.findOne({
          attributes: ['id'],
          where: {
            issue: req.body.btn,
          },
        });
        if (issueId === null) {
          res.send({msg: 'enter valia issue'});
        } else {
          var date_time = new Date();
          const today = date.format(date_time, 'YYYY-MM-DD');

          let que = await Work.count({
            attributes: ['id', 'sno'],
            where: {
              Date: today,
            },
          });

          let nextque = que + 1;
          console.log(nextque);

          let dis = req.body.text;
          let userId = req.id;

          await Work.create({
            sno: nextque,
            dis: dis,
            Date: today,
            userId: userId,
            issueId: issueId.id,
            status: 'report',
          }).then(result => (thisWorkId = result.id));

         await Notification.create({
          workId: thisWorkId,
          notification: 'your issue is recored.plase wait...',
          });


          let tokenId = await Fcm_token.findOne({
            attributes: ['id','token'],
            where: {
              userId: userId,
            },
          });
         
          if(tokenId){

          
      
          var message = {
        to:tokenId.token,
              notification: {
                  title: 'Your queue is generated',
                  body: 'Your Que No :'+nextque,
              },
      
           
      
          };
      
          fcm.send(message, function(err, response) {
              if (err) {
                  console.log("Something has gone wrong!"+err);
            console.log("Respponse:! "+response);
              } else {
                  // showToast("Successfully sent with response");
                  console.log("Successfully sent with response: ", response);
              }
      
          });
    


        }









          res.status(202).json({msg: nextque});
        }
      } else {
        res.status(200).json({msg: error});
      }
    } catch (error) {
      res.status(200).json({msg: error});
    }
  },
};
