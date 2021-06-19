/* eslint-disable key-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

// eslint-disable-next-line object-curly-spacing
// eslint-disable-next-line quotes
const {nanoid} = require("nanoid");
// eslint-disable-next-line quotes
const notes = require("./notes");

/* eslint-disable eol-last */
const addNoteHandler = (request, h) => {
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNote ={
        title, tags, body, id, createdAt, updateAt,
    };
    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess){
        const response = h.response({
            status : 'success',
            message: 'catatan berhasil ditambahkan',
            data: {
                nodeId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'catatan gagal ditambahkan',

    });
    response.code(500);
    return response;
};
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});
const getNoteByIdHandler = (request, h) => {
    const {id} = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined){
        return {
            status:'success',
            data:{
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHanlder = (request, h) => {
    const {id} = request.params;

    const {title, tags, body} = request.payload;
    const updateAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };
        const response = h.response({
            status: 'success',
            message:'catatan berhasil diperbaharui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'gagal memperbaharui catatan karena id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const index = notes.findIndex((note)=>note.id === id);

    if (index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'catatan gagal dihapus karena id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// eslint-disable-next-line max-len
module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHanlder, deleteNoteByIdHandler};