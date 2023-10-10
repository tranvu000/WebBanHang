import express from "express";
import UserController from '../../app/Controller/Admin/UserControler.js'

const adminUserRouter = (app) => {
  const router = express.Router();
  const userController = new UserController();
  
  router.post("/", userController.store);
  router.get("/", (req, res) => {
    res.send('2');
  });
  router.get("/:userId", (req, res) => {
    res.send('3');
  });
  router.put("/:userId", (req, res) => {
    res.send('4');
  });
  router.delete("/:userId", (req, res) => {
    res.send('5');
  });

  app.use('/users', router)
}

export default adminUserRouter;