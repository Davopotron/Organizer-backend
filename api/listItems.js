const express = require("express");
const router = express.Router();
const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const listItems = await prisma.ListItem.findMany();
    res.json(listItems);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { itemName, myListId } = req.body;
  try {
    const listItems = await prisma.listItem.create({
      data: {
        itemName,
        myListId,
      },
    });
    res.status(201).json(listItems);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const listItem = await prisma.listItem.findUniqueOrThrow({
      where: { id: +id },
      include: { myList: true },
    });
    res.json(listItem);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const { itemName, myListId } = req.body;

  try {
    const listItem = await prisma.listItem.findUniqueOrThrow({
      where: { id: +id },
    });
    if (!listItem) {
      return next({
        status: 404,
        message: `ListItem ${id} does not exist`,
      });
    }

    const updateData = {};
    if (itemName) updateData.itemName = itemName;
    if (myListId) updateData.myListId = +myListId;

    const updatedListItem = await prisma.listItem.update({
      where: { id: +id },
      data: updateData,
    });
    res.json(updatedListItem);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { itemName, myListId } = req.body;
  try {
    const listItem = await prisma.listItem.create({
      data: {
        itemName,
        myList: { connect: { id: myListId } },
      },
    });
    res.status(201).json(listItem);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const listItem = await prisma.listItem.findUniqueOrThrow({
      where: { id: +id },
    });
    await prisma.listItem.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
