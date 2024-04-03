// Menginisiasi Module
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Membuat folder baru (jika belum ada)
const directory = "./data";
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

// Membuat file contact.json (jika belum ada)
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const addContacts = (contact) => {
  return new Promise((resolve, reject) => {
    rl.question(contact, (data) => {
      resolve(data);
    });
  });
};

const saveContacts = (nama, noHP, alamat) => {
  // Memasukkan inputan user ke file contact.json
  const contact = { nama, noHP, alamat };
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);
  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("Data Telah Ditambahkan");
  rl.close();
};

module.exports = { addContacts, saveContacts };
