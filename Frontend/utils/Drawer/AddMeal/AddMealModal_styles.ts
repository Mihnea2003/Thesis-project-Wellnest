import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1821',
    padding: 20,
  },
  input: {
    borderColor: '#324A5F',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#1B2A3A',
    color: '#CCC9DC',
    marginBottom: 15,
    marginTop:40,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#324A5F',
    backgroundColor: '#1B2A3A',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    color: '#CCC9DC',
    fontSize: 16,
  },
  selectedView: {
    marginTop: 20,
  },
  label: {
    color: '#CCC9DC',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#324A5F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addText: {
    color: '#CCC9DC',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#324A5F',
    borderRadius: 5,
    borderWidth: 1,
  },
  closeText: {
    color: '#CCC9DC',
    fontSize: 16,
  },
});
export default styles;