import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#0C1821', 
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#324A5F',
  },
  loader: {
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#0C1821',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  resultTitle: {
    color: '#CCC9DC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  pillWrapper: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8,
    justifyContent: 'flex-start', 
  },
  ingredientPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 8,
  },
  pillText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 12,
    width: '85%',
    backgroundColor: '#1B2A41',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CCC9DC',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#CCC9DC',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#324A5F',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },
  buttonText: {
    color: '#CCC9DC',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
