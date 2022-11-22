const app = require('./src/app');
const keys = require('./src/utils/keys');

app.listen(keys.port, ()=>{
    console.log('Server iniciado en el puerto: '+ keys.port);
})
