/* eslint-disable quotes */
/* eslint-disable linebreak-style */

// eslint-disable-next-line max-len
const {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHanlder, deleteNoteByIdHandler} = require("./handler");

/* eslint-disable eol-last */
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    // options:{
    //     cros:{
    //         origin:['*'],
    //     },
    // },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    // eslint-disable-next-line key-spacing
    method:'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    // eslint-disable-next-line key-spacing
    method:'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHanlder,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];
module.exports = routes;