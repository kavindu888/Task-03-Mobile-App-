const {
  models: {User,Fcm_token},
} = require('../modules');
const bcrypt = require('bcrypt');
module.exports = {
  Find: async (req, res) => {

    try {
      if (req.body.name && req.body.email && req.body.password && req.body.tp&&req.body.fcmToken) {
        const {name, email, password, tp} = req.body;

        let sell = await User.findOne({
          attributes: ['id'],
          where: {
            email: req.body.email,
          },
        });
        if (sell === null) {
          const hash = await bcrypt.hash(req.body.password, 10);

          console.log('hash is' + hash);
          await User.create({
            name,
            email,
            hash,
            tp,
          }).then(async(result) => {
            
          await Fcm_token.create({
            token:req.body.fcmToken,
            userId:result.id,
           
          })
          
            
            console.log(result.id)}
            );

          res.status(201).json({msg: 'success.user registerd!'});
        } else {
          res.status(200).json({msg: 'error.user arly registerd plese login!'});
        }
      } else {
        res.status(204).json({msg: 'error.fill all data!'});
      }
    } catch (error) {
      res.status(404).json(error);
    }
  },
};
