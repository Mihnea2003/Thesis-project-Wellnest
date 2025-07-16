import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1821',
    padding: 16,
    justifyContent: 'space-between',
  },
  NoimageText: {
    color: '#CCC9DC',
    fontSize: 16,
    marginBottom: 5,
  },
  centerContent: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
noImageContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: 50, 
},

  imageGrid: {
    flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingBottom: 20,
  flexGrow: 1,
  },
  imageItem: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  progressImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#324A5F',
  },
  dateText: {
    color: '#CCC9DC',
    marginTop: 8,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#324A5F',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#CCC9DC',
    fontSize: 18,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#324A5F',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#CCC9DC',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
