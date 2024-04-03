// Mengimpor function yang akan digunakan dari file contacts.js
const {
  addContacts,
  saveContacts,
  deleteContact,
  searchContact,
  bubbleSort,
  sortContacts,
  listContacts,
} = require("./contacts.js");

// Function utama untuk menampilkan menu
const main = async () => {
  const choice = await addContacts(
    "Pilih aksi (1: Tambah Kontak, 2: Lihat Semua Kontak, 3: Cari Kontak, 4: Urutkan Kontak, 5: Hapus Kontak) : "
  );

  // Menjalankan menu sesuai dengan pilihan user
  switch (choice) {
    case "1":
      const nama = await addContacts("Masukkan Nama Anda : ");
      const noHP = await addContacts("Masukkan No. HP Anda : ");
      const alamat = await addContacts("Masukkan Alamat Anda : ");
      saveContacts(nama, noHP, alamat);
      break;
    case "2":
      listContacts();
      break;
    case "3":
      const searchKey = await addContacts(
        "Masukkan Nama atau No. HP Kontak yang ingin dicari: "
      );
      searchContact(searchKey);
      break;
    case "4":
      sortContacts(bubbleSort);
      listContacts();
      break;
    case "5":
      const deleteChoice = await addContacts(
        "Masukkan Nama atau No. HP Kontak yang ingin dihapus: "
      );
      await deleteContact(deleteChoice);
      listContacts();
      break;
    default:
      console.log("Pilihan tidak valid.");
      rl.close();
      break;
  }
};

// Memanggil function utama
main();
