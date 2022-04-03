const express = require("express");
const cors = require("cors");
const axios = require('axios');
const helper = require("./helper");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Route 1
app.get("/api/ping", (req, res) => {
    let response_data = {
        success: true
    }
    res.status(200).json(response_data);
});

// Route 2
app.get("/api/posts", async (req, res) => {
    
    let response_data = {};
    let api_data_raw = null;
    let tag = null;
    let sortBy = 'id';
    let direction = 'asc';

    //tag info
    if(req.query.tag == null)
    {
        response_data['error'] = 'Tags parameter is required';
        res.status(400).json(response_data);
        return;
    }
    else
    {
        //delim by comma
        tag = req.query.tag.split(",");
    }
    
    //direction info
    if(req.query.direction != null)
    {
        if(req.query.direction != 'asc' && req.query.direction != 'desc')
        {
            response_data['error'] = 'sortBy parameter is invalid';
            res.status(400).json(response_data);
            return;
        }
        else
        {
            direction = req.query.direction;
        }
    }
    

    //sortBy info
    if(req.query.sortBy != null)
    {
        if(req.query.sortBy != 'id' && req.query.sortBy != 'reads' && req.query.sortBy != 'likes' && req.query.sortBy != 'popularity')
        {
            response_data['error'] = 'sortBy parameter is invalid';
            res.status(400).json(response_data);
            return;
        }
        else
        {
            sortBy = req.query.sortBy;
        }
    }
    
    

    //Repeated API calls. This is async and will wait for each tag to finish
    api_data_merged = [];
    for(i = 0; i < tag.length; i++)
    {
        let url = `https://api.hatchways.io/assessment/blog/posts?tag=${tag[i]}`;
        await axios.get(url)
        .then(function (api_res) {
            // handle success
            api_data_merged = api_data_merged.concat(api_res.data.posts); 
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    }

    //removing any duplicates
    api_data_merged = helper.remove_duplicate(api_data_merged);
    //sorting based on object
    api_data_merged = helper.sorting(api_data_merged, sortBy, direction);

    //constructing object for json
    response_data = {
        posts: api_data_merged
    }
    
    //successful, sending
    res.status(200).json(response_data);
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
