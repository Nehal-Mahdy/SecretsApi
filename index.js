import express, { json } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const yourUsername = "nahola";
const yourPassword = "12345";
const yourAPIKey = "215ef25f-6122-4fa4-b48d-52c99e487e6e";
const yourBearerToken = "31197f16-f97d-446d-8314-4818964ca585";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
try {
  const result = await axios.get(API_URL + "random");
  console.log(result);
  console.log(result.data)
  res.render("index.ejs", { content: JSON.stringify(result.data) });
} catch (error) {
  res.status(404).send(error.message);
}
});

app.get("/basicAuth", async (req, res) => {

 try{
  const result = await axios.get(API_URL+'all?page=2',{
    auth: {
      username : yourUsername,
      password : yourPassword
    }
  })
  res.render("index.ejs", {content: JSON.stringify(result.data)})
 }catch (err){
  res.status(401).send(res.message);
 }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL+'filter',{
      params : {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)})

    // console.log(result.data)
  }
  catch (err){
    res.status(401).send(err.message)
  }
});

app.get("/bearerToken", async (req, res) => {

try{
  const result = await axios.get(API_URL + 'secrets/42', {
    headers: {
      Authorization: `Bearer ${yourBearerToken}` 
    }
  });
  // console.log(result.data);
  res.render("index.ejs", {content: JSON.stringify(result.data)})
}catch (err){
  res.status(401).send(err.message)
}

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
