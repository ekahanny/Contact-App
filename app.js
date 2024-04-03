// app.js

const { addContacts, saveContacts, deleteContact } = require("./contacts.js");

const main = async () => {
  const choice = await addContacts(
    "Pilih aksi (1: Tambah Kontak, 2: Hapus Kontak) : "
  );

  if (choice === "1") {
    const nama = await addContacts("Masukkan Nama Anda : ");
    const noHP = await addContacts("Masukkan No. HP Anda : ");
    const alamat = await addContacts("Masukkan Alamat Anda : ");
    saveContacts(nama, noHP, alamat);
  } else if (choice === "2") {
    const deleteChoice = await addContacts(
      "Masukkan Nama atau No. HP Kontak yang ingin dihapus: "
    );
    await deleteContact(deleteChoice);
  } else {
    console.log("Pilihan tidak valid.");
    rl.close();
  }
};

main();
