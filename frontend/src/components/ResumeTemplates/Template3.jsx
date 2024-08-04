import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Box, Avatar, Stack, LinearProgress } from '@mui/material';
import { Phone, Email, Work, Home,School , EmojiEvents} from '@mui/icons-material';
import { Button, CircularProgress, Paper } from "@mui/material";
import html2pdf from "html2pdf.js";
import Confetti from "react-confetti";
import github from "../../assets/github.png";
import linked from "../../assets/linked.png";
import leetcode from "../../assets/leetcode.png";
import codechef from "../../assets/codechef.png";
import codeforces from "../../assets/codeforces.png";
import portfolio from "../../assets/portfolio.png";
import DownloadIcon from "@mui/icons-material/Download";
import "../../styles/resumetemplate2.css";
import { Link } from 'react-router-dom';
import moment from 'moment';

import { styled } from '@mui/system';
import "../../styles/resumetemplate2.css";
import axios from "axios";
import { BASE_URL } from "../../api";
import { toast } from 'react-toastify';
const SkillContainer = styled(Box)(({ theme }) => ({
  margin:'2px 10px',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  color: 'white',
  marginBottom: theme.spacing(2),
  display: 'flex',        // Add this line
  alignItems: 'center',   // Optionally add this line to vertically center align items
  flexDirection: 'row',   // Add this line
}));


const SkillName = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  marginRight: theme.spacing(1),  // Add some margin to the right to space out from the progress bar
}));

const SkillProgress = styled(LinearProgress)(({ theme }) => ({
  height: '15px',
border:'3px solid white',
borderRadius:'1px',
  flexGrow: 1,  // Make the progress bar take up the remaining space
  background:'white',
  '& .MuiLinearProgress-bar': {
   borderRadius:'1px',
    backgroundColor: '#796EFF', // Color of the progress bar
  },
}));


