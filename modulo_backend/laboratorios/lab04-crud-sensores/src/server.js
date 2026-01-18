import express from 'express';
import indexRoutes from './routes/indexRoutes.js';

const app = express();
const PORT = 3030;


// usado para definir o que é permitido receber
app.use(express.json());

// chamar as rotas
app.use('/api/v1', indexRoutes);



app.listen(PORT, () => {
    console.log(`Server on in ${PORT}`)
});