const express = require('express');
const cors = require('cors');
const app = express();
app.listen(keys.port, ()=>{
    console.log('Server iniciado en el puerto'+ keys.port);
})
