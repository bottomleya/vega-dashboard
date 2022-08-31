
class Point {
  constructor( name, 
               displayName   =   "",
               units         =   "no-units"
               colorStr      =   "#36a2eb",
               values        =   "") {
    
    this.name           =   name;
    if (displayName == "") {
      this.displayName  =   name;
    } else {
      this.displayName  =   displayName;
    }
    this.units          =   units;
    this.color          =   colorStr;
    this.values         =   values.split(",").map(Number);
    
    // additional parameters for future
    this.feature        =   false;
    this.label          =   false;
    this.categorical    =   false;

  }
  
  setName(name) {
    this.name = name;
  }
  setDisplayName(displayName) {
    this.displayName = displayName;
  }
  setUnits(units) {
    this.units = units;
  }
  setAsFeature() {
    this.feature = true;
    this.label = false;
  }
  setAsLabel() {
    this.feature = false;
    this.label = true;
    this.categorical = false;
  }
  setColor(color) {
    this.color = color;
  }
  setValue(value) {
    this.values = [value];
  }
}
