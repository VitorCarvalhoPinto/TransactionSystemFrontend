import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const UploadButton = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const CSVUpload = ({ file, setFile, handleFileSubmit }) => {
    return (
        <div>
            <Button
                component="label"
                variant="contained"
                sx={{ mt: 2, mr: 2 }}
            >
                Upload CSV File
                <UploadButton
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
                {file ? `Selected file: ${file.name}` : "No file chosen"}
            </Typography>
            <Button
                onClick={handleFileSubmit}
                disabled={!file}
                variant="contained"
                sx={{ mt: 2 }}
            >
                Submit CSV
            </Button>
        </div>
    );
};

export default CSVUpload;