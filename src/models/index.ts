import { Sequelize } from "sequelize";
import DbSequelize from "@/config/db";
import * as fs from "fs";
import * as path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initializeModels = async (sequelize: Sequelize) => {
  // TODO: Handle the dynamic imports based on the config file, becuase failed to restarting the tables
  const models: { [key: string]: any } = {};
  const modelsPath = path.resolve(__dirname);

  // Load all model files dynamically
  const modelFiles = fs.readdirSync(modelsPath).filter((file) => file.endsWith(".model.ts"));

  for (const file of modelFiles) {
    const { default: Model } = await import(path.join(modelsPath, file));
    const modelName = file.replace(".model.ts", "");
    models[modelName] = Model.initModel(sequelize);
  }

  // Sync all models
  await sequelize.sync({ alter: true });
  console.log("Database synced");

  return models;
};

// Initialize models in an async function
const initializeApp = async () => {
  const Models = await initializeModels(DbSequelize);
  return { DbSequelize, Models };
};

export default initializeApp;
