var listView = {};

var itemInput = document.getElementById('new-item');
var addButton = document.getElementById('add-button');
var deleteAllButton = document.getElementById('delete-all-button');
var toGetHolder = document.getElementById('to-get');
var boughtHolder = document.getElementById('bought');

// create new list item
listView.createNewItemElement = function(itemString) {
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
listView.addItem = function() {
	//create a new li with the input text from new item
  var listItem = listView.createNewItemElement(itemInput.value);

  if (itemInput.value == '') {
    console.log('RUNNING ADD ITEM NO ENTRY');
    alert('Please enter an item.');
  } else {
		//append list item to toGetHolder
    console.log('SENDING TO DB?');
    $(toGetHolder).prepend(listItem);
    listView.bindItemEvents(listItem, listView.itemBought);
    console.log('ingredient to add: ', itemInput.value);
    var id = JSON.parse(localStorage.getItem('userData')).id;
    var query = '(' + id + ', \'' + itemInput.value + '\')';
    listController.addIngredients(query);
  }
  itemInput.value = '';
};

listView.populateFromDatabase = function(data) {
  console.log('running populateFromDatabase', data);
  data.forEach(function(ele) {
    console.log(ele);
    var listItem = listView.createNewItemElement(ele);
    $(toGetHolder).prepend(listItem);
    listView.bindItemEvents(listItem, listView.itemBought);
  });
};

// new function to handle list population from recipe page. Can we DRY it?
listView.populateList = function(item) {
	//create a new li with the input text from new item
  console.log('populateList', item);
  var listItem = listView.createNewItemElement(item);
  $(toGetHolder).prepend(listItem);
  listView.bindItemEvents(listItem, listView.itemBought);
};

//delete an existing item
listView.deleteItem = function(){
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
  var text = $(this).prev().text();
  console.log('In deleteItem function');
  console.log(text);
  console.log(typeof text);
  listController.deleteIngredients(text);
};

listView.deleteAll = function() {
  var id = JSON.parse(localStorage.getItem('userData')).id;
  listController.deleteAllIngredients(id);
  listController.clearIngredients();
};

//mark item as bought
listView.itemBought = function(){
  var listItem = this.parentNode;
  $(boughtHolder).prepend(listItem);
  listView.bindItemEvents(listItem, listView.itemToGet);
};

//mark item as to get
listView.itemToGet = function(){
  var listItem = this.parentNode;
  $(toGetHolder).prepend(listItem);
  listView.bindItemEvents(listItem, listView.itemBought);
};

listView.bindItemEvents = function(ListItem, checkboxEventHandler) {
  var checkbox = ListItem.querySelector('input[type=checkbox]');
  var deleteButton = ListItem.querySelector('button.delete');

	//bind deleteItem to deleteButton
  deleteButton.addEventListener('click', listView.deleteItem);

	//bind checkboxEventHandler to checkbox
  checkbox.addEventListener('change', checkboxEventHandler);
};

//set click event to the addItem function
addButton.addEventListener('click', listView.addItem);

deleteAllButton.addEventListener('click', listView.deleteAll);

//press 'enter' to trigger add button
itemInput.addEventListener('keypress', function(event) {
  if (event.keyCode == 13) {
    addButton.click();
    return false;
  }
  return true;
});

//cycle over toGetHolder ul list items
for (var i = 0; i < toGetHolder.children.length; i++) {
  listView.bindItemEvents(toGetHolder.children[i], listView.itemBought);
};

//cycle over boughtHolder ul list items
for (var i = 0; i < boughtHolder.children.length; i++) {
  listView.bindItemEvents(boughtHolder.children[i], listView.itemToGet);
};
