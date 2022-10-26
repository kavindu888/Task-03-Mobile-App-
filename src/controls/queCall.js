const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const date = require('date-and-time');
const {
  models: {Work,Fcm_token,Notification},
} = require('../modules');

var FCM = require('fcm-node');

var serverKey = 'AAAAmt4-Z98:APA91bHZHe2YT_7LyZ3cj6IYkERGQDGsc4zX_E2lpiKAvEQsLzK11Mgf7GuBC3tywigqKiuypehxSVg0tiexO93Sndc98buHGE2NAZI3QN4fjiX_1znPASrCZJJvA8IR3Ukvo2FOIVlT';
var fcm = new FCM(serverKey);

module.exports = {
  Find: async (req, res) => {

    try {
      var date_time = new Date();
      const today = date.format(date_time, 'YYYY-MM-DD');
      if (req.body.sno) {

        let id = await Work.findOne({
          attributes: ['id','userId'],
          where: {
            Date: today,
            status: 'report',
            sno: req.body.sno,
          },
        });

        if (id) {
         
let user=id.userId;
          if(user){

            let tokenId = await Fcm_token.findOne({
              attributes: ['id','token'],
              where: {
                userId: user,
              },
            });
           
            if(tokenId){
  
            
        
            var message = {
          to:tokenId.token,
                notification: {
                    title: 'Your queue is called now',
                    body: 'plase going counter :',
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
        }














          const result = await Work.update(
            {status: 'done'}, // attribute
            {where: {id: id.id}}, // condition
          ).then( async ()=>{

            
            
            await Notification.create({
                workId:id.id,
                notification:'your que call now.plz going to counter...'
              
        
               }),
               
           



               res.send('done')
              });
            
            
          
            
            
       
              
        } else {
          res.status(202).json({id: 'no'});
        }

      
   
      }
    } catch (err) {
      console.log(err);
    }
  },
};
