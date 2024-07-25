"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../http/controllers/payment.controller");
const router = (0, express_1.Router)();
router.post('/fake-payment', payment_controller_1.PaymentController.fakePayment);
exports.default = router;
