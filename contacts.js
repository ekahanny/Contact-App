// contacts.js

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const directory = "./data";
const dataPath = "./data/contacts.json";

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

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
  const contact = { nama, noHP, alamat };
  const file = fs.readFileSync(dataPath, "utf8");
  const contacts = JSON.parse(file);
  contacts.push(contact);
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
  console.log("Data telah ditambahkan.");
  rl.close();
};

const deleteContact = async (searchKey) => {
  const file = fs.readFileSync(dataPath, "utf8");
  let contacts = JSON.parse(file);

  const index = contacts.findIndex(
    (contact) =>
      contact.nama.toLowerCase() === searchKey.toLowerCase() ||
      contact.noHP === searchKey
  );

  if (index !== -1) {
    const deletedContact = contacts.splice(index, 1)[0];
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log(`Kontak ${deletedContact.nama} telah dihapus.`);
  } else {
    console.log(`Kontak dengan nama atau nomor ${searchKey} tidak ditemukan.`);
  }

  rl.close();
};

module.exports = { addContacts, saveContacts, deleteContact };
