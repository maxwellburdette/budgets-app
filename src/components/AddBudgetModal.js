import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, handleClose }) {
	const [nameRef, setNameRef] = useState();
	const [maxRef, setMaxRef] = useState();
	const { addBudget } = useBudgets();
	function handleSubmit(e) {
		e.preventDefault();
		addBudget({
			name: nameRef,
			max: parseFloat(maxRef),
		});
		setNameRef();
		setMaxRef();
		handleClose();
	}

	function refresh() {
		setNameRef();
		setMaxRef();
		handleClose();
	}
	return (
		<Modal show={show} onHide={refresh}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>New Budget</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<TextField
							className="my-2"
							id="name"
							style={{ width: "100%" }}
							label="Name"
							variant="outlined"
							type="text"
							onChange={(e) => setNameRef(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<TextField
							className="my-2"
							id="max"
							style={{ width: "100%" }}
							label="Maximum Spending"
							variant="outlined"
							type="number"
							min={0}
							step={0.01}
							onChange={(e) => setMaxRef(e.target.value)}
							required
						/>
					</Form.Group>
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
