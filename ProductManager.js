import fs from "fs";

export default class ProductManagaer {

    constructor(path) {
        this.path = path;
    };

    getProducts = async () => {
        try {

            if(fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            };

        } catch (error) {
            console.log(error);
        };
    };

    addProduct = async (producto) => {
        try {

            const products = await this.getProducts();

            const product = {
                title: producto.title,
                description: producto.description,
                price: producto.price,
                thumbnail: producto.thumbnail,
                code: producto.code,
                stock: producto.stock,
            }; 

            const {title, description, price, thumbnail, code, stock} = product;

    
            if(!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Todos los campos son Obligatorios");
                return;
            };
    
            const codeExiste = products.find(pro => pro.code === code);
            if(codeExiste) {
                console.log("El codigo se encuentra repetido, no se puede agregar el producto");
                return;
            };
    
            if(products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            };
    
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            console.log(products);

        } catch (error) {
            console.log(error);
        };
    };

    getProductById = async (id) => {
        try {
            const products = await this.getProducts();

            const idBuscado = products.find(producto => producto.id === id);
            console.log(idBuscado);
            return idBuscado;
        } catch (error) {
            console.log(error);
        };
    };

    updateProduct = async(id, obj) => {

        const products = await this.getProducts();
        const productoBuscado = products.find(producto => producto.id === id);

        const idBuscado = products.findIndex(producto => producto.id === id);
        products.splice(1,idBuscado);

        const {title, description, price, thumbnail, code, stock} = obj;
        
        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son Obligatorios");
            return;
        };

        const codeExiste = products.find(pro => pro.code === code);
        if(codeExiste) {
            console.log("El codigo se encuentra repetido, no se puede agregar el producto");
            return;
        };
        
        const product = {...productoBuscado, ...obj, ...id};
        
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        
        console.log(products);
    };

    deleteProduct = async (id) => {

        const products = await this.getProducts();
        
        const idBuscado = products.findIndex(producto => producto.id === id);
        products.splice(1,idBuscado);

        await fs.promises.unlink(this.path);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        console.log(products);
    };
};