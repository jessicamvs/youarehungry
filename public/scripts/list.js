var itemInput = document.getElementById('new-item');
var addButton = document.getElementById('add-button');
var toGetHolder = document.getElementById('to-get');
var boughtHolder = document.getElementById('bought');

// create new list item
var createNewItemElement = function(itemString){
  var listItem = document.createElement('li');
  var checkbox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var deleteButton = document.createElement('button');

	//each element needs modifying
  checkbox.type = 'checkbox';
  editInput.type = 'text';

  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  label.innerText = itemString;

	//append element to each list item
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);

  return listItem;
};

//add a new item
var addItem = function(){
	//create a new li with the input text from new item
  var listItem = createNewItemElement(itemInput.value);

  if (itemInput.value == '') {
    alert('Please enter an item.');
  } else {
		//append list item to toGetHolder
    toGetHolder.appendChild(listItem);
    bindItemEvents(listItem, itemBought);
  }

  itemInput.value = '';
};

//delete an existing item
var deleteItem = function(){
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

//mark item as bought
var itemBought = function(){
  var listItem = this.parentNode;
  boughtHolder.appendChild(listItem);
  bindItemEvents(listItem, itemToGet);
};

//mark item as to get
var itemToGet = function(){
  var listItem = this.parentNode;
  toGetHolder.appendChild(listItem);
  bindItemEvents(listItem, itemBought);
};

var bindItemEvents = function(ListItem, checkboxEventHandler){
  var checkbox = ListItem.querySelector('input[type=checkbox]');
  var deleteButton = ListItem.querySelector('button.delete');

	//bind deleteItem to deleteButton
  deleteButton.addEventListener('click', deleteItem);

	//bind checkboxEventHandler to checkbox
  checkbox.addEventListener('change', checkboxEventHandler);
};

//set click event to the addItem function
addButton.addEventListener('click', addItem);

//press 'enter' to trigger add button
itemInput.addEventListener('keypress', function(event) {
  if (event.keyCode == 13) {
    addButton.click();
    return false;
  }
  return true;
});

//cycle over toGetHolder ul list items
for (var i = 0; i < toGetHolder.children.length; i++){
  bindItemEvents(toGetHolder.children[i], itemBought);
}

//cycle over boughtHolder ul list items
for (var i = 0; i < boughtHolder.children.length; i++) {
  bindItemEvents(boughtHolder.children[i], itemToGet);
}