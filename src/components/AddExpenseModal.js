import { useRef } from "react";
import { Modal, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
	useBudgets,
	UNCATEGORIZED_BUDGET_ID,
} from "../contexts/BudgetsContext";

export default function AddExpenseModal({
	show,
	handleClose,
	defaultBudgetId,
}) {
	const { addExpense, budgets } = useBudgets();
	const descriptionRef = useRef();
	const budgetIdRef = useRef();
	const amountRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		addExpense({
			description: parseTextField(descriptionRef.current),
			amount: parseFloat(parseTextField(amountRef.current)),
			budgetId: budgetIdRef.current.value,
		});
		handleClose();
	}

	function parseTextField(textField) {
		return textField.children[1].children[0].value;
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>New Expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<TextField
							className="my-2"
							id="description"
							style={{ width: "100%" }}
							label="Description"
							variant="outlined"
							type="text"
							ref={descriptionRef}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<TextField
							className="my-2"
							id="amount"
							style={{ width: "100%" }}
							label="Amount"
							variant="outlined"
							type="number"
							min={0}
							step={0.01}
							ref={amountRef}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Budget</Form.Label>
						<Form.Select
							style={{ boxShadow: "none" }}
							defaultValue={defaultBudgetId}
							ref={budgetIdRef}
							size="lg"
						>
							<option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
							{budgets.map((budget) => {
								return (
									<option key={budget.id} value={budget.id}>
										{budget.name}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3"></Form.Group>
					<div className="d-flex justify-content-end">
						<Button variant="contained" type="submit">
							Add
						</Button>
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	);
}
