const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  models: {User,Fcm_token},
} = require('../modules');


module.exports = {
  Find: async (req, res) => {
    try {
      if (req.body.email && req.body.password) {
        let use = await User.findOne({
          attributes: ['id', 'hash'],
          where: {
            email: req.body.email,
          },
        });

        if (use === null) {
          res.send({msg: 'check your data'});
        } else {
          const isMatch = await bcrypt.compareSync(req.body.password, use.hash);
          if (isMatch) {
            console.log(use.id);

            const token = jwt.sign(use.id, process.env.TOKEN_KEY);

            if(req.body.fcmToken){
          

              let notifi = await Fcm_token.findOne({
                attributes: ['id','token'],
                where: {
                  userId: use.id,
              
                },
              });
             
              if(notifi){
       console.log(notifi.token)
if(notifi.token===req.body.fcmToken){
  console.log('match')
}else{
  console.log('dosent match'+notifi.id)

  Fcm_token.update(
    { token: req.body.fcmToken },
    { where: { id: notifi.id } }
  )
 




}
             

              }
       

            }

            res.status(202).json({token});
          } else {
            res.status(204).json({msg: 'check your email and password'});
          }
        }
      } else {
        res.status(300).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  },
};
