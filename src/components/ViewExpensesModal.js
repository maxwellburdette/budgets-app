import { Modal, Stack } from "react-bootstrap";
import Button from "@mui/material/Button";
import { currencyFormatter } from "../utils";
import {
	UNCATEGORIZED_BUDGET_ID,
	useBudgets,
} from "../contexts/BudgetsContext";

export default function ViewExpensesModal({ budgetId, handleClose }) {
	const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
		useBudgets();

	const expenses = getBudgetExpenses(budgetId);

	const budget =
		UNCATEGORIZED_BUDGET_ID === budgetId
			? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
			: budgets.find((b) => b.id === budgetId);

	return (
		<Modal show={budgetId != null} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					<Stack direction="horizontal" gap="2">
						<div>Expenses - {budget?.name}</div>
						{budgetId !== UNCATEGORIZED_BUDGET_ID && (
							<Button
								onClick={() => {
									deleteBudget(budget);
									handleClose();
								}}
								variant="outlined"
								color="error"
							>
								Delete
							</Button>
						)}
					</Stack>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Stack direction="vertical" gap="3">
					{expenses.map((expense) => (
						<Stack direction="horizontal" gap="2" key={expense.id}>
							<div className="me-auto fs-4">{expense.description}</div>
							<div className="me-auto fs-5">
								{currencyFormatter.format(expense.amount)}
							</div>
							<Button
								onClick={() => deleteExpense(expense)}
								size="small"
								variant="outlined"
								color="error"
							>
								&times;
							</Button>
						</Stack>
					))}
				</Stack>
			</Modal.Body>
		</Modal>
	);
}
