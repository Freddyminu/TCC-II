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
	
	/*variaveis do voice do Keywords*/
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();
	/*variaveis do voice do Authors*/
	const {
		transcript: transcriptAuthors,
		listening: listeningAuthors,
		resetTranscript: resetTranscriptAuthors,
		browserSupportsSpeechRecognition: browserSupportsSpeechRecognitionAuthors
	} = useSpeechRecognition();
	/*variaveis do voice do Periodicos*/
	const {
		transcript: transcriptPeridicos,
		listening: listeningPeridicos,
		resetTranscript: resetTranscriptPeridicos,
		browserSupportsSpeechRecognition: browserSupportsSpeechRecognitionPeridicos
	} = useSpeechRecognition();


	/*useState do voice do Keywords*/
	const [text, setText] = useState(transcript);
	/*useState do voice do Authors*/
	const [text2, setText2] = useState(transcriptAuthors);
	/*useState do voice do Periodicos*/
	const [text3, setText3] = useState(transcriptPeridicos);


	/*useEffect do voice do Keywords*/
	useEffect(() => {
		setSearchField({ target: { value: transcript } })
		setText(transcript)
	}, [transcript]);
	/*useEffect do voice do Authors*/
	useEffect(() => {
		setSearchField({ target: { value: transcriptAuthors } })
		setText2(transcriptAuthors)
	}, [transcriptAuthors]);
	/*useEffect do voice do Periodicos*/
	useEffect(() => {
		setSearchField({ target: { value: transcriptPeridicos } })
		setText3(transcriptPeridicos)
	}, [transcriptPeridicos]);


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
										placeholder={transcript}
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
										{listening ? <PlayCircleIcon className="paddingiconsound" sx={{ padding: 1, color: 'tomato' }} fontSize="small" /> : <PauseCircleIcon sx={{ padding: 1 }} fontSize="small" />}
										<IconButton onClick={SpeechRecognition.startListening} > <MicIcon fontSize="small" /> </IconButton>
										<IconButton onClick={SpeechRecognition.stopListening}> <MicOff fontSize="small" /></IconButton>
									</div>
								</Grid>
								
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={5}>
									<TextField
										id="autores" label="Autores"
										type='text'
										name='author-filter'
										value={text2}
										placeholder={transcriptAuthors}
										variant="outlined"
										fullWidth
										InputLabelProps={{ shrink: true }}
										onChange={setAuthorField} />
								</Grid>
								<Grid item xs={1}>
									<div className="Sound">
										{listeningAuthors ? <PlayCircleIcon className="paddingiconsound" sx={{ padding: 1, color: 'tomato' }} fontSize="small" /> : <PauseCircleIcon sx={{ padding: 1 }} fontSize="small" />}
										<IconButton onClick={SpeechRecognition.startListening} > <MicIcon fontSize="small" /> </IconButton>
										<IconButton onClick={SpeechRecognition.stopListening}> <MicOff fontSize="small" /></IconButton>
									</div>
								</Grid>
								<Grid item xs={5}>
									<TextField

										id="venues" label="Periódicos/Eventos"
										type='text'
										name='venue-filter'
										value={text3}
										placeholder={transcriptPeridicos}
										variant="outlined"
										fullWidth
										InputLabelProps={{ shrink: true }}
										onChange={setVenue} />
								</Grid>
								<Grid item xs={1}>
									<div className="Sound">
										{listeningPeridicos ? <PlayCircleIcon className="paddingiconsound" sx={{ padding: 1 , color: 'tomato' }} fontSize="small" /> : <PauseCircleIcon sx={{ padding: 1 }} fontSize="small" />}
										<IconButton onClick={SpeechRecognition.startListening} > <MicIcon fontSize="small" /> </IconButton>
										<IconButton onClick={SpeechRecognition.stopListening}> <MicOff fontSize="small" /></IconButton>
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
											onClick={runSearch}
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
