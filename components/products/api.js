const { Router } = require("express");
const router = new Router();
const products = require("../../products.json")

module.exports = app =>{
    
    let addId = (req, res, next) => {
        req.body.id = ( products.length === 0 ) ? 1 : products[products.length - 1].id + 1;
        next();
    };

    app.use('/api/products', router);

    //GET ALL PRODUCTS
    router.get('/', (req, res, next) => {
        try {
            res.json( products );
        } catch (error) {
            console.log(error)
        }
    });
    
    //GET A PRODUCT ACCORDING TO ID
    router.get('/:id', (req, res, next) => {
        try{
            let selected = products.filter(item => item.id == req.params.id);
            selected.length === 0 ? 
            res.send( {error: "Producto no encontrado"} ) : res.json( selected );
        } catch (error){
            console.log(error);
        }
    });

    //ADD NEW PRODUCT
    router.post('/', addId, (req, res, next) => {
        try {
            let obj = req.body;
            products.push(obj);
    
            res.json( products );
        } catch (error) {
            console.log(error);
        }
    });

    //UPDATE A PRODUCT
    router.put('/:id', (req, res, next) => {
        try {
            let id = Number(req.params.id);
            let { title, price, thumbnail } = req.body;
            if( !title || !price || !thumbnail || !id ){
                res.send("No hay datos");
            } else {
                let newProduct = {
                    id,
                    title,
                    price,
                    thumbnail
                };

                products.map(function(item){
                    if(item.id === newProduct.id){
                        item.title = newProduct.title,
                        item.price = newProduct.price,
                        item.thumbnail = newProduct.thumbnail
                    }
                    console.log(`${item.title} actualizado.`);
                });
                res.json( products );
            };
        } catch (error) {
            console.log(error);
        }
    });

    //DELETE A PRODUCT
    router.delete('/:id', (req, res, next) => {
        try {
            let id = Number(req.params.id);
            let filter = products.filter(item => item.id !== id)
            products = filter;
            res.json( products );
        } catch (error) {
            console.log(error);
        }
    })
}