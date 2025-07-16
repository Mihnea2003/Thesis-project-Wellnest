import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0C1821',
  },
  muscleGroupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '48%',
    justifyContent: 'space-between',
  },
  muscleImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#CCC9DC',
  },
  formGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#CCC9DC',
    flex: 1,
    display: 'none',
  },
  input: {
    width: '100%',
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#324A5F',
    color: '#CCC9DC',
  },
  muscleGroupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  muscleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    padding: 3,
    marginBottom: 10,
    backgroundColor: '#324A5F',
    borderRadius: 4,
  },
  selectedMuscleBtn: {
    backgroundColor: '#1B2A41',
    borderColor: '#1B2A41',
  },
  muscleText: {
    color: '#CCC9DC',
  },
  selectedMuscleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  generateBtn: {
    backgroundColor: '#324A5F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  generateBtnText: {
    color: '#CCC9DC',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#CCC9DC",
    marginBottom: 15,
    textAlign: "center",
  },
  closeBtn: {
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
  workoutPlan: {
    paddingBottom: 20,
  },
  workoutHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CCC9DC',
    marginTop: 15,
    marginBottom: 5,
  },
  workoutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#CCC9DC',
  },
  modalHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 15,
},
scrollViewContent: {
    width: '100%',
    paddingBottom: 20,
  },
  closeModalBtn: {
    backgroundColor: '#324A5F',  // Red background for close button
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  lineBreak: {
    height: 10,
  },
});

export default styles;
