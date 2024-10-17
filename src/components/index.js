import { lazy } from "react";

const Title = lazy(() => import("./Title"));
const Balance = lazy(() => import("./Balance"));
const IncomeExpense = lazy(() => import("./IncomeExpense"));
const History = lazy(() => import("./History"));
const TransactionInput = lazy(() => import("./TransactionInput"));

export { Title, Balance, IncomeExpense, History, TransactionInput };
