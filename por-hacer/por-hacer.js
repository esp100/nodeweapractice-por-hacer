const fs = require('fs');

let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);


    const data1 = new Uint8Array(Buffer.from(data));
    fs.writeFile(`db/data.json`, data1, (err) => {
        if (err) console.log(err);

        else {
            console.log(`data.json guardado`);
        }
    });


}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}


const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();
    return porHacer;

}

const listar = () => {
    cargarDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
        // return listadoPorHacer[index];
    } else return false;
}


const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        //////////////splice para borrar 1 elemento a partir de la posicion de index
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;

        // ALTERNATIVE
        // let nuevoListado = listadoPorHacer.filter(tarea => {
        //     return tarea.descripcion !== descripcion
        // });
        // if (listadoPorHacer.length === nuevoListado.length) {
        //     return false;
        // } else {
        //     listadoPorHacer = nuevoListado;
        //     guardarDB();
        //     return true;
        // }

    } else return false;
}


module.exports = {
    crear,
    listar,
    actualizar,
    borrar
};