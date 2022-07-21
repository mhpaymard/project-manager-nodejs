const { AllRoutes } = require('./routes/router');

module.exports = class Application{
    #express = require('express');
    #app = this.#express();
    constructor(PORT,DB_URL){
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createRoutes();
        this.createServer(PORT);
        this.errorHandler();
    }
    configApplication(){
        const path = require('path');
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended:true}));
        this.#app.use(this.#express.static(path.join(__dirname,'..','public')));
    }
    createServer(PORT){
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${PORT} !`);
        })
    }
    configDatabase(DB_URL){
        const mongoose = require('mongoose')
        mongoose.connect(DB_URL,error=>{
            if(error) throw error;
            return console.log("Connect to DB is Successful !")
        })
    }
    errorHandler(){
        this.#app.use((req,res,next)=>{
            return res.status(404).json({
                success:false,
                status:404,
                message:'صفحه یا آدرس موردنظر یافت نشد'
            })
        });
        this.#app.use((error,req,res,next)=>{
            const status = error?.status || 500;
            const message = error?.message || 'Internal Server Error !';
            return res.status(status).json({
                success:false,
                status,
                message
            })
        })
    }
    createRoutes(){
        this.#app.get('/',(req,res,next)=>{
            return res.json({
                message:'this is the new application'
            })
        })
        this.#app.use(AllRoutes);
        
    }
}