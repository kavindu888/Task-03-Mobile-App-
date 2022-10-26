
const { models: { Work } } = require('../modules');
const { models: { Notification } } = require('../modules');
const date = require('date-and-time');

const {notificationNo}=require('../controls');




module.exports={
    Find: async (req, res) => {

        try{
         
      
                var date_time = new Date();
                const today = date.format(date_time,'YYYY-MM-DD');
               if(req.id){

                let work = await Work.findOne({
                    attributes: ['id'],
                    raw: true,
                    where: {
                        userId: req.id,
                       // status:'report',
                        Date:today,
                    
                    
                    
                      }
                    }
                )
    
                if(work.id){
         
                    let notifi = await Notification.count({
                       // attributes: ['notification'],
                        raw: true,
                        where: {
                            workId:work.id
                       
                          }
                        }
                    )
                    if(notifi){
                       res.status(200).json({notifi});
                    }
    
                }
    
              
    
    
           
    
    
    
    
    
    




               }

               
            
      





        }catch(err){
            console.log(err)
        }
    }
}