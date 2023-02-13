const mongoose = require('mongoose');
const Artigo = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    conteudo: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

mongoose.model('artigo', Artigo);