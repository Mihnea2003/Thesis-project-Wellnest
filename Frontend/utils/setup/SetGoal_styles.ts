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
    color: "#CCC9DC",
    fontSize: 32,
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#324A5F",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginVertical: 8,
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
