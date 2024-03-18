//const fs = require('fs');

import { Console, log } from 'console';
import {promises as fs, readFile} from 'fs';

class ProductManager {
    constructor() {
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async(title, description, price, image, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct);

        console.log(newProduct);

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, 'utf-8');
        return JSON.parse(respuesta);
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        //return console.log(respuesta2);
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if (!respuesta3.find(product => product.id === id)) {
            console.log('Producto no encontrado');
        } else {
            console.log(respuesta3.find(product => product.id === id));
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);

        console.log(productFilter);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log('Producto eliminado');
    }

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductsById(id);
        let prodOld = await this.readProducts();
        let productsModif = [{ ...producto, id }, ...prodOld]
        await fs.writeFile(this.patch, JSON.stringify(productsModif));
    }
}

const productos = new ProductManager;

//productos.addProduct('titulo', 'descripcion', 1000, 'imagen', 'abc123', 55);

//productos.addProduct('titulo2', 'descripcion2', 2000, 'imagen2', 'abc1234', 56);

//productos.getProducts();

//productos.getProductsById(3);

//productos.deleteProductsById(1);

productos.updateProducts(
    {
    title: 'titulo',
    description: 'descripcion',
    price: 3000,
    image: 'imagen',
    code: 'abc123',
    stock: 55,
    id: 1
    }
)