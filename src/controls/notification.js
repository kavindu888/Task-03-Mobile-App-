const {
  models: {Issue},
} = require('../modules');
const {
  models: {Work},
} = require('../modules');
const {
  models: {Notification},
} = require('../modules');
const date = require('date-and-time');
const {notification} = require('.');

module.exports = {
  Find: async (req, res) => {
    try {
      var date_time = new Date();
      const today = date.format(date_time, 'YYYY-MM-DD');
      if (req.id) {
        
        let work = await Work.findOne({
          attributes: ['id'],
          raw: true,
          where: {
            userId: req.id,
            //status: 'report',
            Date: today,
           sno:req.query.sno
          },
        });

        if (work.id) {
          let notifi = await Notification.findAll({
            // attributes: ['notification'],
            raw: true,
            where: {
              workId: work.id,
            },
          });
          if (notifi) {
            res.status(200).json({notifi});
                    }
        }
      } else {
        res.status(204).json({msg: 'no notification'});
      }
    } catch (err) {
      console.log(err);
    }
  },
};
