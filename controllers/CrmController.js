class CrmController{

    constructor(service){
        this.service = service
    }
    
    async createCode(req,res,next){
        try{
            const result = await this.service.createCode(req.query);
            return res.json(result);
        }
        catch (error) {
            console.log('ddd',error.message);
            next(error)
        }
    }

    async getToken(req,res,next){
        try{
            const result = await this.service.getToken();
            return res.json(result);
        }
        catch (error) {
            console.log('ddd',error.message);
            next(error)
        }
    }

    
    async getContact(req,res,next){
        try {
            let contactId = req.query.contactId;
            const result = await this.service.getContact(contactId)
            res.json(result)
        } catch (error) {
            console.log('ddd22==============',e);
            // next(error)
        }
    }

    
}


module.exports =  CrmController