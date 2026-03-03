import { Router } from "express";
import getInvoices from "../controllers/getInvoices.js";

const router = new Router()

router.get('/',getInvoices)

export default router