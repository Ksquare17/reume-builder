import React, { useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatequalification, addqualification, deletequalification, clearqualifications } from "../redux/qualificationSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Qualification = () => {
    const dispatch = useDispatch();
    const qualifications = useSelector((state) => state.qualificationDetails);
    const [showInputFields, setShowInputFields] = useState(false);


    const handleInputChange = (index, event, content) => {
        if (event) {
            const { name, value } = event.target;
            // For regular text input
            dispatch(updatequalification({ index, field: name, value }));
        } else {
            // console.log("Index:", index);
            // console.log("Content:", content);
            dispatch(updatequalification({ index, field: "desc", value: content }));
        }
    };



    const handleAddExperience = () => {
        dispatch(addqualification());
        setShowInputFields(true);
    };

    const handleDeleteExperience = (index) => {
        dispatch(deletequalification((index)));
        setShowInputFields(false);
    };

    const containerStyle = {
        marginTop: "30",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    };

    const contentExpr = (
        <div>
            <p>1. Provide  description of the project.</p>
            <p>eg.</p>
            <p>Streamlined project management process using MERN stack.</p>
            <p> Integrated Material-UI and React for intuitive user interface.</p>
            <p>Implemented Redux for centralized state management and seamless data flow.</p>
        </div>
    );


    return (
        <div style={containerStyle}>
            <Card>
                <CardHeader
                    title={
                        <Typography variant="h5" align="center" fontWeight="bold">
                            Education Details
                        </Typography>
                    }
                />
            </Card>
            <CardContent>
                {
                    qualifications?.map((experience, index) => (
                        <div key={index}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h5" sx={{ marginTop: "8px" }}>
                                    Education {index + 1}
                                </Typography>
                                <IconButton onClick={() => handleDeleteExperience(index)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </div>
                            <Grid container spacing={1} alignItems="center" lg={12}>
                                <Grid item md={6} sm={12} xs={12} lg={6}>

                                    <TextField
                                        margin="dense"
                                        variant="outlined"
                                        type="text"
                                        name="institute"
                                        label="Institute"
                                        style={{ width: "100%" }}
                                        value={experience.institute}
                                        onChange={(event) => handleInputChange(index, event)}

                                    />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12} lg={6}>

                                    <TextField
                                        margin="dense"
                                        variant="outlined"
                                        type="text"
                                        name="degree"
                                        label="Degree"
                                        style={{ width: "100%" }}
                                        value={experience.degree}
                                        onChange={(event) => handleInputChange(index, event)}

                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} alignItems="center" lg={12}>
                                <Grid item md={12} sm={12} xs={12} lg={12}>

                                    <TextField
                                        margin="dense"
                                        variant="outlined"
                                        type="text"
                                        name="fos"
                                        label="Field of Study"
                                        style={{ width: "100%" }}
                                        value={experience.fos}
                                        onChange={(event) => handleInputChange(index, event)}

                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} alignItems="center" lg={12} mb={2}>
                                <Grid item md={6} sm={12} xs={12} lg={6}>

                                    <TextField
                                        margin="dense"
                                        variant="outlined"
                                        name="startYear"
                                        label="Start Date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        style={{ width: "100%" }}
                                        value={experience.startYear}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12} lg={6}>

                                    <TextField
                                        margin="dense"
                                        variant="outlined"
                                        name="endYear"
                                        label="End Date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        style={{ width: "100%" }}
                                        value={experience.endYear}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} lg={6}>

                                <TextField
                                    margin="dense"
                                    variant="outlined"
                                    name="grade"
                                    label="Grade"
                                    type="text"
                                    style={{ width: "100%" }}
                                    value={experience.grade}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </Grid>

                        </div>
                    ))
                }
                <Button
                    variant="contained"
                    sx={{
                        marginTop: "8px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
                        float: 'right'
                    }}
                    onClick={handleAddExperience}
                >
                    Add Education
                </Button>
            </CardContent >

            <Grid container spacing={2} alignItems="center" lg={12} >
                <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
                    <Link to={'/profile'} style={linkStyle}>
                        <ArrowBackIcon style={iconStyle} />
                        <h4>Profile Section</h4>
                    </Link>
                    <Link to={'/experience'} style={linkStyle}>
                        <h4>Experience Section</h4>
                        <ArrowForwardIcon style={iconStyle} />
                    </Link>
                </Grid>
            </Grid>
        </div >
    );
};

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '5px',
    transition: 'border-radius 0.3s', // Add transition for border-radius
    borderRadius: '4px', // Initial border-radius
    padding: '5px', // Add padding for hover effect
};

const containerStyles = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'crimson',
    marginTop: '20px',
    paddingRight: '40px',
    paddingLeft: '40px',
};
const iconStyle = {
    verticalAlign: 'middle', // Align icon vertically with text
    marginLeft: '5px', // Add margin between icon and text
};

export default Qualification;