const Subheading = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  fontSize: '1.5rem',
  margin:"30px 10px",
  fontWeight: 'bold',
  '&::after': {
    content: '""',
    display: 'block',
    width: '80%',
    height: '3px',
    borderRadius: '4px',
    backgroundColor: '#fff', // Adjust this color to your preference
    position: 'absolute',
    bottom: '-4px',
    left: 0,
  },
}));
const SubheadingP = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  fontSize: '1.5rem',
  margin:"30px 10px",
  fontWeight: 'bold',
  '&::after': {
    content: '""',
    display: 'block',
    width: '80%',
    height: '3px',
    borderRadius: '4px',
    backgroundColor: '#7771FF', // Adjust this color to your preference
    position: 'absolute',
    bottom: '-4px',
    left: 0,
  },
}));
const Template3 = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log("curr user", currentUser)
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skillDetails);
  console.log(skills)
  const profile = useSelector((state) => state.profileDetails);
  const certificates = useSelector((state) => state.certificateDetails);
  const experiences = useSelector((state) => state.experienceDetails);
  const qualifications = useSelector((state) => state.qualificationDetails);
  console.log("qua", qualifications)
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const customStyle = {
    width: "100%",
    maxWidth: "794px",
    margin: "auto",
    height: "1000px",
    maxHeight: "1000px",
 
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    display: "flex",
    // justifyContent: "center",
    flexDirection: "row",
    // alignItems: "center",
  };
  const handleSave = async () => {
    setLoading(true);
    const resumeData = {
      profile: profile,
      education: qualifications,
      experience: experiences,
      certificates: certificates,
      skills: skills,
    };
    // console.log("resume data: ", resumeData);
    try {
      const response = await axios.post(`${BASE_URL}/data/resume-data?id=${currentUser._id}`, { resumeData }, {
        headers: {
          authorization: currentUser.token,
        },
      });
      console.log("response: ", response.data);
      toast.success("Data Saved Successfully!", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in addResumeData:", error);
    }

  };
  const handleDownload = () => {
    try {
      const resumeContainer = document.querySelector(".resume-container");

      if (resumeContainer) {
        setLoading(true);
        const opt = {
          margin: 0.1,
          filename: 'user-resume.pdf',
          image: { type: 'jpeg', quality: 1.00 },
          html2canvas: { scale: 2, allowTaint: false, useCORS: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Ensure proper page breaks
        };

        html2pdf().set(opt).from(resumeContainer).save().then(() => {
          setLoading(false); // End loading state after PDF is generated
          setCongratsVisible(true); // Trigger Confetti effect
          handleSave();
          // Reset confetti after 5 seconds
          setTimeout(() => {
            setCongratsVisible(false);
          }, 5000);
        });
      } else {
        console.error("Resume container not found.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={congratsVisible ? 600 : 0}
      />
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', width: '100%', margin: '30px 0px' }}>

        <Stack className="resume-container" elevation={2} style={customStyle} sx={{ flexDirection: 'row' }}>

          <Box sx={{ flex: 1, backgroundColor: '#7771FF', p: 2, color: '#FAFCFF' }}>
            <Box textAlign={'center'}>
              <Avatar alt={profile.firstName} src={currentUser.avatar} sx={{ width: 100, height: 100, margin: '0 auto' }} />
              <Typography variant="h6" gutterBottom>
                {profile.firstName} {profile.lastName}
              </Typography>

            </Box>
            <Subheading>Portfolios</Subheading>
            <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', mt: '10px' }}>
              {profile.github && (

                <Link to={profile.github} target="_blank" rel="noopener noreferrer" className="linked" style={{ marginRight: '10px' }}>
                  <img src={github} alt="github" width={'30px'} height={'30px'} />

                </Link>
              )}
               {profile.leetcode && (

<Link to={profile.leetcode} target="_blank" rel="noopener noreferrer" className="linked" style={{ marginRight: '10px' }}>
  <img src={leetcode} alt="leetcode" width={'30px'} height={'30px'} />

</Link>
)}
 {profile.codeforces && (

<Link to={profile.codeforces} target="_blank" rel="noopener noreferrer" className="linked" style={{ marginRight: '10px' }}>
  <img src={codeforces} alt="codeforces" width={'30px'} height={'30px'} />

</Link>
)}
 {profile.personalPortfolio && (

<Link to={profile.personalPortfolio} target="_blank" rel="noopener noreferrer" className="linked" style={{ marginRight: '10px' }}>
  <img src={portfolio} alt="codeforces" width={'30px'} height={'30px'} />

</Link>
)}
 {profile.linkedIn && (

<Link to={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="linked" style={{ marginRight: '10px' }}>
  <img src={linked} alt="codeforces" width={'30px'} height={'30px'} />

</Link>
)}
            </Stack>
            <Subheading>Contact Details</Subheading>
            <Box>
              <Stack flexDirection={'row'} sx={{alignItems:'center'}}>
                <Phone fontSize={'large'}/>
               <Typography  sx={{margin:'0 12px'}}> {profile.mobile}</Typography>

              </Stack>
              <Stack flexDirection={'row'} sx={{alignItems:'center', }}>
              <Email fontSize={'large'}/>
              <Typography  sx={{margin:'0 12px'}}>
                {profile.email}
                </Typography>
              </Stack>
              <Stack flexDirection={'row'} sx={{alignItems:'center'}}>
              <Home fontSize={'large'}/>
              <Typography sx={{margin:'0 12px'}}>
                {profile.address}
                </Typography>
              </Stack>
            </Box>
            <Subheading> Skills</Subheading>

            <Stack  flexDirection={'row'}>
              {skills.map((item, index) => (
                <SkillContainer key={index}>
                  <SkillName>{item.skill}</SkillName>
                  <SkillProgress variant="determinate" value={item.proficiency * 10} />
                </SkillContainer>
              ))}

            </Stack>
          </Box>
          <Box sx={{ flex: 2, color: '#00000', p: 3, backgroundColor: '#FAFCFF' }}>
            <SubheadingP> About me</SubheadingP>
            <Typography>{profile.about}</Typography>
            <SubheadingP>  Education </SubheadingP>
            {
              qualifications.map((education, index) => (
                <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                 
                }}
              >
                <Box
                  sx={{
                    marginRight: 2,
                    color: 'primary.main',
                  }}
                >
                  <School fontSize="large" sx={{ color:"#7771FF"}} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {education.institute}
                  </Typography>
                  <Typography variant="subtitle1">
                    {education.degree} - {education.fos}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                   Grade : {education.grade}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginLeft: 'auto',
                    color: 'text.secondary',
                  }}
                >
                  <Typography variant="body2" sx={{color:"#7771FF"}}>
                  {moment(education.startYear).format("YYYY")} - {moment(education.endYear).format("YYYY")}
                  </Typography>
                </Box>
              </Box>

              ))
            }
            <Box>
            <SubheadingP>  Experience </SubheadingP>
            {
              experiences.map((education, index) => (
                <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                 
                }}
              >
                <Box
                  sx={{
                    marginRight: 2,
                    color: 'primary.main',
                  }}
                >
                  <Work fontSize="large" sx={{ color:"#7771FF"}} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {education.role}
                  </Typography>
                  <Typography variant="body2" sx={{color:"#7771FF"}}>
                  {moment(education.start_date).format("MMMM  YYYY")} - {moment(education.end_date).format("MMMM  YYYY")}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {education.institute} 
                  </Typography>
                  
                </Box>
                <Box
                  sx={{
                    marginLeft: 'auto',
                    color: 'text.secondary',
                  }}
                >
                  
                </Box>
              </Box>

              ))
            }
               </Box>

             <Box>
            <SubheadingP>  Certifications </SubheadingP>
            {
              certificates.map((education, index) => (
                <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                 
                }}
              >
                <Box
                  sx={{
                    marginRight: 2,
                    color: 'primary.main',
                  }}
                >
                  <EmojiEvents fontSize="large" sx={{ color:"#7771FF"}} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {education.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {education.type} - {education.techStack}
                  </Typography>
                 
                  <Typography variant="subtitle2" color="textSecondary">
                    {education.description} 
                  </Typography>
                  
                </Box>
              </Box>
              ))
            }
               </Box>

          </Box>
        </Stack >
      </Stack>
      <Button
        variant="contained"
        sx={{
          margin: "20px",
          borderRadius: "20px",
          width: "12rem",
          backgroundColor: "var(--btn)",
          color: 'black',
          '&:hover': { backgroundColor: "var(--btnHover)" }
        }}
        onClick={handleDownload}
        endIcon={<DownloadIcon />}
        className="download-button"
        disabled={loading} // Disable button while loading
      >
        {loading ? ( // Conditionally render loading indicator
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Download"
        )}
      </Button>
    </>
  );
};

export default Template3;
