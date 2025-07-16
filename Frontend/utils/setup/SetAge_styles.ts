import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  amountContainer: {
    backgroundColor: "#0C1821",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "70%",
    marginBottom: 50,
  },
  container: {
    backgroundColor: "#0C1821",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    color: "#CCC9DC",
    fontSize: 32,
    marginBottom: 100,
  },
  input: {
    fontSize: 40,
    width: "100%",
    padding: 10,
    margin: 10,
    textAlign: "center",
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
    top:190,
  },
  buttonText: {
    color: "#CCC9DC",
    fontSize: 18,
    fontWeight: "bold",
  },
  circleButton: {
    borderColor: "#324A5F",
    borderWidth: 2,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  circleButtonText: {
    color: "#324A5F",
    fontSize: 30,
  },
  ageText: {
    fontSize: 60,
    color: "#CCC9DC",
    textAlign: "center",
    minWidth: 40,
  },
});

export default styles;
