const  express =  require('express')
const {handleGenratehortUrl ,handleGetRequest ,handleAnalytics }  = require('../controller/url')


const router = express.Router();

router
    .post("/", handleGenratehortUrl)
    .get("/:ID", handleGetRequest)
    .get("/Analytics/:ID", handleAnalytics)
module.exports = router;    