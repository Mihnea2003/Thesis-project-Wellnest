class Set {
    constructor(setId, reps, kg) {
      this.setId = setId;
      this.reps = reps;
      this.kg = kg;
    }
  
    get getSetId() { return this.setId; }
    get getReps() { return this.reps; }
    get getKg() { return this.kg; }
    
    set setSetId(setId) { this.setId = setId; }
    set setReps(reps) { this.reps = reps; }
    set setKg(kg) { this.kg = kg; }
  }
module.exports =  Set;
