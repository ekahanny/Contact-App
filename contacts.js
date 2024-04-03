// Menginisiasi Module
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Mendeklarasikan path directory dari file tempat data disimpan
const directory = "./data";
const dataPath = "./data/contacts.json";

// Menambahkan folder data (jika belum ada)
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

// Menambahkan file contacts.json (jika belum ada)
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// Mengambil data yang dibutuhkan dari inputan user
const addContacts = (contact) => {
  return new Promise((resolve, reject) => {
    rl.question(contact, (data) => {
      resolve(data);
    });
  });
};

// Menyimpan data dari hasil inputan user kedalam file contacts.json
const saveContacts = (nama, noHP, alamat) => {
  const contact = { nama, noHP, alamat };
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);
  contacts.push(contact);
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
  console.log("Data telah ditambahkan.");
  rl.close();
};

// Function untuk menghapus kontak berdasarkan nama/no hp
const deleteContact = async (searchKey) => {
  const file = fs.readFileSync(dataPath, "utf-8");
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

// Mencari kontak berdasarkan nama/no hp
const searchContact = (searchKey) => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);

  const foundContacts = contacts.filter(
    (contact) =>
      contact.nama.toLowerCase().includes(searchKey.toLowerCase()) ||
      contact.noHP.includes(searchKey)
  );

  if (foundContacts.length > 0) {
    console.log("Kontak yang ditemukan:");
    foundContacts.forEach((contact) => {
      console.log(
        `Nama: ${contact.nama}, No. HP: ${contact.noHP}, Alamat: ${contact.alamat}`
      );
    });
  } else {
    console.log(`Kontak dengan nama atau nomor ${searchKey} tidak ditemukan.`);
  }

  rl.close();
};

// Mengurutkan kontak berdasarkan huruf awal dari nama kontak
const bubbleSort = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j].nama.toLowerCase() > arr[j + 1].nama.toLowerCase()) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

const sortContacts = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  let contacts = JSON.parse(file);

  contacts = bubbleSort(contacts);
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
  console.log("Kontak telah diurutkan.");
  rl.close();
};

// Menampilkan keseluruhan daftar kontak
const listContacts = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);

  if (contacts.length > 0) {
    console.log("Daftar Kontak:");
    contacts.forEach((contact, index) => {
      console.log(
        `${index + 1}. Nama: ${contact.nama}, No. HP: ${
          contact.noHP
        }, Alamat: ${contact.alamat}`
      );
    });
  } else {
    console.log("Tidak ada kontak yang ditemukan.");
  }

  rl.close();
};

// Mengekspor modul agar function dapat digunakan pada file App.js
module.exports = {
  addContacts,
  saveContacts,
  deleteContact,
  searchContact,
  bubbleSort,
  sortContacts,
  listContacts,
};
