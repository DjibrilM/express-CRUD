const CORS =  class  {
static CORS_CONFIG (app){
    app.use((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader(
          'Access-Control-Allow-Methods',
          'OPTIONS, GET, POST, PUT, PATCH, DELETE'
        );
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization ');
    next()
    })
}

}

export default  CORS