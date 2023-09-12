const axios = require("axios");
const codeModel = require("../models/code-model");
const tokenModel = require("../models/token-model");

class CrmService{
    async createCode(data){
        await codeModel.remove();
        const result = await codeModel.create({...data});
        return result;
    }

    async getToken(){
        const codeData  = await codeModel.findOne();
        let queryParams = {
            "client_id": codeData.client_id,
            "client_secret": process.env.CRM_SECRET,
            "grant_type": "authorization_code",
            "code": codeData.code,
            "redirect_uri": process.env.REDIRECT_URL
        }

        let result  = await axios.post(`https://${codeData.referer}/oauth2/access_token`,queryParams)
        await tokenModel.remove();
        await tokenModel.create(result);
        return result;
    }

    
    async getContact(contactId=""){
            let token = await tokenModel.findOne({});
            let config = {
                headers: {
                'Authorization': 'Bearer ' + token.access_token
                }
            }


            let result  = await axios.get(`https://${token.referer}/api/v4/contacts?query=${contactId}`,config);

            let contacts = result?.data?._embedded?.contacts || []

            if(!contacts.length && contactId){
                contacts = await this.createContact(contactId)
            }
            else {
                await this.updateContact(contacts[0]);
            }

            await this.createLead(contacts[0]);

            return contacts;
    }

    async createContact(contactId){
            let token = await tokenModel.findOne({});
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token.access_token
                  }
            }


            let data = 
                {
                    "request_id":1,
                    "first_name": "Test name",
                    "last_name": "test lastname",
                    "custom_fields_values": [
                        {
                            "field_name": "phone",
                            "field_code": "PHONE",
                            "values": [
                                {
                                    "value": contactId
                                }
                            ]
                        }
                    ],
                };


            let result  = await axios.post("https://raminweb97.amocrm.ru/api/v4/contacts",data,config);
            let contacts = result?.data?._embedded?.contacts || []
            return contacts;

            // return res.json({"test":"test"});
    }

    async updateContact(firstContact){

            let token = await tokenModel.findOne({});
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token.access_token
                  }
            }


            let data =
                {
                    "id":firstContact.id,
                    "first_name": "Update2 name",
                    "last_name": "Update2 lastname",
                }
            


            let result  = await axios.patch(`https://${token.referer}/api/v4/contacts/${firstContact.id}`,data,config);
            // console.log(result);
            return result;

            // return res.json({"test":"test"});
    }

    async createLead(contact){
        

        let token = await tokenModel.findOne({});
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token.access_token
                  }
            }


            let data = {
                    created_by:[contact.id]
            }

            let result  = await axios.post("https://raminweb97.amocrm.ru/api/v4/leads",data,config);
            let contacts = result?.data?._embedded?.contacts || []
            console.log(contacts,'=======')
            return contacts;
    }

    
}


module.exports = CrmService;