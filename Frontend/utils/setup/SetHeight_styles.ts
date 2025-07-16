import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor:"#0C1821",
  },
  header: {
    color: "#CCC9DC",
    fontSize: 32,
    top:150,
    marginBottom: 100,
  },
  input: {
    width: "100%",
    padding: 10,
    margin: 10,
    borderColor: "#CCC9DC",
    borderWidth: 1,
    borderRadius: 5,
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
  },
  buttonText: {
    color: "#CCC9DC",
    fontSize: 18,
    fontWeight: "bold",
  },
  rulerContainer: {
    backgroundColor: "#324A5F", 
    borderRadius: 20,
    paddingVertical: 20,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,

  },
  weightText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#CCC9DC",
  },
  unitText: {
    fontSize: 16,
    color: "#CCC9DC",
    marginBottom: 10,
  },
  
  tick: {
    width: 2,
    marginTop: 4,
  },
  label: {
  fontSize: 14,
  color: "#CCC9DC",
  marginBottom: 2,
  width: 30, 
  textAlign: "center", 
},
heightRow: {
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "center",
  marginBottom: 10,
},
inlineUnit: {
  fontSize: 20,
  color: "#CCC9DC",
  marginLeft: 4,
  paddingBottom: 5, 
},

  centerLine: {
    position: "absolute",
    top: 80,
    height: 40,
    width: 2,
    backgroundColor: "#CCC9DC",
  },
});

export default styles;