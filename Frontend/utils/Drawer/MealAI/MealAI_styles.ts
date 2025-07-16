import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0C1821",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#CCC9DC",
    marginBottom: 20,
    textAlign: "center",
  },

  formGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CCC9DC",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#1B2A3A",
    borderColor: "#324A5F",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    color: "#CCC9DC",
    fontSize: 16,
  },

  inputText: {
    color: "#CCC9DC",
    fontSize: 16,
  },

  generateBtn: {
    backgroundColor: "#324A5F",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  generateBtnText: {
    color: "#CCC9DC",
    fontSize: 16,
    fontWeight: "bold",
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#1B2A3A",
    padding: 20,
    borderRadius: 12,
    borderColor: "#324A5F",
    borderWidth: 1,
    width: "90%",
    maxHeight: "80%",
  },

  scrollViewContent: {
    paddingBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#CCC9DC",
    marginBottom: 15,
    textAlign: "center",
  },

  mealPlan: {
    marginBottom: 20,
  },

  mealHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CCC9DC",
    marginBottom: 8,
  },

  mealText: {
    fontSize: 15,
    color: "#AAA",
    marginBottom: 6,
  },

  lineBreak: {
    height: 10,
  },

  closeModalBtn: {
    backgroundColor: "#324A5F",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  closeBtnText: {
    color: "#CCC9DC",
    fontSize: 16,
    fontWeight: "bold",
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
});

export default styles;
