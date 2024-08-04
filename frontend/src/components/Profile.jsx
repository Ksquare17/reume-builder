import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/profileSlice";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.profileDetails);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [currentProfile, errors]);

  const validate = (name, value) => {
    let errorMsg = "None";

    switch (name) {
      case "firstName":
      case "lastName":
      case "aboutMe":
        if (!value.trim()) {
          errorMsg = "This field is required";
        }
        break;
      case "email":
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          errorMsg = "Enter a valid email";
        }
        break;
      case "mobile":
        if (!value.match(/^\d{10,12}$/)) {
          errorMsg = "Enter a valid mobile number (10-12 digits)";
        }
        break;
      default:
        errorMsg = "None";
        break;
    }

    if (errorMsg === "None") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMsg,
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    validate(name, value);
    dispatch(updateProfile({ [name]: value }));
  };

  const checkFormValidity = () => {
    const requiredFields = ["firstName", "lastName", "email", "mobile", "aboutMe"];
    const isValid = requiredFields.every(
      (field) => currentProfile[field] && !errors[field]
    );
    setIsFormValid(isValid);
  };

  const containerStyle = {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "var(--cardBg)",
  };

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Personal Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        <div>
          <Grid container spacing={2} lg={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="firstName"
                label="FirstName"
                style={{ width: "100%" }}
                required
                value={currentProfile?.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="lastName"
                label="LastName"
                style={{ width: "100%" }}
                required
                value={currentProfile?.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }} lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="email"
                name="email"
                label="Email"
                style={{ width: "100%" }}
                required
                value={currentProfile?.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="mobile"
                label="MobileNo"
                style={{ width: "100%" }}
                required
                value={currentProfile?.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PhoneIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="aboutMe"
                label="About Me"
                required
                multiline
                error={!!errors.aboutMe}
                helperText={errors.aboutMe}
                rows={2}
                fullWidth
                style={{ width: "100%" }}
                value={currentProfile?.aboutMe}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="address"
                label="Address"
                multiline
                rows={1}
                fullWidth
                style={{ width: "100%" }}
                value={currentProfile?.address}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <HomeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="linkedIn"
                label="Linked In"
                style={{ width: "100%" }}
                value={currentProfile?.linkedIn}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <LinkedInIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="github"
                label="Github"
                style={{ width: "100%" }}
                value={currentProfile?.github}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <GitHubIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="personalPortfolio"
                label="Personal Portfolio"
                style={{ width: "100%" }}
                value={currentProfile?.personalPortfolio}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="leetcode"
                label="Leetcode"
                style={{ width: "100%" }}
                value={currentProfile?.leetcode}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="codeforces"
                label="Codeforces"
                style={{ width: "100%" }}
                value={currentProfile?.codeforces}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </div>
      </CardContent>
      <Grid container spacing={2} alignItems="center" lg={12}>
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
          <Link to={isFormValid ? "/education" : "#"} style={{ ...linkStyle, pointerEvents: isFormValid ? "auto" : "none", color: isFormValid ? "inherit" : "grey" }}>
            <h4>Education Section</h4>
            <ArrowForwardIcon style={iconStyle} />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  gap: "5px",
  transition: "border-radius 0.3s",
  borderRadius: "4px",
  padding: "5px",
};

const containerStyles = {
  marginBottom: "20px",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  marginTop: "20px",
  paddingRight: "40px",
};

const iconStyle = {
  verticalAlign: "middle",
  marginLeft: "5px",
};

export default Profile;
