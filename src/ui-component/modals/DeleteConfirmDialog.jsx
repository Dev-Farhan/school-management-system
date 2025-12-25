import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    Box
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const DeleteConfirmDialog = ({ 
    open, 
    onClose, 
    onConfirm, 
    title = "Confirm Delete", 
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    loading = false 
}) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningIcon color="error" />
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button 
                    onClick={onClose} 
                    color="inherit"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={onConfirm} 
                    color="error" 
                    variant="contained"
                    disabled={loading}
                    autoFocus
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;