const { program, Option } = require("commander");
const fs = require("fs");

program
  .command("add")
  .requiredOption('-t , --title <string> ' , "indicates the title of entry")
//   .requiredOption(' -t , --title ' , "indicates the title of entry")
  .action((options) => {
    // let txt = options.t || options.title;
    // console.log(options);
    let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
    data = JSON.parse(data);
    let ID = fs.readFileSync("./id.txt", { encoding: "utf-8" });
    ID = JSON.parse(ID);
    const note = {
      ID: ID + 1,
      title: options.title,
      status: "to-do"
    };
    fs.writeFileSync("./id.txt", JSON.stringify(ID + 1));
    data.push(note);
    // console.log(data);
    fs.writeFileSync("./db.json", JSON.stringify(data));
  });
program.command("list")
  .addOption(new Option("-s ,--status <string>", "status to list").choices(['to-do', 'in progress', 'done']))
  .action((options) => {
    let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
    data = JSON.parse(data);
    let arr;
    // console.log(options);
    if(options.status){
      arr = data.filter((obj) => obj["status"] == options.status);
    }else{
      arr=data;
    }
    for (let i of arr) {
      // console.log(arr);
      console.log(` Title of ID ${i.ID}: ${i.title}, and the Status is ${i.status}`);
    }
  });

program
  .command("edit")
  .requiredOption("-t ,--title <string>", "for editing title")
  .requiredOption("-i ,--id <string>", "id to edit")
  .addOption(new Option("-s ,--status <string>", "status to edit").choices(['to-do', 'in progress', 'done']))
  // .option("-s ,--status <string>", "status to edit")
  .action((options) => {
    let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
    data = JSON.parse(data);
    arr = structuredClone(data);
    arr[options.id - 1].title = options.title;
    if(options.status){
      arr[options.id - 1].status = options.status;
    }
    // arr[options.id - 1].title = options.title;
    // arr[options.id - 1].title = (options.t |options.tittle);
    fs.writeFileSync("./db.json", JSON.stringify(arr));
  });

program
  .command("delete")
  .requiredOption("--id <string>", "id to delete")
  .action((options) => {
    let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
    data = JSON.parse(data);
    arr = structuredClone(data);
    filteredArr = arr.filter((obj) => obj["ID"] != options.id );
    console.log(filteredArr);
    fs.writeFileSync('./db.json',JSON.stringify(filteredArr));
  });

program.parse();
