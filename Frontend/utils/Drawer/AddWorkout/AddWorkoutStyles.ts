import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#0C1821",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#CCC9DC",
  },
  dateInput: {
    padding: 10,
    fontSize:20,
    color: "#CCC9DC",
  },
  exerciseContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#324A5F",
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#1B2A3A",
  },
  exerciseTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#CCC9DC",
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#CCC9DC",
  },
  muscleGroup: {
    color: "#AAA9BC",
    marginBottom: 10,
  },
  setContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  setInput: {
    borderWidth: 1,
    borderColor: "#324A5F",
    padding: 5,
    width: "45%",
    borderRadius: 5,
    backgroundColor: "#1B2A3A",
    color: "#CCC9DC",
  },
  addSetButton: {
    marginTop: 5,
    padding: 8,
    backgroundColor: "#324A5F",
    borderRadius: 5,
  },
  addExerciseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#324A5F",
    borderRadius: 5,
  },
  submitButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#324A5F",
    borderRadius: 5,
  },
  buttonText: {
    color: "#CCC9DC",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0C1821",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop:30,
    marginBottom: 10,
    color: "#CCC9DC",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#324A5F",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#1B2A3A",
    color: "#CCC9DC",
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#324A5F",
    borderRadius: 5,
    marginBottom: 15,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#CCC9DC",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#324A5F",
    borderRadius: 5,
    backgroundColor: "#1B2A3A",  
    color: "#CCC9DC", 
  },
  clearFiltersButton: {
    padding: 10,
    backgroundColor: "#324A5F",
    borderRadius: 5,
    marginBottom: 15,
  },
  exerciseItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#324A5F",
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#1B2A3A",
  },
  exerciseDetail: {
    color: "#AAA9BC",
  },
  exerciseDetails: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#324A5F",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#1B2A3A",
  },
  addButton: {
    padding: 10,
    backgroundColor: "#324A5F",
    borderRadius: 5,
    marginBottom: 10,
  },
  optionContainer: {
    backgroundColor: '#1B2A3A',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  selectorContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  selector: {
    borderWidth: 1,
    borderColor: '#324A5F',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#1B2A3A',
  },
  selectorText: {
    color: '#CCC9DC',
    fontSize: 16,
  },
  optionText: {
    color: '#CCC9DC',
    fontSize: 16,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: '#1B2A3A',
    padding: 10,
  },
  cancelText: {
    color: '#CCC9DC',
    fontSize: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  sectionText: {
    fontWeight: 'bold',
    color: '#CCC9DC',
    fontSize: 16,
    padding: 10,
    backgroundColor: '#1B2A3A',
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#324A5F",
    borderRadius: 5,
  },
});

export default styles;
