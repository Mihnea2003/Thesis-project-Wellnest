import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0C1821',
  },
  profileContainer: {
    marginTop:50,
    padding: 10,
    backgroundColor: "#324A5F",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 30,
  },
  leaderboardContainer: {
    padding: 10,
    backgroundColor: "#324A5F",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#CCC9DC', 
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#CCC9DC', 
    textAlign: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldText: {
    fontSize: 18,
    color: '#CCC9DC',
  },
  updateIcon: {
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: "#324A5F", 
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 18,
    color: '#CCC9DC',
    textAlign: 'center',
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCC9DC", 
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#0C1821", 
    color: "#CCC9DC",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#0C1821", 
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  modalButtonText: {
    color: '#CCC9DC', 
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#CCC9DC', 
  },
});

export default styles;
