// Importación de dependencias
const { Pool } = require('pg');
const { rows } = require('pg/lib/defaults');

// Nueva instancia declarando el objeto de configuración de base de datos
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgresql",
    database: "cursos",
    port: 5432,
    //idleTimeoutMillis: 5000,
    //connectionTimeoutMillis: 2000,
});

// Se disponibiliza función asíncrona que recibe como parametro el nombre de un nuevo curso
// el curso se debe agregar a la tabla cursos
const newCurso = async (nombre, nivelTecnico, fechaInicio, duracion) => {
    const SQLconsult = {
        text: `INSERT INTO curso (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`,
        values: [nombre, nivelTecnico, fechaInicio, duracion],
    }
    try {
        const result = await pool.query(SQLconsult);
        return result.rows

    } catch (error) {
        console.log(`Error al agregar un nuevo curso ${error}`)
        return error
    }
}

// Se disponibiliza función asíncrona "getCanales" que realice una consulta SQL, 
// para obetener y retornar todos los registros de la tabla "curso"
const getCurso = async () => {
    const SQLconsult = {
        text: `SELECT * FROM curso`,
    }
    try {
        const result = await pool.query(SQLconsult);
        return result.rows
    } catch (error) {
        console.log(`Error al consultar la tabla curso`);
        return error
    }
}

// Se disponibiliza función asíncrona "editCurso" para devolver un registro actualizado,
// luego de emitir una consulta SQL a la tabla "curso"
const editCurso = async (id, nombre, nivelTecnico, fechaInicio, duracion) => {
    const SQLconsult = {
        text: `UPDATE curso SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *`,
        values: [id, nombre, nivelTecnico, fechaInicio, duracion] 
    }
    try {
        const result = await pool.query(SQLconsult);
        console.log(`Curso actualizado correctamente`);
        return result.rows
    } catch (error) {
        console.log(`Error al editar el curso ${error}`);
        return error
    }
}

// Se disponibiliza función asíncrona "deleteCurso" que ejeuta una consulta SQL,
// para eliminar un registro de la tabla "curso"
const deleteCurso = async (id) => {
    const SQLconsult = {
        text: `DELETE FROM curso WHERE id=$1 RETURNING *;`,
        values: [id]
    }
    try {
        const result = await pool.query(SQLconsult);
        console.log(`Curso eliminado correctamente`);
        return result.rows        
    } catch (error) {
        console.log(`Error al eliminar el curso ${error}`);
        return error
    }
}


// Exportación de un objeto con las funciones asíncronas creadas
module.exports = {
    newCurso,
    getCurso,
    editCurso,
    deleteCurso
};
