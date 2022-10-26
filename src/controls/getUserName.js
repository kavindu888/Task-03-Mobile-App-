const {
  models: {User},
} = require('../modules');

module.exports = {
  Find: async (req, res) => {
    try {
      if (req.id) {
        let use = await User.findOne({
          attributes: ['name'],
          where: {
            id: req.id,
          },
        });

        if (use) {
          let un = use.name;
          let fn = un.substring(0, un.indexOf(' '));
          res.status(202).json({fn});
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
