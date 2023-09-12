const crmController = require("../controllers/CrmController");
const CrmService = require("../services/CrmService");

const Router = require("express").Router;
const router = new Router();

const crmControllerInstance = new crmController(new CrmService()) 

router.get("/crm1",crmControllerInstance.createCode.bind(crmControllerInstance))
router.get("/getToken",crmControllerInstance.getToken.bind(crmControllerInstance))
router.get("/getContact",crmControllerInstance.getContact.bind(crmControllerInstance))

module.exports = router;