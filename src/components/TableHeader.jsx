import { Box, TextField, MenuItem, Button, Stack, InputAdornment } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AddIcon from '@mui/icons-material/Add';

export default function TableHeader({
  search,
  setSearch,
  classValue,
  setClassValue,
  sectionValue,
  setSectionValue,
  statusValue,
  setStatusValue,
  onAdd,
  onExport
}) {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: '14px',
        backgroundColor: '#fff'
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
        {/* 🔍 Search */}
        <TextField
          placeholder="Search student..."
          size="small"
          value={search}
          color="secondary"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: '100%', md: 280 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        />

        {/* 🎛 Filters + Export */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {/* Class */}
          <TextField
            select
            size="small"
            value={classValue}
            color="secondary"
            onChange={(e) => setClassValue(e.target.value)}
            sx={{ minWidth: 140 }}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="" disabled>
              All Classes
            </MenuItem>
            <MenuItem value="10">Class 10</MenuItem>
            <MenuItem value="11">Class 11</MenuItem>
            <MenuItem value="12">Class 12</MenuItem>
          </TextField>

          {/* Section */}
          <TextField
            select
            size="small"
            value={sectionValue}
            color="secondary"
            onChange={(e) => setSectionValue(e.target.value)}
            sx={{ minWidth: 140 }}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="" disabled>
              All Sections
            </MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
          </TextField>

          {/* Status */}
          <TextField
            select
            size="small"
            value={statusValue}
            color="secondary"
            onChange={(e) => setStatusValue(e.target.value)}
            sx={{ minWidth: 150 }}
            SelectProps={{ displayEmpty: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterAltOutlinedIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          >
            <MenuItem value="" disabled>
              All Status
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

          {/* Export */}
          <Button
            variant="contained"
            startIcon={<DownloadOutlinedIcon />}
            onClick={onExport}
            sx={{
              textTransform: 'none',
              borderRadius: '10px',
              px: 2.5
            }}
            color="secondary"
          >
            Export
          </Button>

          {/* Add */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{
              textTransform: 'none',
              borderRadius: '10px',
              px: 2.5
            }}
            color="secondary"
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
