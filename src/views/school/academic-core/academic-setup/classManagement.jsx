import React from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Button, IconButton, Chip, Stack, TextField, Switch } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as PlusIcon, Edit as PencilIcon, Delete as TrashIcon, Save as SaveIcon } from '@mui/icons-material';

const ClassManagement = ({ classes = [], onAdd, onEdit, onDelete, onSaveConfig }) => {
    const columns = [
        { field: 'className', headerName: 'Class Name', flex: 1, fontWeight: 'bold' },
        {
            field: 'sections',
            headerName: 'Assigned Sections',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {params.value.map((sec) => (
                        <Chip key={sec} label={sec} size="small" variant="outlined" />
                    ))}
                </Stack>
            )
        },
        { field: 'classTeacher', headerName: 'Head Teacher', flex: 1 },
        { field: 'currentStudents', headerName: 'Students', width: 100 },
        {
            field: 'maxStudents',
            headerName: 'Capacity',
            width: 100,
            renderCell: (params) => (
                <Typography color={params.row.currentStudents >= params.value ? 'error.main' : 'inherit'} fontWeight="medium">
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            align: 'right',
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => onEdit(params.row)}><PencilIcon fontSize="small" /></IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        disabled={params.row.currentStudents > 0}
                        onClick={() => onDelete(params.row.id)}
                    >
                        <TrashIcon fontSize="small" />
                    </IconButton>
                </Stack>
            )
        }
    ];

    return (
        <Stack spacing={3}>
            <Card variant="outlined">
                <CardHeader
                    title="Classes Management"
                    subheader="Manage class-level structures"
                    action={<Button variant="contained" startIcon={<PlusIcon />} onClick={onAdd}>Add Class</Button>}
                />
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid rows={classes || []} columns={columns || []} disableRowSelectionOnClick />
                </Box>
            </Card>

            <Card variant="outlined">
                <CardHeader title="Class Configuration" subheader="Default settings" />
                <CardContent>
                    <Stack spacing={3}>
                        <Box display="grid" gridTemplateColumns={{ xs: '1r', md: '1fr 1fr' }} gap={3}>
                            <TextField label="Default Max Students" type="number" defaultValue={40} fullWidth />
                            <TextField label="Default Sections" placeholder="e.g. A, B, C" defaultValue="A, B" fullWidth />
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="action.hover" borderRadius={2}>
                            <Box>
                                <Typography variant="subtitle2">Auto-create Next Class</Typography>
                                <Typography variant="caption" color="text.secondary">Automatically create during promotion</Typography>
                            </Box>
                            <Switch defaultChecked />
                        </Box>
                        <Button variant="contained" startIcon={<SaveIcon />} onClick={onSaveConfig} sx={{ alignSelf: 'start' }}>
                            Save Configuration
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};


export default ClassManagement;