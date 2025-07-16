import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1821",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "#CCC9DC",
    fontSize: 32,
    marginBottom: 100,
  },
  input: {
    width: "100%",
    padding: 12,
    borderColor: "#CCC9DC",
    borderWidth: 1,
    borderRadius: 10,
    color: "#CCC9DC",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#324A5F",
    padding: 15,
    borderRadius: 30,
    width: "60%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#324A5F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#CCC9DC",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
