function BottomBarModel(data) {
    const { selected, icon, name ,stepNo,text} = data;
  
    this.selected = selected;
    this.icon = icon;
    this.name = name;
    this.stepNo = stepNo;
    this.text = text;
  }

export default BottomBarModel;