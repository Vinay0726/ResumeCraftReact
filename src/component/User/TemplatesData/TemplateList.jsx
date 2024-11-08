import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  CircularProgress,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/templates/all`);
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
        setError("Failed to load templates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateClick = (templateName) => {
    navigate(`/templates/${encodeURIComponent(templateName)}`);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-full">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="p-4">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        padding={4}
        color="gray"
        fontFamily={"cursive"}
      >
        Select Template
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          maxWidth: "1200px",
          marginLeft: { md: 20 },
        }}
      >
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card
              className="hover:shadow-xl transition-transform transform hover:scale-105"
              sx={{
                borderRadius: "16px",
                background: "linear-gradient(135deg, #a0d3e8 0%, #6ab4e4 100%)", // Light blue gradient
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
                animation: "shine 1.5s infinite", // Add shine animation
                "&:hover": {
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
                },
              }}
              onClick={() => handleTemplateClick(template.templateName)}
            >
              <CardActionArea>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="white"
                      textAlign="center"
                    >
                      {template.templateName}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <style>{`
        @keyframes shine {
          0% {
            background-position: -200%;
          }
          100% {
            background-position: 200%;
          }
        }
      `}</style>
    </Box>
  );
};

export default TemplateList;
