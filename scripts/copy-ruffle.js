// Copies the self-hosted Ruffle build into public/ruffle so it is served as static files.
import { cpSync, rmSync, existsSync } from "node:fs";

const src = "node_modules/@ruffle-rs/ruffle";
const dest = "public/ruffle";

if (existsSync(src)) {
    rmSync(dest, { recursive: true, force: true });
    cpSync(src, dest, {
        recursive: true,
        filter: (p) => !p.endsWith(".map"),
    });
    console.log("Ruffle copied to", dest);
}
