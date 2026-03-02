import { error } from 'console';
import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const dataSource = './data/list.txt';
const router = express.Router();

router.get('/', (req,res) => {
     res.send("olá está na raiz!!");
})


//          Insert
router.post('/contato', async (req,res) =>{
    const { name } = req.body;

    if(!name || name.length < 2) {
        return res.json({ error: "Nome precisa no mínino 2 caracteres." });
    }

    

    //          processamento dos dados

    let list: string[] = [];
    try{
        const data = await readFile(dataSource, { encoding: 'utf-8' });
        list = data.split('\n');
    } catch (error){}

    list.push(name);
    await writeFile(dataSource, list.join('\n'));


     res.status(201).json({ contato: name });
})

router.get('/contatos', async (req,res) => {
    let list: string[] = [];
    try{
    const data = await readFile(dataSource, { encoding: 'utf-8' });
    list = data.split('\n');
    } catch(err) {}

    res.json({ contatos: list });

})


router.delete('/contato', async (req,res) =>{
    const { name } = req.query;

    if(!name) {
        return res.json({ error: 'Precisa mandar um nome para excluir!' });
    }

    let list: string[] = [];
    try{
    const data = await readFile(dataSource, { encoding: 'utf-8' });
    list = data.split('\n');
    } catch(err) {}

    list = list.filter(item => item.toLowerCase() !== (name as string).toLowerCase())

    res.json({contato: name});
    await writeFile(dataSource, list.join('\n'));
        
})

export default router;