// components/Skills.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addSkill, updateSkill, deleteSkill } from "../redux/skillSlice";

import 'react-toastify/dist/ReactToastify.css';

const Skills = () => {

  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skillDetails);

  

  

  const [newSkill, setNewSkill] = useState({ skill: "", proficiency: 0 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleAddSkill = () => {
    if (newSkill.skill) {
      dispatch(addSkill(newSkill));
      setNewSkill({ skill: "", proficiency: 0 });
    }
  };

  const handleUpdateSkill = (index, event) => {
    const { name, value } = event.target;
    dispatch(updateSkill({ index, [name]: value }));
  };

  const handleDeleteSkill = (index) => {
    dispatch(deleteSkill(index));
  };

  return (
    <>
    <Card>
      <CardHeader title="Skills Section" />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {skills.map((skill, index) => (
            <Grid item xs={12} key={index}>
             
             <Box sx={{display:'flex', justifyContent:'space-around'}}>
             
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="skill"
                label="Skill"
                sx={{width:'60%'}}
                value={skill.skill}
                onChange={(event) => handleUpdateSkill(index, event)}
              />
              <TextField
                select
                margin="dense"
                variant="outlined"
                name="proficiency"
                label="Proficiency"
                sx={{width:'30%'}}
                value={skill.proficiency}
                onChange={(event) => handleUpdateSkill(index, event)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
              <IconButton onClick={() => handleDeleteSkill(index)}>
                <DeleteIcon color="error" />
              </IconButton>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
          <Box sx={{display:'flex', justifyContent:'space-around'}}>
             
            <TextField
              margin="dense"
              variant="outlined"
              type="text"
              name="skill"
              label="New Skill"
              sx={{width:'60%'}}
              value={newSkill.skill}
              onChange={handleInputChange}
            />
            <TextField
              select
              margin="dense"
              variant="outlined"
              name="proficiency"
              label="Proficiency"
              sx={{width:'38%'}}
              value={newSkill.proficiency}
              onChange={handleInputChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
           
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleAddSkill}
            >
              Add Skill
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <Grid container spacing={2} alignItems="center" lg={12} >
    <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
      <Link to={'/certificates'} style={linkStyle}>
        <ArrowBackIcon style={iconStyle} />
        <h4>Certificates Section</h4>
      </Link>
      <Link to={'/templates'} style={linkStyle}>
        <h4>Resume Templates</h4>
        <ArrowForwardIcon style={iconStyle} />
      </Link>
    </Grid>
  </Grid>
  </>
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
export default Skills;
