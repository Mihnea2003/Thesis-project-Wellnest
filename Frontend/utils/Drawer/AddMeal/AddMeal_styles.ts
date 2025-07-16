
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0C1821",
  },
  label: {
    color: "#CCC9DC",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#1B2A3A",
    borderColor: "#324A5F",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputText: {
    color: "#CCC9DC",
    fontSize: 16,
  },
  foodItem: {
    color: "#CCC9DC",
    marginBottom: 6,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: "#324A5F",
    padding: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#324A5F",
    padding: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#CCC9DC",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1B2A3A",
    padding: 20,
    borderRadius: 12,
    width: 300,
    borderColor: "#324A5F",
    borderWidth: 1,
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#324A5F",
  },
  modalText: {
    color: "#CCC9DC",
    fontSize: 18,
    textAlign: "center",
  },
  foodItemContainer: {
  backgroundColor: "#1B2A3A",
  borderRadius: 8,
  padding: 12,
  marginBottom: 10,
  borderColor: "#324A5F",
  borderWidth: 1,
},

foodItemName: {
  color: "#CCC9DC",
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 4,
},

foodItemDetails: {
  color: "#AAA",
  fontSize: 14,
},
});

export default styles;
