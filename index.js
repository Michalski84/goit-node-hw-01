const argv = require("yargs")
  .option("action", {
    alias: "a",
    describe: "Choose action",
    demandOption: true,
    type: "string"
  })
  .option("id", {
    describe: "User id",
    type: "string"
  })
  .option("name", {
    describe: "User name",
    type: "string"
  })
  .option("email", {
    describe: "User email",
    type: "string"
  })
  .option("phone", {
    describe: "User phone",
    type: "string"
  })
  .argv;

const { listContacts, getContactById, addContact, removeContact } = require("./contacts");

function handleAction(action, options) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (!options.id) {
        console.error("ID is required for action 'get'");
        return;
      }
      getContactById(options.id);
      break;

    case "add":
      if (!options.name || !options.email || !options.phone) {
        console.error("Name, email, and phone are required for action 'add'");
        return;
      }
      addContact(options.name, options.email, options.phone);
      break;

    case "remove":
      if (!options.id) {
        console.error("ID is required for action 'remove'");
        return;
      }
      removeContact(options.id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const action = argv.action;
const options = {
  id: argv.id,
  name: argv.name,
  email: argv.email,
  phone: argv.phone
};

if (!action) {
  console.error("Missing required argument: action");
} else {
  handleAction(action, options);
}
