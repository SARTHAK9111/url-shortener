const shortid = require("shortid");
const URL = require("../model/url");

async function handleGenratehortUrl(req, res) {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({ error: "URL is  required " });
  }

  const short_id = shortid(8);
  console.log(short_id);
  await URL.create({
    shortID: short_id,
    redirectURL: body.url,
    visitHistory: [],
    createdBy :req.user._id
  });

  return res.render("home", { id: short_id ,});
}

async function handleGetRequest(req, res) {
  console.log(req.params.ID);
  const shortID = req.params.ID;
  const result = await URL.findOneAndUpdate(
    { shortID },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  console.log("result :", result);
  const link = result.redirectURL;

  return res.redirect(link);
}

async function handleAnalytics(req, res){

    const shortID = req.params.ID;
    const result =await URL.findOne({shortID })
    console.log("result :" , result );

    return res.json( {
        totalclicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}


module.exports = {
  handleGenratehortUrl,
  handleGetRequest,
  handleAnalytics
};
