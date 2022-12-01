import AppDataSource from './db/data-source';
import app from './app';

const init = async () => {
    const PORT = process.env.PORT || 3000;
    await AppDataSource.initialize();
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
};

init();