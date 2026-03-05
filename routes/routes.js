import { Router } from "express";
import downloadInvoices from "../controllers/downloadInvoices.js";
import getAllInvoices from "../controllers/getAllInvoices.js";

const router = new Router()

router.get('/downloadInvoices',downloadInvoices)

router.get('/getAllInvoices',getAllInvoices)

export default router