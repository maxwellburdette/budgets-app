import { Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

export default function BudgetCard({
	name,
	amount,
	max,
	gray,
	fadeIn,
	onAddExpenseClick,
	onViewExpensesClick,
	hideButtons,
}) {
	const classNames = [];
	if (amount > max) {
		classNames.push("bg-danger", "bg-opacity-10");
	} else if (gray) {
		classNames.push("bg-light");
	}

	return (
		<Slide direction="up" in={fadeIn} mountOnEnter unmountOnExit>
			<Card className={classNames.join(" ")}>
				<Card.Body>
					<Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
						<div className="me-2">{name}</div>
						<div className="d-flex align-items-baseline">
							{currencyFormatter.format(amount)}
							{max && (
								<span className="text-muted fs-6 ms-1">
									/ {currencyFormatter.format(max)}
								</span>
							)}
						</div>
					</Card.Title>
					{max && (
						<ProgressBar
							className="rounded-pill"
							variant={getProgressBarVariant(amount, max)}
							min={0}
							max={max}
							now={amount}
						></ProgressBar>
					)}
					{!hideButtons && (
						<Stack className="mt-4" direction="horizontal" gap="2">
							<Button
								className="ms-auto"
								variant="outlined"
								onClick={onAddExpenseClick}
							>
								Add Expense
							</Button>
							<Button
								onClick={onViewExpensesClick}
								variant="outlined"
								color="secondary"
							>
								View Expenses
							</Button>
						</Stack>
					)}
				</Card.Body>
			</Card>
		</Slide>
	);
}

function getProgressBarVariant(amount, max) {
	const ratio = amount / max;
	if (ratio < 0.5) return "primary";
	if (ratio < 0.75) return "warning";
	return "danger";
}
