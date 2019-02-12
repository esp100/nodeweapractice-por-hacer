const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];


switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);

        break;

    case 'listar':
        let listado = porHacer.listar();
        // console.log(tareaListar);
        for (let listar of listado) {
            console.log(`=========Por Hacer======`.green);
            console.log((listar.descripcion).rainbow);
            if (listar.completado == true)
                console.log(`Estado:`, 'Completado'.blue);
            else
                console.log(`Estado:`, 'No completado'.red);
            console.log('======================='.green);

        }
        break;

    case 'actualizar':

        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);


        break;

    case 'borrar':

        let borardo = porHacer.borrar(argv.descripcion);
        console.log('El borrado fue', borardo);

        break;

    default:
        console.log(`Comando no reconocido  ${comando}`);

}