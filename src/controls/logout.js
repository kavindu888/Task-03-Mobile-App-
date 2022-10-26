require('dotenv').config();
const {
  models: {Fcm_token},
} = require('../modules');

module.exports = {
  Find: async (req, res) => {
    try {
      const result = await Fcm_token.update(
        {token: 'log out'}, // attribute
        {where: {userId: req.id}}, // condition
      ).then(async () => {
        res.send('done');
      });
    } catch (error) {}
  },
};
