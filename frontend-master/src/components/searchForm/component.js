import React from 'react';
import { useEffect, useState } from "react";

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

// <MicIcon fontSize="small" />
//<MicOff fontSize="small" />

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
// import TodayIcon from '@material-ui/icons/Today';

import InputUnstyled from '@mui/base/InputUnstyled';
import MicOff from '@mui/icons-material/MicOff';



function SearchForm({ runSearch, setSearchField, setAuthorField, setVenue, setBeginDate, setEndDate, setShowGraph, show_loading }) {
	/*variaveis do voice do microfone de Keywords*/
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();

	/*useState do voice do microfone de Keywords*/
	const [text, setText] = useState(transcript);
	const [textListening, setTextListening] = useState(false);
	/*useState do voice do microfone de Authors*/
	const [textAuthors, setTextAuthor] = useState('');
	const [textAuthorsListening, setTextAuthorsListening] = useState(false);
	/*useState do voice do microfone de Periodicos*/
	const [textPeridicos, setTextPeridicos] = useState('');
	const [textPeridicosListening, setTextPeridicosListening] = useState(false);

	const [fieldSetter, setFieldSetter] = useState(() => () => { });
	const [targetSetter, setTargetSetter] = useState(() => () => { });
	const turnOffListeningStates = () => {
		setTextListening(false);
		setTextAuthorsListening(false);
		setTextPeridicosListening(false);
	}

	/*useEffect do voice do microfone de Keywords*/
	useEffect(() => {
		fieldSetter({ target: { value: transcript } })
		targetSetter(transcript)
	}, [transcript]);

	useEffect(() => {
		if(listening == false) {
			turnOffListeningStates();
		}
	}, [listening]);

	return (
		<Grid container spacing={2}>
			<Grid item xs={1} />
			<Grid item xs={10}>
				<Paper elevation={2}>
					<div className="search-body">
						<form onSubmit={runSearch}>
							<Grid container spacing={2}>
								<Grid item xs={11}>
									<TextField
										id="busca" label="Palavras-chave *"
										type='text'
										value={text}
										name='q'
										variant="outlined"
										fullWidth
										InputProps={{
											endAdornment: <SearchIcon />
										}}
										InputLabelProps={{
											shrink: true

										}}
										onChange={e => {
											const value = e.target.value
											console.log(value)
											setText(value)
											setSearchField(e)
										}} />
								</Grid>
								<Grid item xs={1}>

									<div className="Sound">
										{textListening ? <PlayCircleIcon className="paddingiconsound" sx={{ padding: 1, color: 'tomato' }} fontSize="small" /> : <PauseCircleIcon sx={{ padding: 1 }} fontSize="small" />}
										<IconButton onClick={() => {
											setTargetSetter(() => setText);
											setFieldSetter(() => setSearchField);
											setTextAuthorsListening(false);
											setTextPeridicosListening(false);
											setTextListening(true);
											SpeechRecognition.startListening();
										}}>
											<MicIcon fontSize="small" />
										</IconButton>
										<IconButton onClick={() => {
											setTextListening(false);
											SpeechRecognition.stopListening();
										}}>
											<MicOff fontSize="small" />
										</IconButton>
									</div>
								</Grid>

							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={5}>
									<TextField
										id="autores" label="Autores"
										type='text'
										name='author-filter'
										value={textAuthors}
										variant="outlined"
										fullWidth
										InputLabelProps={{ shrink: true }}
										onChange={e => {
											const value = e.target.value
											console.log(value)
											setTextAuthor(value)
											setAuthorField(e)
										}} />
								</Grid>
								<Grid item xs={1}>
									<div className="Sound">
										{textAuthorsListening ? <PlayCircleIcon className="paddingiconsound" sx={{ padding: 1, color: 'tomato' }} fontSize="small" /> : <PauseCircleIcon sx={{ padding: 1 }} fontSize="small" />}
										<IconButton onClick={() => {
											setTargetSetter(() => setTextAuthor);
											setFieldSetter(() => setAuthorField);
											setTextListening(false);
											setTextPeridicosListening(false);
											setTextAuthorsListening(true);
											SpeechRecognition.startListening();
										}}
										> <MicIcon fontSize="small" /> </IconButton>
										<IconButton onClick={() => {
											setTextAuthorsListening(false);
											SpeechRecognition.stopListening();
										}}
										> <MicOff fontSize="small" /></IconButton>
									</div>
								</Grid>
								<Grid item xs={5}>
									<TextField

										id="venues" label="Periódicos/Eventos"
										type='text'
										name='venue-filter'
										value={textPeridicos}
										variant="outlined"
										fullWidth
										InputLabelProps={{ shrink: true }}
										onChange={e => {
											const value = e.target.value
											console.log(value)
											setTextPeridicos(value)
											setVenue(e)
										}} />
								</Grid>
								<Grid item xs={1}>
									<div className="Sound">
										{textPeridicosListening ? <PlayCircleIcon className="paddingiconsound" sx={{ padding: 1, color: 'tomato' }} fontSize="small" /> : <PauseCircleIcon sx={{ padding: 1 }} fontSize="small" />}
										<IconButton onClick={() => {
											setTargetSetter(() => setTextPeridicos);
											setFieldSetter(() => setVenue);
											setTextListening(false);
											setTextAuthorsListening(false);
											setTextPeridicosListening(true);
											SpeechRecognition.startListening();
										}} > <MicIcon fontSize="small" /> </IconButton>
										<IconButton onClick={() => {
											setTextPeridicosListening(false);
											SpeechRecognition.stopListening();
										}}> <MicOff fontSize="small" /></IconButton>
									</div>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={6}>
									<TextField

										id="begin-date-filter" label="Data de início"
										type='month'
										name='begin-date-filter'
										variant="outlined"
										fullWidth
										InputLabelProps={{ shrink: true }}
										onChange={setBeginDate} />
								</Grid>

								<Grid item xs={6}>
									<TextField

										id="end-date-filter" label="Data de fim"
										type='month'
										name='end-date-filter'
										variant="outlined"
										placeholder=''
										fullWidth
										InputLabelProps={{ shrink: true }}
										onChange={setEndDate} />
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={3}>
									<FormControlLabel
										control={
											<Checkbox
												onChange={setShowGraph}
												name="check_graph"
												color="primary"
											/>}
										label="Mostrar rede de colaboração" />
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={6} />
								<Grid container item xs={6} spacing={1}>
									<Grid item xs={6} />
									<Grid item xs={6}>
										<Button
											fullWidth
											onClick={e => {
												SpeechRecognition.stopListening();
												turnOffListeningStates();
												runSearch(e);
											}}
											disabled={show_loading}
											color="primary"
											variant="contained">
											{show_loading ? <CircularProgress color="white" size="30px" /> : null}
											{show_loading ? null : <span className="search-label"> BUSCAR </span>}
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</form>
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default SearchForm;
