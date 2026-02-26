import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("msm-nr1.db");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    size TEXT NOT NULL, -- '1-50', '51-500', '1000+'
    copsoq_version TEXT NOT NULL -- 'short', 'medium', 'long'
  );

  CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    name TEXT NOT NULL,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'draft', -- 'draft', 'active', 'completed'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER,
    department_id INTEGER,
    scores JSON, -- Stored as JSON string for simplicity in prototype
    FOREIGN KEY(campaign_id) REFERENCES campaigns(id),
    FOREIGN KEY(department_id) REFERENCES departments(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Company Routes
  app.post("/api/companies", (req, res) => {
    const { name, size, copsoq_version } = req.body;
    const stmt = db.prepare("INSERT INTO companies (name, size, copsoq_version) VALUES (?, ?, ?)");
    const info = stmt.run(name, size, copsoq_version);
    res.json({ id: info.lastInsertRowid, name, size, copsoq_version });
  });

  app.get("/api/companies", (req, res) => {
    const stmt = db.prepare("SELECT * FROM companies");
    const companies = stmt.all();
    res.json(companies);
  });

  // Department Routes
  app.post("/api/departments", (req, res) => {
    const { company_id, name } = req.body;
    const stmt = db.prepare("INSERT INTO departments (company_id, name) VALUES (?, ?)");
    const info = stmt.run(company_id, name);
    res.json({ id: info.lastInsertRowid, company_id, name });
  });

  app.get("/api/companies/:id/departments", (req, res) => {
    const stmt = db.prepare("SELECT * FROM departments WHERE company_id = ?");
    const departments = stmt.all(req.params.id);
    res.json(departments);
  });

  // Vite Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (simplified for this environment)
    app.use(express.static(path.resolve(__dirname, "dist")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
