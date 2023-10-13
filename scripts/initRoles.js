const mongoose = require('mongoose');
const Role = require('../models/roles'); 
const dbConnection = require('../database');


const initialRoles = [
  { name: 'usuario' },
  { name: 'administrador' },

];

    Role.create(initialRoles)
      .then(() => {
        console.log('Roles iniciales creados con éxito');
        process.exit();
      })
      .catch(error => {
        console.error('Error al crear roles iniciales:', error);
        process.exit(1);
      });
