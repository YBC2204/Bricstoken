import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Searchbar() {
    return (
      <Autocomplete
        className='bg-transparent'
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Contacts" />}
      />
    );
  }

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 }
  ]