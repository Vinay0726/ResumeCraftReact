import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [templatesPerPage] = useState(6);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/templates/all`);
        setTemplates(response.data);
        setFilteredTemplates(response.data);
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
    navigate(
      `/admin/admin/adminDashboard/templates/${encodeURIComponent(
        templateName
      )}`
    );
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setFilteredTemplates(
        templates.filter((template) =>
          template.templateName.toLowerCase().includes(term.toLowerCase())
        )
      );
      setCurrentPage(1);
    } else {
      setFilteredTemplates(templates);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDeleteDialogOpen = (template) => {
    setTemplateToDelete(template);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setTemplateToDelete(null);
  };

  const handleDeleteTemplate = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/templates/${templateToDelete.id}`
      );
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template.id !== templateToDelete.id)
      );
      setFilteredTemplates((prevFilteredTemplates) =>
        prevFilteredTemplates.filter(
          (template) => template.id !== templateToDelete.id
        )
      );
    } catch (error) {
      console.error("Error deleting template:", error);
      setError("Failed to delete template. Please try again later.");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );

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
        Template List
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Search Templates"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: "50%" }}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "800px", margin: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                variant="head"
                style={{ fontWeight: "bold" }}
              >
                Template Name
              </TableCell>
              <TableCell
                align="center"
                variant="head"
                style={{ fontWeight: "bold" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell align="center">{template.templateName}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleTemplateClick(template.templateName)}
                  >
                    View Template
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteDialogOpen(template)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={Math.ceil(filteredTemplates.length / templatesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Template</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this template?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTemplate} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateList;
