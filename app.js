const { addContacts, saveContacts } = require("./contacts.js");

// Mengambil inputan dari terminal
const main = async () => {
  const nama = await addContacts("Masukkan Nama Anda : ");
  const noHP = await addContacts("Masukkan No. HP Anda : ");
  const alamat = await addContacts("Masukkan Alamat Anda : ");

  saveContacts(nama, noHP, alamat);
};

main();
