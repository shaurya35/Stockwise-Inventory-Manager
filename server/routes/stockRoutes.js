// const express = require("express");
// const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../middlewares/wrapAsync.js");
// const { isLoggedIn, isOwner } = require("../middlewares/authMiddleware.js");
// const {
//   getAllStocks,
//   getStock,
//   createStock,
//   updateStock,
//   deleteStock,
// } = require("../controllers/stockController.js");

// // get all stocks
// router.get("/", isLoggedIn, isOwner, wrapAsync(getAllStocks));

// // create new stock
// router.post("/", isLoggedIn, isOwner, wrapAsync(createStock));

// // get stock by id
// router.get("/:stockId", isLoggedIn, isOwner, wrapAsync(getStock));

// // update stock
// router.put("/:stockId", isLoggedIn, isOwner, wrapAsync(updateStock));

// // delete stock
// router.delete("/:stockId", isLoggedIn, isOwner, wrapAsync(deleteStock));

// module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../middlewares/wrapAsync.js");
const {
  getAllStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
} = require("../controllers/stockController.js");

// get all stocks
router.get("/", wrapAsync(getAllStocks));

// create new stock
router.post("/", wrapAsync(createStock));

// get stock by id
router.get("/:stockId", wrapAsync(getStock));

// update stock
router.put("/:stockId", wrapAsync(updateStock));

// delete stock
router.delete("/:stockId", wrapAsync(deleteStock));

module.exports = router;
