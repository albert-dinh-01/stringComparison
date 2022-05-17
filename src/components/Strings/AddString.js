import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import "./AddString.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";

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
	"@media (max-width: 501px)": {
		width: "90vw"
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
	const [openInfo, setOpenInfo] = useState(false);

	const handleOpenInfo = (e) => {
		e.preventDefault();
		setOpenInfo(true);
	};
	const handleCloseInfo = (e) => {
		e.preventDefault();
		setOpenInfo(false);
	};

	useEffect(() => {
		const data = sessionStorage.getItem("my-pairs");
		if (data) {
			setComparedPairs(JSON.parse(data));
		}
	}, []);

	useEffect(() => {
		sessionStorage.setItem("my-pairs", JSON.stringify(comparedPairs));
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
		var today = new Date();
		var date =
			today.getFullYear() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getDate();
		var time =
			today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date + " " + time;
		var uniqueIds = uuidv4();
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
					result: true,
					date: dateTime,
					id1: uniqueIds
				}
			]);
			setAreStringsEqual(true);
		} else {
			setComparedPairs([
				...comparedPairs,
				{
					s1: enteredString1,
					s2: enteredString2,
					result: false,
					date: dateTime,
					id1: uniqueIds
				}
			]);
			setAreStringsEqual(false);
		}
	};

	const deletePair = (uid) => {
		const newList = comparedPairs.filter((item) => item.id1 !== uid);
		setComparedPairs(newList);
	};

	return (
		<Card>
			<form>
				<div className="m-0 p-0 flex justify-between" id="headerWithInfo">
					<div className="welcometext font-bold text-4xl">
						Welcome to String Comparison!
					</div>
					<div className="p-0 m-0" id="info">
						<IconButton
							color="secondary"
							aria-label="add an alarm"
							onClick={(e) => {
								handleOpenInfo(e);
							}}
						>
							<InfoIcon />
						</IconButton>
						<Modal
							open={openInfo}
							onClose={handleCloseInfo}
							aria-labelledby="parent-modal-title"
							aria-describedby="parent-modal-description"
						>
							<Box sx={style}>
								<p className="text-left" id="WhyStringComparison">
									<strong>Why String Comparison?</strong>
								</p>

								<p className="text-left">
									{" "}
									String Comparison was built because I find myself compare two
									strings very frequently.
								</p>
								<br />
								<p className="text-left" id="techUsed">
									<strong>Technologies used</strong>
								</p>
								<ul>
									<li className="text-left" id="front">
										- React
									</li>
									<li className="text-left" id="style">
										- Styled with Tailwind CSS
									</li>
									<li className="text-left" id="deployment">
										- Deployed with AWS Amlify
									</li>
								</ul>
							</Box>
						</Modal>
					</div>
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
								<p className="text-3xl" id="historyTitle">
									Comparison history
								</p>
								<div id="stringList">
									{comparedPairs.map((pair) => (
										<div
											className="flex justify-between bg-emerald-100 rounded-lg m-3.5 p-2"
											id={pair.id1}
										>
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
												<div
													className="p-0 m-0 text-left italic overFlowTest"
													id="dateTime"
												>
													Time: {pair.date}
												</div>
											</div>
											<div className="" id="resultAndDelete">
												<div className="p-0 m-0 text-center" id="outcome">
													{pair.result ? "👍🏻" : "👎🏻"}
												</div>
												<IconButton
													color="secondary"
													aria-label="Delete a compared pair of strings"
													onClick={() => {
														deletePair(pair.id1);
													}}
													className="text-center"
												>
													<DeleteIcon />
												</IconButton>
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
