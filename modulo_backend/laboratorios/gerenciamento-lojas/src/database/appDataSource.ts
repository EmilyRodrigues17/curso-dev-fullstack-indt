import { DataSource } from "typeorm";
import dotenv from 'dotenv'

dotenv.config()

export const appDataSource = new DataSource({
    type: "postgres",
    // Se existir a variável DB_HOST (vinda do Docker), usa ela. 
    // Senão, usa "localhost" (para você conseguir rodar no seu PC fora do Docker).
    host: process.env.DB_HOST || "localhost", 
    port: Number(process.env.DB_PORT) || 5433,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "123",
    database: process.env.DB_NAME || "gerenciamentoLojas",
    
    // ATENÇÃO AQUI: Em produção (dentro do Docker), o caminho muda para .js
    entities: [
        process.env.NODE_ENV === "production" 
        ? "dist/entities/*.js" 
        : "src/entities/*.ts"
    ],
    
    logging: ["query", "error", "schema"],
    // Em produção real, synchronize deve ser false. Use migrations!
    synchronize: process.env.NODE_ENV !== "production", 
});