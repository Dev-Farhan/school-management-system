import React from 'react';
import { Box, Card, CardHeader, Button, IconButton, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as PlusIcon, Edit as PencilIcon, Delete as TrashIcon } from '@mui/icons-material';

const SectionManagement = ({ sections = [], onAdd, onEdit, onDelete }) => {
    const columns = [
        { field: 'sectionName', headerName: 'Section', flex: 1 },
        { field: 'parentClass', headerName: 'Belongs to Class', flex: 1 },
        { field: 'roomNumber', headerName: 'Room / Location', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            renderCell: (params) => <Chip label="Active" color="success" size="small" />
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            align: 'right',
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => onEdit(params.row)}><PencilIcon fontSize="small" /></IconButton>
                    <IconButton color="error" size="small" onClick={() => onDelete(params.row.id)}><TrashIcon fontSize="small" /></IconButton>
                </Stack>
            )
        }
    ];

    return (
        <Card variant="outlined">
            <CardHeader
                title="Sections Management"
                subheader="Specific section assignments and rooms"
                action={<Button variant="contained" startIcon={<PlusIcon />} onClick={onAdd}>Add Section</Button>}
            />
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid rows={sections || []} columns={columns || []} disableRowSelectionOnClick />
            </Box>
        </Card>
    );
};

export default SectionManagement;