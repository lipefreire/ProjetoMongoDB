const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
app.use(express.json());
require("./models/Artigo");
const Artigo = mongoose.model('artigo')


app.use((req, res, next) => {
    // console.log("Acessou o middleware!");
    res.setHeader("Acess-Control-Allow-Origin", "http://localhost:8080")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    app.use(cors());
    next();
})

// Consultar todos os ids cadastrados
app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado."
        })
    })
});

// Consultar a partir de um ID
app.get("/artigo/:id", (req, res) => {
    Artigo.findOne({_id: req.params.id}).then((artigo) => {
        return res.json(artigo);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado para esse ID."
        })
    })
})

// Adicionar um ID
app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Artigo não cadastrado."
        })
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    })
})

// Atualizar um artigo através do seu ID
app.put("/artigo/:id", (req, res) => {
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro. Não foi possível atualizar o artigo."
        })
        return res.json({
            error: false,
            message: "Artigo editado com sucesso!"
        })
    })
})

// Deletar a partir de um ID
app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro. Não foi possível deletar o artigo."
        })
        return res.json({
            error: false,
            message: "Artigo deletado com sucesso!"
        })
    })
})

mongoose.set("strictQuery", true)

mongoose.connect('mongodb://127.0.0.1:27017/projeto').then(() => {
    console.log("Conexão Estabelecida...")
}).catch(() => {
    console.log('Conexão Falha.')
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080...")
});