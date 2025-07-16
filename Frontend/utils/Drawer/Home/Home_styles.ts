import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1821',
    justifyContent: 'center',
    padding: 12,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  datePicker: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: '#CCC9DC',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 20,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    marginTop: 100,
    flexWrap: 'nowrap',
  },

  
  bellContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },

  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: "#324A5F", 
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 18,
    color: '#CCC9DC',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#CCC9DC',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#0C1821",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#CCC9DC',
    textAlign: 'center',
  },
});

export default styles;
