const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const app = require("express")();
const port = 5000;

app.use(cors());

app.get("/",async (req,res) => {
    try{
        const response = await axios.get(`https://www.google.com/search?q=${req.query.q || "batman"}&udm=2`);
        const $ = cheerio.load(response.data);
        const src = $("table.GpQGbf").find("tr > td.e3goi").eq(0).find("img.DS1iW").attr("src");
        console.log(src)
        let image; 
        let response2;
        try{
            image = src.substring(0,src.length - 16)
            response2 = await axios.get(image, { responseType: 'arraybuffer' });
        }catch(e){
            image = src.substring(0,src.length - 15)
            response2 = await axios.get(image, { responseType: 'arraybuffer' });
        }
        res.header('Content-Type', 'image/jpeg');
        return res.send(response2.data);
    }catch(e){
        return res.json({msg:e})
    }
})

app.listen(port,() => console.log("http://localhost:5000/"))