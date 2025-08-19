const fs = require("fs");

// Read JSON file
const json = JSON.parse(fs.readFileSync("credentials.json", "utf8"));

let envContent = "";

// Loop through each key and value
for (const [key, value] of Object.entries(json)) {
  // Handle private key (replace newlines with \n for .env format)
  if (key === "private_key") {
    envContent += `${key.toUpperCase()}="${value.replace(/\n/g, "\\n")}"\n`;
  } else {
    envContent += `${key.toUpperCase()}="${value}"\n`;
  }
}

// Write to .env file
fs.writeFileSync(".env", envContent);

console.log(".env file created successfully!");
