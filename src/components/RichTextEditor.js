import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {  Box,  Container,  Paper,  Typography,  Button, Divider, Alert, Snackbar } from '@mui/material';

const RichTextEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) setEditorContent(savedContent);
  }, []);

  const handleChange = (content) => {
    setEditorContent(content);
    localStorage.setItem('editorContent', content);
  };

  const handleSave = () => {
    localStorage.setItem('editorContent', editorContent);
    setShowSaveSuccess(true);
  };

  const handleClearContent = () => {
    setEditorContent('');
    localStorage.removeItem('editorContent'); 
    const editor = quillRef.current.getEditor();
    editor.setContents([]); 
  };

  const handleGetUserInfo = () => {
    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
      alert("No user info found in local storage.");
      return;
    }

    let users;
    try {
      users = JSON.parse(usersStr);
    } catch (error) {
      alert("Error parsing user info from local storage.");
      return;
    }

    if (!Array.isArray(users) || users.length === 0) {
      alert("No user info available to display.");
      return;
    }

    const contentHtml = `
      ${users.map(user => `
        <p><strong>User Id:</strong> ${user.id || '-'}</p>
        <p><strong>Name:</strong> ${user.name || '-'}</p>
        <p><strong>Email:</strong> ${user.email || '-'}</p>
        <p><strong>Address:</strong> ${user.address || '-'}</p>
        <p><strong>Phone:</strong> ${user.phone || '-'}</p>
        <br/>
      `).join('')}
    `;

    const editor = quillRef.current.getEditor();
    editor.clipboard.dangerouslyPasteHTML(editor.getLength(), contentHtml);

    const updatedContent = editor.root.innerHTML;
    setEditorContent(updatedContent);
    localStorage.setItem('editorContent', updatedContent);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: '20px', margin: '20px auto' }}>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Rich Text Editor
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleGetUserInfo}
            >
              Get User Info
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={handleSave}
            >
              Save Content
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleClearContent}
            >
              Clear Content
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ marginBottom: '20px' }} />

        <Box sx={{
          '.ql-container': { minHeight: '30vh', fontSize: '1rem' },
          '.ql-editor': { minHeight: '30vh' }
        }}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={editorContent}
            onChange={handleChange}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean']
              ]
            }}
            formats={[
              'header', 'bold', 'italic', 'underline', 'strike',
              'list', 'bullet'
            ]}
          />
        </Box>
      </Paper>

      <Snackbar
        open={showSaveSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSaveSuccess(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Content saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RichTextEditor;


