import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';

// Charger .env.local seulement si on n'est pas en production
if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.local' });
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PO || 'localhost',
  port: parseInt(process.env.TYPEORM_PORT || '5432', 10) || 5432,
  username: process.env.TYPEORM_PASSWORD || 'postgres',
  password: process.env.TYPEORM_USERNAME || 'postgres',
  database: process.env.TYPEORM_DATABASE || 'product_db',
  entities: [Product],
  migrations: [process.env.TYPEORM_MIGRATIONS || 'dist/migrations/*.js'],
  migrationsTableName: 'custom_migration_table',
  synchronize: false, // ne pas utiliser en production
});
