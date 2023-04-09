import ProductManager from "./productmanager/productManager.js";

const productManager = new ProductManager('./files/products.json');


console.log(await productManager.getAll());

// console.log(await productManager.getById(2));

const createProduct = async () => {
    
    const obj = {
        title: "Cafe", 
        description: 'rico', 
        price: 200, 
        thumbnail: 'no hay foto', 
        code: 500, 
        stock: 50,
    };

    await productManager.addProduct(obj);
};
// createProduct();


const modificaProducto = async () => {

    const obj = {
        title: "manteca", 
        description: 'rico', 
        price: 200, 
        thumbnail: 'no hay foto', 
        code: 500, 
        stock: 50,
    };
    await productManager.updateProduct(4, obj);
};
// modificaProducto();


// await productManager.deleteById(4);

// await productManager.deleteAll();