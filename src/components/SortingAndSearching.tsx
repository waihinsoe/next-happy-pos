import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface Props {
  sortStatus: string;
  changeSortStatus: (value: string) => void;
  searchKeyword: string;
  changeSearchKeyword: (value: string) => void;
}

const SortingAndSearching = ({
  sortStatus,
  changeSortStatus,
  searchKeyword,
  changeSearchKeyword,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        gap: 3,
        flexGrow: 1,
      }}
    >
      <Box sx={{ width: 100 }}>
        <FormControl fullWidth>
          <InputLabel id="sort">Sort By</InputLabel>
          <Select
            labelId="sort"
            id="sorting"
            value={sortStatus}
            label="Sort By "
            onChange={(evt) => changeSortStatus(evt.target.value)}
          >
            <MenuItem value={"id"}>Id</MenuItem>
            <MenuItem value={"time"}>Time</MenuItem>
            <MenuItem value={"A-Z"}>A-Z</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextField
          id="search"
          label="Search"
          value={searchKeyword}
          variant="outlined"
          onChange={(evt) => changeSearchKeyword(evt.target.value)}
        />
      </Box>
    </Box>
  );
};

export default SortingAndSearching;
