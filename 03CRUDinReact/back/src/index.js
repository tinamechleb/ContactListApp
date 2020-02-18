import app from './app';
import InitDB from './db';

const start = async () => {
  const controller = await InitDB();
  app.get("/", (req, res, next) => {
    try {
      res.json({ message: "Hello" });
    }
    catch (error) {
      next(error);
    }
  });

  app.get("/contacts", async (req, res, next) => {
    const { orderBy } = req.query;
    try {
      const result = await controller.getContacts(orderBy);
      res.json({ success: true, result });
    }
    catch (error) {
      next(error);
    }
  });

  app.get("/contact/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await controller.getContactByID(id);
      res.json({ success: true, result });
    }
    catch (error) {
      next(error);
    }
  });

  app.get("/contacts/create", async (req, res, next) => {
    const { name, email } = req.query;

    try {
      const result = await controller.createContact({ name, email });
      res.json({ success: true, result });
    }
    catch (error) {
      next(error);
    }
  });

  app.get("/contacts/delete/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await controller.deleteContact(id);
      res.json({ success: true, result });
    }
    catch (error) {
      next(error);
    }
  });

  app.get("/contacts/update/:id", async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.query;
    try {
      const result = await controller.updateContact(id, { name, email });
      res.json({ success: true, result });
    }
    catch (error) {
      next(error);
    }
  });

  app.use((error, req, res, next) => {
    res.status(500).json({ success: false, message: error });
  });

  app.listen(8000, () => {
    console.log("App listening on port 8000");
  });

}

start();