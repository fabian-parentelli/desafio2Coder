import ProductManagaer from "./Productmanager.js";


const manager = new ProductManagaer("./files/product.json");

// Agrega un Producto
const managerProduct = async () => {

    const product = {

        title: "Tortillas",
        description: "fresca",
        price: 120,
        thumbnail: "sin imagen",
        code: 1217,
        stock: 50
    };

    await manager.addProduct(product);
};

// managerProduct();

// Busca un producto por su Id y lo muestra
// manager.getProductById(5);

// modifica un producto
const managerUpdate = async () => {

    const obj = {

        title: "Peras",
        description: "fresca",
        price: 200,
        thumbnail: "sin imagen",
        code: 1236,
        stock: 50
    };

    await manager.updateProduct(5, obj)
};
// managerUpdate();

// Elimina un producto por su id
// manager.deleteProduct(3)