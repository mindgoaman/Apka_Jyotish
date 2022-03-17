function TabBarModel(data) {
  const { selected, unselected, unselectedBlack, title } = data;

  this.selected = selected;
  this.unselected = unselected;
  this.title = title;
  this.unselectedBlack = unselectedBlack;
}

export default TabBarModel;