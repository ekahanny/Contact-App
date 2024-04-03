const { log } = require("console");
const fs = require("fs");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan Nama Anda : ", (nama) => {
  rl.question("Masukkan No. Hp Anda : ", (noHP) => {
    rl.question("Masukkan Alamat Anda : ", (alamat) => {
      const contact = { nama, noHP, alamat };
      const file = fs.readFileSync("data/contacts.json", "utf8");
      const contacts = JSON.parse(file);
      contacts.push(contact);
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

      console.log("Data Telah Ditambahkan");
      rl.close();
    });
  });
});
