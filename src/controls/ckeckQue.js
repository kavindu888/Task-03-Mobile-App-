const { models: { Issue } } = require('../modules');
const { models: { Work } } = require('../modules');
const { models: { Notification } } = require('../modules');

const date = require('date-and-time');
const work = require('../modules/work');
const notification = require('../modules/notification');





module.exports={
    Find: async (req, res) => {

if(req.id){
    try{
    var date_time = new Date();
    const today = date.format(date_time,'YYYY-MM-DD');

    let sno = await Work.findOne({
        attributes: ['sno'],
        where: {
            userId: req.id,
            Date:today,
            status:'report'
        
        
          },
      
        });
        if(sno===null){
            res.status(200).json({sno:0});

        }else{

          





            res.status(202).json({sno:sno.sno});
        }
    }catch(error){
        res.status(400).json({error});
    }
    
}
    }
    }