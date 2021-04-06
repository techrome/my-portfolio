import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  main: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#fbfbfb",
    padding: "100px 30px"
  },
  description: {
    fontSize: "24px",
    fontWeight: "bold"
  },
  error: {
    color: "#f44336",
    marginBottom: "30px"
  }
});

export default useStyles;
