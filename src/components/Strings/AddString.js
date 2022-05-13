import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import "./AddString.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import HistoryIcon from "@mui/icons-material/History";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import json2mq from "json2mq";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	borderRadius: "20px",
	boxShadow: 24,
	textAlign: "center",
	padding: "10px",
	heigh: "auto",
	maxHeight: "75vh",
	overflowY: "auto",
	"@media (max-width: 280px)": {
		width: "270px"
	}
};

const theme = createTheme({
	palette: {
		success: {
			main: "#04b84f",
			contrastText: "#fff"
		},
		error: {
			main: "#bf2e52",
			contrastText: "#fff"
		},
		secondary: {
			main: "#64748B",
			contrastText: "#000000"
		}
	}
});

const AddString = (props) => {
	const [enteredString1, setEnteredString1] = useState("");
	const [enteredString2, setEnteredString2] = useState("");
	const [compare, setCompare] = useState(false);
	const [areStringsEqual, setAreStringsEqual] = useState(false);
	const [onHistory, setOnHistory] = useState(false);
	const [comparedPairs, setComparedPairs] = useState([]);

	const matches = useMediaQuery(
		json2mq({
			minWidth: 600
		})
	);

	useEffect(() => {
		const data = localStorage.getItem("my-pairs");
		if (data) {
			setComparedPairs(JSON.parse(data));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("my-pairs", JSON.stringify(comparedPairs));
	});

	const handleOpenCompare = (e) => {
		e.preventDefault();
		setCompare(true);
	};
	const handleCloseCompare = (e) => {
		e.preventDefault();
		setCompare(false);
	};

	const handleOpenHistory = (e) => {
		e.preventDefault();
		setOnHistory(true);
	};
	const handleCloseHistory = (e) => {
		e.preventDefault();
		setOnHistory(false);
	};

	const deleteInputHandler = (event) => {
		event.preventDefault();
		setEnteredString1("");
		setEnteredString2("");
	};

	const string1ChangeHandler = (event) => {
		event.preventDefault();
		setEnteredString1(event.target.value);
	};

	const string2ChangeHandler = (event) => {
		event.preventDefault();
		setEnteredString2(event.target.value);
	};

	const onCompare = (event) => {
		event.preventDefault();
		if (
			enteredString1 === enteredString2 &&
			enteredString1 !== "" &&
			enteredString2 !== ""
		) {
			setComparedPairs([
				...comparedPairs,
				{
					s1: enteredString1,
					s2: enteredString2,
					result: true
				}
			]);
			setAreStringsEqual(true);
		} else {
			setComparedPairs([
				...comparedPairs,
				{
					s1: enteredString1,
					s2: enteredString2,
					result: false
				}
			]);
			setAreStringsEqual(false);
		}
	};
	return (
		<Card>
			<form>
				<div className="welcometext font-bold text-4xl">
					Welcome to String Comparison!
				</div>
				<div>
					<label className="sr-only" htmlFor="inlineFormInputGrop">
						String 1
					</label>
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<div className="input-group-text">String 1</div>
						</div>
						<input
							type="text"
							className="form-control"
							id="inlineFormInputGroup"
							placeholder="string 1"
							onChange={string1ChangeHandler}
							value={enteredString1}
						></input>
					</div>
				</div>
				<div>
					<label className="sr-only" htmlFor="inlineFormInputGroup">
						String 2
					</label>
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<div className="input-group-text">String 2</div>
						</div>
						<input
							type="text"
							className="form-control"
							id="inlineFormInputGroup"
							placeholder="string 2"
							onChange={string2ChangeHandler}
							value={enteredString2}
						></input>
					</div>
				</div>

				<div className="btns">
					<div className="btnDetails">
						<ThemeProvider theme={theme}>
							<Button
								variant="outlined"
								color="success"
								className="buttonSize"
								endIcon={<CheckIcon />}
								onClick={(e) => {
									handleOpenCompare(e);
									onCompare(e);
								}}
							>
								Compare
							</Button>
						</ThemeProvider>
						<Modal
							open={compare}
							onClose={handleCloseCompare}
							aria-labelledby="parent-modal-title"
							aria-describedby="parent-modal-description"
						>
							{areStringsEqual ? (
								<Box sx={{ ...style, width: 100 }}>
									<h2 className="thumbsUp" id="parent-modal-title">
										👍🏻
									</h2>
								</Box>
							) : (
								<Box sx={{ ...style, width: 100 }}>
									<h2 className="thumbsDown" id="parent-modal-title">
										👎🏻
									</h2>
								</Box>
							)}
						</Modal>
					</div>

					<div className="btnDetails">
						<ThemeProvider theme={theme}>
							<Button
								variant="outlined"
								endIcon={<DeleteIcon />}
								className="buttonSize"
								color="error"
								onClick={deleteInputHandler}
							>
								Delete
							</Button>
						</ThemeProvider>
					</div>

					<div className="btnDetails">
						<ThemeProvider theme={theme}>
							<Button
								variant="outlined"
								endIcon={<HistoryIcon />}
								className="buttonSize"
								color="secondary"
								onClick={(e) => {
									handleOpenHistory(e);
								}}
							>
								History
							</Button>
						</ThemeProvider>
						<Modal
							open={onHistory}
							onClose={handleCloseHistory}
							aria-labelledby="parent-modal-title"
							aria-describedby="parent-modal-description"
						>
							<Box sx={style}>
								<h1 className="text-3xl" id="historyTitle">
									String pairs
								</h1>
								<div id="stringList">
									{comparedPairs.map((pair) => (
										<div className="flex justify-between bg-emerald-100 rounded-lg m-3.5 p-2">
											<div className="max-w-[70%] w-auto" id="stringsContainer">
												<div
													className="p-0 m-0 text-left overFlowTest"
													id="string1"
												>
													String 1: {pair.s1}
												</div>
												<div
													className="p-0 m-0 text-left overFlowTest"
													id="string2"
												>
													String 2: {pair.s2}
												</div>
											</div>
											<div className="p-0 m-0 text-left" id="outcome">
												{pair.result ? "👍🏻" : "👎🏻"}
											</div>
										</div>
									))}
								</div>
							</Box>
						</Modal>
					</div>
				</div>
			</form>
			<div className="text-center" id="socialsStuff">
				Created by{" "}
				<a
					href="https://albertdinh.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="decoration-orange-900 decoration-wavy text-emerald-700">
						Albert Dinh
					</span>
				</a>{" "}
				&copy; 2022
			</div>
		</Card>
	);
};

export default AddString;
