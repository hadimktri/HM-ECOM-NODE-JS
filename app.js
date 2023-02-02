const express = require('express');
const path = require('path');
const app = express();

 app.set('views', 'views'); 

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views','index.html'));
})

app.listen(3000, () => {
    console.log('Runnig on Port 3000...');
});