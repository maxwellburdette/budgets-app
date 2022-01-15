import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Stack } from "react-bootstrap";
import Button from "@mui/material/Button";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetsContext";

function App() {
	const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
	const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
	const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
	const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
	const { budgets, getBudgetExpenses } = useBudgets();

	function openAddExpenseModal(budgetId) {
		setShowAddExpenseModal(true);
		setAddExpenseModalBudgetId(budgetId);
	}

	return (
		<>
			<Container className="my-4">
				<Stack className="mb-4" direction="horizontal" gap="2">
					<h1 className="me-auto">Budgets</h1>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => setShowAddBudgetModal(true)}
					>
						Add Budget
					</Button>
					<Button
						variant="outlined"
						color="primary"
						size="large"
						onClick={openAddExpenseModal}
					>
						Add Expense
					</Button>
				</Stack>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-full, minmax(300px, 1fr))",
						gap: "1rem",
						alignItems: "flex-start",
					}}
				>
					{budgets.map((budget) => {
						const amount = getBudgetExpenses(budget.id).reduce(
							(total, expense) => total + expense.amount,
							0
						);
						return (
							<BudgetCard
								key={budget.id}
								name={budget.name}
								amount={amount}
								max={budget.max}
								fadeIn={true}
								onAddExpenseClick={() => openAddExpenseModal(budget.id)}
								onViewExpensesClick={() =>
									setViewExpensesModalBudgetId(budget.id)
								}
							/>
						);
					})}
					<UncategorizedBudgetCard
						onAddExpenseClick={openAddExpenseModal}
						onViewExpensesClick={() =>
							setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
						}
					/>
					<TotalBudgetCard />
				</div>
			</Container>
			<AddBudgetModal
				show={showAddBudgetModal}
				handleClose={() => setShowAddBudgetModal(false)}
			/>
			<AddExpenseModal
				show={showAddExpenseModal}
				defaultBudgetId={addExpenseModalBudgetId}
				handleClose={() => setShowAddExpenseModal(false)}
			/>
			<ViewExpensesModal
				budgetId={viewExpensesModalBudgetId}
				handleClose={() => setViewExpensesModalBudgetId()}
			/>
		</>
	);
}

export default App;
