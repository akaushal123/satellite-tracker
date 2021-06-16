import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getSatelliteList } from "../../api/satellite";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function ComboBox(props) {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(async () => {
        let active = true;

        if(!loading) return undefined;

        (async () => {
            const response = await getSatelliteList();
            if (active) {
                setOptions(Object.keys(response).map((key) => response[key]));
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if(!open)
            setOptions([]);
    }, [open]);

    const handleChange = e => {
        props.selectedSatellite(e.target.innerText);
    };

    return (
        <Autocomplete
            id="satellite-list"
            open={open}
            style={{ width: 400, margin:10}}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={handleChange}
            getOptionLabel={(option) => `${option.satelliteId}  =||=  ${option.satelliteName}`}
            getOptionSelected={(option, value) => option.satelliteName === value.satelliteName}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Satellite Name"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
