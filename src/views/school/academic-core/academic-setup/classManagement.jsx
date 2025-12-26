import React, { useState, useEffect } from 'react';
import {
    Card, CardContent, CardHeader, Typography, Button, IconButton, Box,
    Switch, MenuItem, TextField, Chip, Stack, Dialog, DialogTitle,
    DialogContent, DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    Add as PlusIcon, Edit as PencilIcon, Delete as TrashIcon,
    Check as CheckIcon, Save as SaveIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from 'contexts/AuthContext';
import { supabase } from '../../../../utils/supabaseClient';
import toast from 'react-hot-toast';
import DeleteConfirmDialog from 'ui-component/modals/DeleteConfirmDialog';
import { getErrorMessage } from '../../../../helper/getErrorMessage';

// --- Validation Schema ---
const schema = yup.object().shape({
    name: yup
        .string()
        .required('Class name is required')
        .matches(/^[A-Za-z 1-9]+$/, 'Class name must contain only letters and numbers'),
    section: yup
        .string()
        .required('Section is required')
        .matches(/^[A-Za-z]+$/, 'Section must contain only letters and numbers'),
});

// --- Sub-component: Unified Modal ---
const AcademicYearModal = ({ open, onClose, onSave, isEditing, defaultValues }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            section: '',
        }
    });

    // Reset form when modal opens with new data or is closed
    useEffect(() => {
        if (open) {
            reset(defaultValues);
        }
    }, [open, defaultValues, reset]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <form onSubmit={handleSubmit(onSave)}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight="bold">
                        {isEditing ? 'Edit Class' : 'Add Class'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {isEditing ? 'Update the class details.' : 'Create a new class.'}
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ mt: 1 }}>
                    <Stack spacing={2}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Class Name *"
                                    placeholder="e.g., Class 1, Class 2, etc."
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="section"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Section *"
                                    placeholder="e.g., A, B, C, etc."
                                    fullWidth
                                    error={!!errors.section}
                                    helperText={errors.section?.message}
                                />
                            )}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button type="submit" variant="contained" color="secondary">
                        {isEditing ? 'Save Changes' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

// --- Main Component ---
const ClassManagement = () => {
    const { profile } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [academicYears, setAcademicYears] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);



    useEffect(() => {
        getClasses();
    }, []);

    const getClasses = async () => {
        const { data, error } = await supabase.from('classes').select('*');
        console.log('data', data);
        setAcademicYears(data);
        if (error) {
            const msg = getErrorMessage(error)
            toast.error(msg || 'Something went wrong');
        }
    };
    const handleSaveYear = async (data) => {
        const payload = {
            name: data.name,
            school_id: profile?.school_id,
        };
        let result;
        if (editingId) {
            // Use .update() if we are editing
            result = await supabase
                .from('classes')
                .update(payload)
                .eq('id', editingId);
        } else {
            // Use .insert() if we are creating new
            result = await supabase
                .from('classes')
                .insert([payload]);
        }

        if (result.error) {
            const msg = getErrorMessage(result.error)
            toast.error(msg || 'Something went wrong');
        } else {
            toast.success(`Class ${editingId ? 'updated' : 'added'} successfully`);
            setModalOpen(false);
            getClasses();
        }
    };

    const handleOpenAdd = () => {
        setEditingId(null);
        setSelectedRow({ name: '' });
        setModalOpen(true);
    };

    const handleOpenEdit = (row) => {
        setEditingId(row.id);
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleToogle = async (row) => {
        const payload = {
            ...row,
            is_active: !row.is_active,
        };
        const { data, error } = await supabase.from('classes').update(payload).eq('id', row.id);
        if (error) {
            const msg = getErrorMessage(error)
            toast.error(msg || 'Something went wrong');
        } else {
            toast.success(`Class ${row.name} ${row.is_active ? 'activated' : 'deactivated'} successfully`);
            getClasses();
        }
    }

    const handleOpenDelete = (row) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        const { error } = await supabase
            .from('classes')
            .delete()
            .eq('id', selectedRow.id);

        if (error) {
            const msg = getErrorMessage(error)
            toast.error(msg || 'Something went wrong');
        } else {
            toast.success(`Deleted successfully`);
            getClasses();
        }
        setDeleteDialogOpen(false);
    };

    const columns = [
        {},
        { field: 'name', headerName: 'Class Name', flex: 1 },
        // {
        //     field: 'is_active',
        //     headerName: 'Status',
        //     width: 120,
        //     renderCell: (params) => (
        //         <Switch checked={params.value} color='secondary' onChange={() => handleToogle(params.row)} />
        //     )
        // },
        {
            flex: 1,
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            align: 'right',
            renderCell: (params) => (
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <IconButton size="small" onClick={() => handleOpenEdit(params.row)}>
                        <PencilIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => { }} disabled={params.row.isCurrent}>
                        <TrashIcon fontSize="small" onClick={() => handleOpenDelete(params.row)} />
                    </IconButton>
                </Stack>
            )
        }
    ];

    return (
        <Stack spacing={4}>
            <Card variant="outlined">
                <CardHeader
                    title="Class Management"
                    action={<Button variant="contained" color="secondary" startIcon={<PlusIcon />} onClick={handleOpenAdd}>Add Class</Button>}
                />
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid rows={academicYears || []} columns={columns} disableRowSelectionOnClick />
                </Box>
            </Card>

            <AcademicYearModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveYear}
                isEditing={!!editingId}
                defaultValues={selectedRow}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Class"
                message={`Are you sure you want to delete "${selectedRow?.name}"?`}
            />
        </Stack>
    );
};

export default ClassManagement;