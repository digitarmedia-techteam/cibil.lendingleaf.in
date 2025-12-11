import mysql from "mysql2/promise";
import winston from "winston";
import {
  RowDataPacket,
  OkPacket,
  ResultSetHeader,
  FieldPacket,
} from "mysql2/promise";


type QueryResult = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

// ✅ Validate required environment variables
const requiredEnv = ["DB_HOST", "DB_USER", "DB_NAME"];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
}

// ✅ Setup Winston logger for database errors
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/db-errors.log" }),
    new winston.transports.Console(),
  ],
});

// ✅ Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Export async query function
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  const [rows]: [QueryResult, FieldPacket[]] = await pool.query(sql, params);
  return rows as T[];
}

// ✅ Optional export
export { pool };
