import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0C1821",  
  },
  header: {
    fontSize: 40,
    marginBottom: 120,
    color: "#CCC9DC",  
  },
  input: {
    width: "100%",
    margin: 5,
    backgroundColor: "#0C1821",  
    color: "#CCC9DC",  
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    color: "#CCC9DC",  
    marginTop: 20,
  },
  button: {
    backgroundColor: "#324A5F",  
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#CCC9DC",  
    fontSize: 16,
  },
});

export default styles;
